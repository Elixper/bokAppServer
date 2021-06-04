const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const favSchema = new Schema({
  name: String,
  description: String,
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  bookId: [
    {
      type: Schema.Types.ObjectId,
      ref: "Book",
    },
  ],  
},
{ timestamps: true }
);

const Fav = mongoose.model("Fav", favSchema);

module.exports = Fav;
