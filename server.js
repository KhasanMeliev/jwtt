require("dotenv").config({ quiet: true });
const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.post("/register", (req, res) => {
  const { username, password } = req.body;
  users.push({ username, password });

  res.send("User registered");
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username);
  if (!user || password != user.password) {
    return res.send("Not authorized");
  }

  const token = jwt.sign(user, process.env.SECRET_KEY, {
    expiresIn: "10m",
  });

  res.cookie("token", token);
  res.send("User logged in");
});

app.get("/dashboard", (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.send("Unauthorized");
  }
  const decoded = jwt.verify(token, process.env.SECRET_KEY);
  req.user = decoded;
  console.log(req.user);
  res.send(` Welcome ${req.user.username} to the dashboard!`);
});

app.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.send("User successfully deleted!");
});

app.listen(3000, () => {
  console.log("Server is running on PORT: 3000");
});
