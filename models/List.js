const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listSchema = new Schema({
  title: [{type:String}],
  authors: String,
  categories: [{type:String}],
  publishedDate: String,
  description: String,
  thumbnail: {type:String,
  default: "https://www.sortiraparis.com/images/1002/1665/547990-coronavirus-comment-se-procurer-des-livres-pendant-le-confinement.jpg"},
  //amount dans listPrice
  price: Number,
//purchase = buyLink dans saleInfo
  purchase: String,
  //pageCount
});

const List = mongoose.model("List", listSchema);

module.exports = List;
