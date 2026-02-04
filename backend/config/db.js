const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://khasanmeliev2_db_user:EOuKXO6Venkw4UuQ@cluster0.bvfeljz.mongodb.net/?appName=Cluster0",
    );

    console.log("MongoDB connected successfully");
  } catch (error) {
    console.log("Error while connecting to MongoDB");
  }
};

module.exports = connectDB;
