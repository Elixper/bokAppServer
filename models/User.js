const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  pseudo: String,
  firstName: {type:String, required:true},
  lastName: {type:String, required:true},
  profileImg: {
    type: String,
    default:
      "https://cdn.radiofrance.fr/s3/cruiser-production/2020/11/d2855d14-2653-47ba-9080-a6886aa87920/838_bibliotheque-de-cimiez-a-livre-ouvert-.jpg",
  },
  email: { type: String, unique:true, required: true },
  password: { type: String, required: true },
  description: String,
  isAuthor: Boolean,
  fav: {
    type: Schema.Types.ObjectId,
    ref: "Book",
  },
},
 { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
