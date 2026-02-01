require("dotenv").config({ quiet: true, path: "./.env" });
const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser());

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (username == "admin" && password == "123") {
    const token = jwt.sign({ username }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });
    res.cookie("token", token);

    return res.json({ token });
  }

  res.status(401).send("Wrong credentials");
});

// function auth(req, res, next) {
//   const token = req.cookies.token;

//   if (!token) return res.status(401).send("No Token");

//   try {
//     const decoded = jwt.verify(token, process.env.SECRET_KEY);
//     req.user = decoded;
//     next();
//   } catch (error) {
//     res.status(401).send("Invalid Token");
//   }
// }

app.get("/home", auth, (req, res) => {
  res.send(`Welcome ${req.user.username}`);
});

app.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.send("Logged out");
});

app.listen(3000, () => {
  console.log("Server is working on PORT: 3000");
});
