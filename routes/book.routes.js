const express = require("express");
const router = express.Router();
const Book = require("../models/Book");
const uploader = require("../config/cloudinary");
//const requireAuth = require("../middlewares/requireAuth")


//router.get all

router.get("/", (req, res, next) => {
    Book.find({}) 
      .populate("author") 
      .then((itemBook) => {
        res.status(200).json(itemBook);
      })
      .catch(next); 
  });

//router.get one

router.get("/:id", (req, res, next) => {
    Book.findById(req.params.id) 
      .populate("author") 
      .then((itemDocuments) => {
        res.status(200).json(itemDocuments);
      })
      .catch(next); 
  });

//router.patch

router.patch(
    "/change/:id",
    (req, res, next) => {
      const item = { ...req.body };
  
      Book.findById(req.params.id)
        .then((itemBook) => {
          if (!itemBook)
            return res.status(404).json({ message: "Item not found" });
        //   if (itemDocument.author.toString() !== req.session.currentUser) {
        //     return res
        //       .status(403)
        //       .json({ message: "You are not allowed to update this document" });
        //   }
  
        //   if (req.file) {
        //     item.image = req.file.secure_url;
        //   }
  
          Book.findByIdAndUpdate(req.params.id, item, { new: true })
            .populate("author")
            .then((updatedDocument) => {
              return res.status(200).json(updatedDocument);
            })
            .catch(next);
        })
        .catch(next);
    }
  );

//router.delete

router.delete("/delete/:id", (req, res, next) => {
    Book.findById(req.params.id)
      .then((itemDocument) => {
        if (!itemDocument) {
          return res.status(404).json({ message: "Item not found" });
        }
        // if (itemDocument.creator.toString() !== req.session.currentUser) {
        //   return res.status(403).json({ message: "You can't delete this item" });
        // }
  
        Book.findByIdAndDelete(req.params.id)
          .then(() => {
            return res.sendStatus(204);
          })
          .catch(next);
      })
      .catch(next);
  });

  

//router.post create

router.post("/your-masterpiece", (req, res, next) => {
    const updateValues = { ...req.body };
  
    
    // updateValues.author = req.session.currentUser; 
  
    Book.create(updateValues)
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


module.exports = router;