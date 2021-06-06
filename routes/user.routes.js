const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Book = require("../models/BoKBook");
const uploader = require("../config/cloudinary");
const protectRoute = require('../middlewares/protectRoute');

//TODO

//patch ( basic update profile without isAuthor for now)
router.patch("/my-account/profile", /* protectRoute, */ uploader.single("profileImg"), (req, res, next) => {
    const userId = req.session.currentUser;
    if (req.file) {
      req.body.profileImg = req.file.path;
    }

    User.findByIdAndUpdate(userId, req.body, { new: true })
      .select("-password")
      .then((result) => res.status(200).json(result))
      .catch(next);
  }
);

// get user account dashboard
router.get("/my-account",/* protectRoute, */ (req, res, next) => {
    const userId = req.session.currentUser;
    User.findById(userId)
      .select("-password")
      .then((result) => res.status(200).json(result))
      .catch(next);
  }
);

// get user bokbook
router.get("/my-account/creation", /* protectRoute, */ (req,res,next)=>{
    const userId = req.session.currentUser;
    Book.find({author : userId})
    .then(result=>res.status(200).json(result))
    .catch(next)
})


module.exports = router;