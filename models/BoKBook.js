const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bokBookSchema = new Schema(
  {
    title: String,
    pseudoAuthor: String,
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    description: String,
    parutionDate: { type: Date, default: Date.now },

    genre: {
      type: String,
      enum: [
        "Art",
        "Biography",
        "Business",
        "Children",
        "Comics",
        "Cooking",
        "Crime",
        "Fantasy",
        "Fiction",
        "History",
        "Horror",
        "Manga",
        "Philosophy",
        "Romance",
        "ScienceFiction",
      ],
    },
    image: {
      type: String,
      default:
        "https://cdn.radiofrance.fr/s3/cruiser-production/2020/11/d2855d14-2653-47ba-9080-a6886aa87920/838_bibliotheque-de-cimiez-a-livre-ouvert-.jpg",
    },
    link: String,
  },
  { timestamps: true }
);

const BokBook = mongoose.model("BokBook", bokBookSchema);

module.exports = BokBook;
