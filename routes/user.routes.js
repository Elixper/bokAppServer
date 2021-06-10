const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Book = require("../models/BoKBook");
const GoogleBook = require("../models/GoogleBook");
const uploader = require("../config/cloudinary");
const protectRoute = require("../middlewares/protectRoute");

//patch Update profile
router.patch(
  "/my-account",
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

// router.post("/dashboard",/* protectRoute, */ (req, res, next) => {
//   GoogleBook.create(ggBookApi)
//     .then((GBookAdd) => {
//       User.findByIdAndUpdate(
//         req.params.volumeID,
//         { $push: { bookFromA pi: GBookAdd._id } },
//         { new: true }
//       )
//         .then((result) => console.log(result))
//         .catch((err) => console.log(err));
//     })
//     .catch(next);
// });

router.post("/dashboard/add-list", (req, res, next) => {
  const list = new GoogleBook();
  list.title = req.body.title;
  list.authors = req.body.authors;
  list.genre = req.body.categories;
  list.publishedDate = req.body.publishedDate;
  list.description = req.body.description;
  list.thumbnail = req.body.thumbnail;
  list.price = req.body.price;
  list.purchase = req.body.purchase;
  list.user_id = req.session.currentUser;

  // const volumeID = req.body.volumeID;

  list
    .save()
    .then((newCopyForDb) => {
      console.log(newCopyForDb);
      User.findByIdAndUpdate(
        req.session.currentUser._id,
        { $push: { favGgl: newCopyForDb._id } },
        { new: true }
      )
        .then((data) => {
          console.log("coucou",data);
        })
        .catch((err) => {
          console.log(err);
        });
      res.status(201).json(newCopyForDb);
    })
    .catch(next);
});








module.exports = router;
