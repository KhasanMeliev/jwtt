require("dotenv").config({ quiet: true });
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {});

app.listen(3000, () => {
  console.log("Server is running on PORT: 3000");
});
