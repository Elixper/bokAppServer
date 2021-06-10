const express = require("express");
const router = express.Router();
const BokBook = require("../models/BoKBook");
const uploader = require("../config/cloudinary");
const protectRoute =require('../middlewares/protectRoute')

//router.get all

router.get("/", protectRoute, (req, res, next) => {
  BokBook.find({})
    .populate("author")
    .then((itemBook) => {
      res.status(200).json(itemBook);
      console.log(itemBook);
    })
    .catch(next);
});

//router.get one
router.get("/my-bokBook/:id", protectRoute, (req, res, next) => {
  const user = User.find(req.session.currentUser);
  const bokbook = BokBook.find()
    .then((result) => {
      res
        .status(200)
        .json(result, { user, bokbook, myMasterpiece: req.params.id });
    })
    .catch(next);
});


router.post("/your-masterpiece", uploader.single("image"), protectRoute, (req, res, next) => {
  const updateValues = { ...req.body };

  if (req.file) {
    updateValues.image = req.file.path;
  }

  updateValues.author = req.session.currentUser;

  BokBook.create(updateValues)
    .then((itemDocument) => {
      itemDocument
        .populate("author")
        .execPopulate()
        .then((item) => {
          console.log("here");
          res.status(201).json(item);
        })
        .catch(next);
    })
    .catch(next);
});

//router.patch

router.patch("/:id", uploader.single("image"), protectRoute, (req, res, next) => {
  const item = { ...req.body };

  BokBook.findById(req.params.id)
    .then((itemBook) => {
      if (!itemBook) return res.status(404).json({ message: "Bok not found" });
      if (itemDocument.author.toString() !== req.session.currentUser) {
        return res
          .status(403)
          .json({ message: "You are not allowed to update this document" });
      }

      if (req.file) {
        item.image = req.file.secure_url;
      }

      BokBook.findByIdAndUpdate(req.params.id, item, { new: true })
        .populate("author")
        .then((updatedDocument) => {
          return res.status(200).json(updatedDocument);
        })
        .catch(next);
    })
    .catch(next);
});

//router.delete

router.delete("/:id", protectRoute, (req, res, next) => {
  BokBook.findById(req.params.id)
    .then((itemDocument) => {
      if (!itemDocument) {
        return res.status(404).json({ message: "bok not found" });
      }
      if (itemDocument.author.toString() !== req.session.currentUser) {
        return res.status(403).json({ message: "You can't delete this item" });
      }

      BokBook.findByIdAndDelete(req.params.id)
        .then(() => {
          return res.sendStatus(204);
        })
        .catch(next);
    })
    .catch(next);
});

module.exports = router;
