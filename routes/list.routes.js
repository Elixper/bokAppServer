const express = require("express");
const router = express.Router();
const BokBook = require("../models/BoKBook");
const List = require("../models/GoogleBook");

router.get("/", (req, res, next) => {
  List.find()
    .then((result) => res.status(200).json(result))
    .catch(next);
});

router.get("/:id", (req, res, next) => {
  List.findById(req.params.id)
    .then((result) => res.status(200).json(result))
    .catch(next);
});

router.post("/add-list", (req, res, next) => {
  const list = new List();
  list.title = req.body.title;
  list.authors = req.body.authors;
  list.genre = req.body.categories;
  list.publishedDate = req.body.publishedDate;
  list.description = req.body.description;
  list.thumbnail = req.body.thumbnail;
  list.price = req.body.price;
  list.purchase = req.body.purchase;
  list.user_id = req.session.currentUser;

  // list.save(function (err) {
  //   if (err) {
  //     res.send(err);
  //   } else {
  //     res.json({
  //       message: "added to your list",
  //       list: list,
  //     });
  //   }
  // });
  list.save()
    .then((res) => res.json({ message: "added to your list", list: list }))
    .catch(next);
});

module.exports = router;
