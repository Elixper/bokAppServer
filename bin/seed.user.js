const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });
require("../config/dbConnection");
const bcrypt = require("bcryptjs");

const User = require("../models/User");

const salt = 10;

const users = [
  {
    pseudo: "toto",
    firstName: "titi",
    lastName: "tata",
    email: "titi@test.com",
    password: bcrypt.hashSync("12345", salt),
    description: " blablablabla la Bio",
    isAuthor: false,
  },
  {
    pseudo: "test",
    firstName: "bar",
    lastName: "foo",
    email: "foo@baz.com",
    password: bcrypt.hashSync("1234", salt),
    description: "une bio chanmé",
    isAuthor: true,
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
