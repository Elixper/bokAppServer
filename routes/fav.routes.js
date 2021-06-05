const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Book = require("../models/Book");
const Fav = require("../models/Fav");
const uploader = require("../config/cloudinary");
const protectRoute = require('../middlewares/protectRoute')

//ToDo

//router.get all
// get fav list
router.get("//my-account/fav", (req, res, next) => {
    Fav.find({})
      .populate("user") // Gives us the author's id creator object document instead of just the id : )
      .populate("book")
      .then((favDocuments) => {
        res.status(200).json(favDocuments);
      })
      .catch(next); // cf app.js error handling middleware
    // same as below
    //.catch(error => next(error))
  });

//router.get one
router.get("//my-account/list", (req, res, next) => {
Fav.findById(req.params.id)
      .then((itemDocument) => {
        if (!itemDocument) {
          return res.status(404).json({ message: "Item not found" });
        }
        if (itemDocument.creator.toString() !== req.session.currentUser) {
          return res.status(403).json({ message: "You can't delete this item" });
        }
    });
//router.patch

Fav.findByIdAndUpdate(favId, req.body, { new: true })
      .then((result) => res.status(200).json(result))
      .catch(next);

router.patch("/my-account/list", /* protectRoute, */ uploader.single("profileImg"), (req, res, next) => {
    const userId = req.session.currentUser;
    if (req.file) {
      req.body.profileImg = req.file.path;
    }

    Fav.findByIdAndUpdate(favId, req.body, { new: true })
      .then((result) => res.status(200).json(result))
      .catch(next);
  }
);
//router.delete
//router.post create



// get user account dashboard
router.get("/my-account",/* protectRoute, */ (req, res, next) => {
    const userId = req.session.currentUser;
    User.findById(userId)
      .select("-password")
      .then((result) => res.status(200).json(result))
      .catch(next);
  }
);




module.exports = router;



