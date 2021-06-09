const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const defaultPic = [
  "https://cdn.pixabay.com/photo/2017/08/07/15/16/girl-2604837_960_720.jpg",
  "https://cdn.pixabay.com/photo/2014/09/05/18/32/old-books-436498_960_720.jpg",
  "https://cdn.pixabay.com/photo/2016/05/28/07/05/book-1421097_960_720.jpg",
  "https://cdn.pixabay.com/photo/2015/03/12/19/08/children-studying-670663_960_720.jpg",
  "https://cdn.pixabay.com/photo/2015/09/05/21/51/reading-925589__340.jpg",
  "https://cdn.pixabay.com/photo/2016/03/09/15/21/glasses-1246611__340.jpg",
  "https://cdn.pixabay.com/photo/2016/11/29/12/51/man-1869624__340.jpg",
];
//7 images par defaut en random
const userSchema = new Schema(
  {
    username: String,
    profileImg: {
      type: String,
      default: defaultPic[Math.floor(Math.random() * 7)],
    },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    biography: String,
    // save : bokbook id et list id
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
