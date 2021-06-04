const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });
require("../config/dbConnection");




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