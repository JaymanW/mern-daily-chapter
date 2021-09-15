const axios = require('axios')

// const getDate = () => {
//     let today = new Date();
//     return today;
// }

const getPassageContent = () => {
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
    
    const token = '5152f5f13c1f1e7eea4b6199ba0383a515589315';
    
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
        const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        const yyyy = today.getFullYear();

        // console.log(response.data.passages[0])
        const result = response.data.passages[0];
        const book = passageInfo.book;
        const chapter = passageInfo.chapter;
        let date = {
            year: yyyy,
            month: mm,
            day: dd
        }

        return {
            result: result,
            book: book,
            chapter: chapter,
            date: date
        }
    })
    .catch(function (error) {
        console.log(error);
    })
}

exports.getPassageContent = getPassageContent;