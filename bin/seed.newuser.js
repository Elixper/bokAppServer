const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });
require("../config/dbConnection");
const bcrypt = require("bcryptjs");

const User = require("../models/User");

const salt = 10;

const users = [
  {
    username: "Aurélie Lopez-Vicente",
    profileImg:"https://media-exp1.licdn.com/dms/image/C4D03AQFHWK51VZtbVw/profile-displayphoto-shrink_200_200/0/1612380191604?e=1628726400&v=beta&t=-_FMIN6poX6sg48O0mXQJH_RSNDbLs7JyKwDaNzpBJY",
    email:"aurelie@gmail.com",
    password: bcrypt.hashSync("12345", salt),
    biography: "Hello :) I published my first book last year, it's called Coding with my cat, a relatable story. I hope you guys enjoy it!",
  },
  {
    username: "Bettina Souchard",
    email: "betty@gmail.com",
    password: bcrypt.hashSync("12345", salt),
    biography: "Hi everyone! I am a young graphic designer and I love to create and write biographies about women in the arts ",
  },
  {
    username: "Ludwig Pereira",
    profileImg:"https://media-exp3.licdn.com/dms/image/C5603AQGklOQ-3C76KA/profile-displayphoto-shrink_400_400/0/1579996953775?e=1628726400&v=beta&t=3jnKBscMQ4yfsNwgOX4YaTLotTA1hgbhFI_Y4FQX6c0",
    email: "ludwig@gmail.com",
    password: bcrypt.hashSync("12345", salt),
    biography: " I am the author of Finding Zero, a horror novel which talks about a developer trying to find an error in his code",
  },
  {
    username: "Philomena Ponpon",
    email: "philomena@gmail.com",
    password: bcrypt.hashSync("1234", salt),
    description: "Hello ! I have been writing since I was 15 and you may know me from my podcast. Hope you enjoy my stories!",
  },
  {
    username: "Estaban Andres",
    email: "esteban@gmail.com",
    password: bcrypt.hashSync("1234", salt),
    description: "Hello I wanted to share my love for french and spanish culture. You can check it here or contact me on instagram",
  },
  {
    username: "Aurélie Ferry",
    email: "aureferry@gmail.com",
    password: bcrypt.hashSync("12345", salt),
    biography: "I'm a young French author, I would love to be published one day, but for now, you can read my e-books for free ;)",
  },
  {
    username: "Leo Duchamps",
    email: "leoduch@gmail.com",
    password: bcrypt.hashSync("1234", salt),
    description: "Bonjour to all, Hello à tous! I'm starting to write small novel, so take a look if you feel like it ...",
  },
  {
    username: "Marion Camel",
    email: "marioncamel@gmail.com",
    password: bcrypt.hashSync("1234", salt),
    description: "Hi guys :) Hope you're having a nice day, and that you found interesting books on there ..",
  },
  {
    username: "Jeremy Delabre",
    email: "jeremdel@gmail.com",
    password: bcrypt.hashSync("1234", salt),
    description: "I managed to get a book of mine published, it's available for free on this site, but if you want to show me some love, you have a link to my publisher site ;)",
  },
  {
    username: "Alizée Shein",
    email: "alizhein@gmail.com",
    password: bcrypt.hashSync("1234", salt),
    description: "Love to write, hope you will enjoy my style ",
  },
];

async function seedUsers() {
  try {
    await User.collection
      .drop()
      .catch((error) => console.log("No collection to drop, proceeding..."));

    const createdUsers = await User.create(users);
    console.log(createdUsers);
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit();
  }
}

seedUsers();
