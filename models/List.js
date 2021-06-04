const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listSchema = new Schema({
  name: String,
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

const List = mongoose.model("List", listSchema);

module.exports = List;
