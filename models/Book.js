const mongoose = require("mongoose");
const Schema = mongoose.Schema;
  
const bookSchema = new Schema(
  {
    title: String,
    author: String,
    description: String,
    parutionDate: String,
    genre: {
        type: String,
        enum: ["Art","Biography","Business","Children","Comics","Cooking","Crime","Ebooks","Fantasy","Fiction","History","Horror","Manga","Nonfiction","Philosophy","Romance","ScienceFiction"],
      },
    image: {
      type: String,
      default:
        "https://cdn.radiofrance.fr/s3/cruiser-production/2020/11/d2855d14-2653-47ba-9080-a6886aa87920/838_bibliotheque-de-cimiez-a-livre-ouvert-.jpg",
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;