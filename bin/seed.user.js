const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });
require("../config/dbConnection");
const bcrypt = require("bcryptjs");

const User = require("../models/User");

const salt = 10;

const users = [
  {
    username: "toto",
    email: "titi@test.com",
    password: bcrypt.hashSync("12345", salt),
    biography: " blablablabla la Bio",
  },
  {
    username: "test",
    email: "foo@baz.com",
    password: bcrypt.hashSync("1234", salt),
    description: "une bio chanmé",
  },
  {
    username: "test2",
    email: "bar@baz.com",
    password: bcrypt.hashSync("1234", salt),
    description: "une bio",
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
