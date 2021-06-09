const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Book = require("../models/BoKBook");
const GoogleBook = require("../models/GoogleBook");
const uploader = require("../config/cloudinary");
const protectRoute = require("../middlewares/protectRoute");



//patch Update profile
router.patch(
  "/my-account/profile",
  /* protectRoute, */ uploader.single("profileImg"),
  (req, res, next) => {
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

// get user account 
router.get(
  "/my-account",
  /* protectRoute, */ (req, res, next) => {
    const userId = req.session.currentUser;
    User.findById(userId)
      .select("-password")
      .then((result) => res.status(200).json(result))
      .catch(next);
  }
);

// get user bokbook
router.get(
  "/dashboard/creation",
  /* protectRoute, */ (req, res, next) => {
    const userId = req.session.currentUser;
    Book.find({ author: userId })
      .then((result) => res.status(200).json(result))
      .catch(next);
  }
);

router.post("/dashboard/:id", (req, res, next) => {
  GoogleBook.create(ggBookApi)
    .then((GBookAdd) => {
      User.findByIdAndUpdate(
        req.params.volumeID,
        { $push: { bookFromApi: GBookAdd._id } },
        { new: true }
      )
        .then((result) => console.log(result))
        .catch((err) => console.log(err));
    })
    .catch(next);
});

module.exports = router;
