const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });
require("../config/dbConnection");

const Book = require("../models/BokBook");

const items = [
  {
    title: "Back in the night",
    author: "60ba968cac6595c06541e80a",
    description: "Bahc'est pa smalm ai unp eud ur àl irenon ?",
    genre: "Art",
 },
  {
    title: "Funny games",
    author: "60ba968cac6595c06541e80b",
    description: "Koalaqu inaa la masse pas ho",
    genre: "Biography"
  },
  {
    title: "A nice little code",
    author: "60ba968cac6595c06541e80b",
    description: "Codeis a kop nice izrfe",
    genre: "Nonfiction",
  },
];


async function seedItems() {
    try {
      await Book.collection
        .drop()
        .catch((error) => console.log("No collection to drop, proceeding..."));
  
      const createdBooks = await Book.create(items);
      console.log(createdBooks);
      process.exit();
    } catch (error) {
      console.log(error);
      process.exit();
    }
  }
  
  seedItems();
  
  module.exports = seedItems;