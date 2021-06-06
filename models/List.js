const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listSchema = new Schema({
  title: String,
  authors: String,
  genre: String,
  publishedDate: String,
  description: String,
  thumbnail: {type:String,
  default: "https://www.sortiraparis.com/images/1002/1665/547990-coronavirus-comment-se-procurer-des-livres-pendant-le-confinement.jpg"},
  price: Number,
  purchase: String,
});

const List = mongoose.model("List", listSchema);

module.exports = List;
