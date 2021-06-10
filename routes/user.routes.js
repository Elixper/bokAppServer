const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Book = require("../models/BoKBook");
const uploader = require("../config/cloudinary");
const protectRoute = require("../middlewares/protectRoute");
const { findById } = require("../models/User");

//patch Update profile
router.patch(
  "/my-account",
  protectRoute,
  uploader.single("profileImg"),
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
router.get("/my-account", protectRoute, (req, res, next) => {
  const userId = req.session.currentUser;
  User.findById(userId)
    .select("-password")
    .then((result) => res.status(200).json(result))
    .catch(next);
});

// get Id User
router.get("/my-bokBook/:id", protectRoute, (req, res, next) => {
  const user = User.find(req.session.currentUser);
  Book.find()
    .then((result) => {
      res
        .status(200)
        .json(result, { user, bokbook, myMasterpiece: req.params.id });
    })
    .catch(next);
});
// get user bokbook
router.get("/me/books", protectRoute, (req, res, next) => {
  const userId = req.session.currentUser;

  Book.find({ author: userId })
    .then((books) => {
      res.status(200).json(books);
    })
    .catch(next);
});

//delete user bokBook
router.delete('/delete/:id', protectRoute, (req,res,next)=>{
// Book.findById(req.params.id)
// .then(result => res.sendStatus(204).json(result))
// .catch(error=> res.status(500).json(error))
Book.findById(req.params.id)
    .then((itemDocument) => {
      console.log(req.params.id)
      Book.findByIdAndDelete(req.params.id)
        .then(() => {
          return res.sendStatus(204);
        })
        .catch(next);
    })
    .catch(next);
})

// get user bokbook
router.get("/dashboard/creation", protectRoute, (req, res, next) => {
  const userId = req.session.currentUser;
  Book.find({ author: userId })
    .then((result) => res.status(200).json(result))
    .catch(next);
});

router.get("/", protectRoute, (req, res, next) => {
  User.find({})
    .populate("favGgl")
    .then((itemBook) => {
      res.status(200).json(itemBook);
    })
    .catch(next);
});
//push the id of a google book API as a string in the user model
router.post("/dashboard/add-list", protectRoute, (req, res, next) => {
  User.findByIdAndUpdate(
    req.session.currentUser,
    { $push: { favGgl: req.body.id } },
    { new: true }
  )
    .then((res) => {
      console.log("LA RES", res);
    })
    .catch((err) => console.error(err));
});

module.exports = router;
