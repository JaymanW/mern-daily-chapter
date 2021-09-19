const express = require('express');
const cors = require('cors');
require('dotenv').config();

const mongo = require('mongodb')

const axios = require('axios');

const schedule = require('node-schedule');

const app = express();
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(cors());
const port = 8080;

// DB CONNECTION
const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://JaymanW:${process.env.MONGO_PASSWORD}@cluster0.buicg.mongodb.net/dailyChapter?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, useUnifiedTopology: true, connectTimeoutMS: 30000, keepAlive: 1 });
client.connect()

// CONTROLLERS
const getChapter = async (searchResult) => {
  try {
    const chapterDB = client.db("dailyChapter").collection("days");
    const query = chapterDB.find({ date: searchResult }).sort({ _id: 1 }).limit(1);
    const result = await query.toArray();
    return result;
  } catch (err) {
    console.error(err);
  } finally {
    
  }
}

const getToday = async () => {
  try {
      let today = new Date();
      const dd = String(today.getDate()).padStart(2, '0');
      const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      const yyyy = today.getFullYear();
      const date = `${mm}-${dd}-${yyyy}`;
      
      const chapterDB = client.db("dailyChapter").collection("days");
      const query = chapterDB.find({ date: date }).sort({ _id: 1 }).limit(1);
      const result = await query.toArray();
      return result;
  } catch (err) {
      console.error(err);
  } finally {
      
  }
}

// GET COMMENTS

const getComments = async (date) => {
  try {
    const chapterDB = client.db("dailyChapter").collection("days");
    const query = chapterDB.find({ date: date }).sort({ _id: 1 }).limit(1);
    const result = await query.toArray();
    return result[0].comments;
  } catch (err) {
    console.error(err);
  } finally {
    
  }
}

const addComment = async (date, username, comment) => {
  try {
    let temp = [];

    for (let i = 0; i < 17; i++) {
    let digit = Math.floor(Math.random() * 9 + 1);
    temp.push(digit);
    }
    const ID = parseInt(temp.join(""));
    
    const chapterDB = client.db("dailyChapter").collection("days");
      chapterDB.updateOne({ "date": date }, {
        $push: {
          "comments": {
            id: ID,
            username: username,
            comment: comment,
          }
        }
      })
  } catch (err) {
      console.error(err);
  } finally {
      
  }
}

// REMOVE COMMENT
const deleteComment = async (date, commentID) => {
  try {
    const chapterDB = client.db("dailyChapter").collection("days");
    chapterDB.updateOne({ "date": date }, {
      $pull: { "comments": { id: commentID} },
    })
  } catch (err) {
    console.error(err);
  } finally {
      
  }
}

// ROUTES
app.get('/api/', async (req, res) => {
    const result = await getToday();
    res.send(result);
})

app.get('/api/:id', async (req, res) => {
  const result = await getChapter(req.params.id);
  res.send(result);
})

// GET COMMENTS
app.get('/api/comment/:id', async (req, res) => {
  const result = await getComments(req.params.id);
  res.send(result);
})

app.post('/api/comment/:id', async (req, res) => {
  const { username, comment } = req.body;
  addComment(req.params.id, username, comment);
  res.status(201).json({ success: true });
});

// DELETE COMMENTS
app.delete('/api/comment/:id', (req, res) => {
  deleteComment(req.params.id, req.body.commentID);
  res.status(201).json({ success: true });
})

const setDaily = async (result, book, chapter, date) => {
    try {
        const chapterDB = client.db("dailyChapter").collection("days");

        await chapterDB.insertOne( { date: date, content: result, book: book, chapter: chapter, comments: [] } );
        console.log(`Inserted day successfully on ${date}`);
      } catch (err) {
        console.error(err);
      }
}

// DAILY API CALL THAT POPULATES DATABASE WITH NEXT DAY'S VERSE
const daily = () => {
    const getPassage = () => {  
        const passages = [
            ['Matthew', 28],
            ['Mark', 16],
            ['Luke', 24],
            ['John', 21],
            ['Acts', 28],
            ['Romans', 16],
            ['1Corinthians', 16],
            ['2Corinthians', 13],
            ['Galatians', 6],
            ['Ephesians', 6],
            ['Philippians', 4],
            ['Colossians', 4],
            ['1Thessalonians', 5],
            ['2Thessalonians', 3],
            ['1Timothy', 6],
            ['2Timothy', 4],
            ['Titus', 3],
            ['Hebrews', 13],
            ['James', 5],
            ['1Peter', 5],
            ['2Peter', 5],
            ['1John', 5]
        ];
        
        const randomPassageIndex = Math.floor(Math.random() * passages.length);
        
        const randomBook = passages[randomPassageIndex][0];
        const randomChapter = Math.floor(Math.random() * passages[randomPassageIndex][1] +1);
        
        const passageResult = {
            book: randomBook,
            chapter: randomChapter
        }
        return passageResult;
    }

    const passageInfo = getPassage();
    const passageQuery = `${passageInfo.book}${passageInfo.chapter}`;

    const token = process.env.API_TOKEN;
    
    axios(`https://api.esv.org/v3/passage/html/`, {
    method: "get",
    params: {
        'q': passageQuery,
        'include-audio-link': false,
        'include-footnotes': false,
        "include-chapter-numbers": false,
    },
    headers: {
        'Authorization': `Token ${token}`,
    }
    }).then(function (response) {

        let today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const yyyy = today.getFullYear();
        const date = `${mm}-${dd}-${yyyy}`;

        const result = response.data.passages[0];
        const book = passageInfo.book;
        const chapter = passageInfo.chapter;

        setDaily(result, book, chapter, date);
    })
    .catch(function (error) {
        console.log(error);
    })
}
// daily();

// FUNCTION THAT IS CALLED ONCE A DAY @ 1AM TO RUN DAILY FUNCTION
const job = schedule.scheduleJob('* * * * *', function(){
    // 0/1 0 1 ? * * *          <- Once a day at 1am
    // daily();
});

app.listen(port, () => {
    console.log(`Listening on port: ${port}`)
});