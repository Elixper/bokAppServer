const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const googleBook = new Schema({
  title: [{ type: String }],
  volumeID: String,
  authors: String,
  categories: [{ type: String }],
  publishedDate: String,
  pageCount: Number,
  description: String,
  thumbnail: { type: String },
  //amount dans listPrice
  price: Number,
  //purchase = buyLink dans saleInfo
  purchase: String,
});

const List = mongoose.model("GoogleBook", googleBook);

module.exports = List;
