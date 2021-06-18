const mongoose = require("mongoose");

async function ConnectDB() {
  try {
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };
    await mongoose.connect("mongodb://localhost:27017/node-rest-api", options);
    console.log(`Connect database successfully.`);
  } catch (error) {
    console.log("Error establishing database connection", error);
  }
}

module.exports = ConnectDB;
