const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });
require("../config/dbConnection");

const Book = require("../models/BokBook");

const items = [
  {
    title: "TheJellyCircus",
    pseudoAuthor:"PhiloP",
    author: "60ba968cac6595c06541e80a",
    description: "Story of friendship in a circus",
    genre: "Children",
 },
  {
    title: "Amara the Brave",
    pseudoAuthor:"PhiloP",
    author: "60ba968cac6595c06541e80a",
    description: "Story of friendship in a circus",
    genre: "Children",
 },
  {
    title: "My easy recipes",
    pseudoAuthor:"Este",
    author: "60ba968cac6595c06541e80b",
    description: "Koalaqu inaa la masse pas ho",
    genre: "Biography",
  },
  {
    title: "Little Kitchen Secrets",
    pseudoAuthor:"Este",
    author: "60ba968cac6595c06541e80b",
    description: "Koalaqu inaa la masse pas ho",
    genre: "Biography",
  },
  {
    title: "Coding with my cat",
    author: "Aurelie LV",
    description: "Codeis a kop nice izrfe",
    genre: "Nonfiction",
  },
  {
    title: "Coding with my cat",
    author: "Aurelie LV",
    description: "Codeis a kop nice izrfe",
    genre: "Nonfiction",
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