const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const daySchema = new Schema({
  _id: { type: Number, required: true, unique: true },
  book: { type: String, required: true },
  chapter: { type: Number, required: true },
  content: { type: String, required: true },
  replies:  { type: [{
    date: {type: Date, default: Date.now },
    id: { type: Number, required: true},
    user: {type: String },
    content: {type: String },
  }]},
  date: { type: Date, default: Date.now, required: true }
});

const Day = mongoose.model("Day", daySchema);

module.exports = Day;