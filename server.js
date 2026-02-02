require("dotenv").config({ quiet: true });
const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const session = require("express-session");

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "sample-secret",
    resave: false,
    saveUninitialized: false,
  }),
);

app.get("/visit", (req, res) => {
  if (req.session.page_views) {
    req.session.page_views++;
    res.send(`You visited this page ${req.session.page_views} times`);
  } else {
    req.session.page_views = 1;
    res.send("You visited this page first time");
  }
});

app.get("/logout", (req, res) => {
  res.session.destroy();
  res.send("Successfully Logged Out");
});

// app.post("/login", (req, res) => {
//   const { username, password } = req.body;
//   if (username == "admin" && password == "123") {
//     const token = jwt.sign({ username }, process.env.SECRET_KEY, {
//       expiresIn: "1h",
//     });

//     res.cookie("token", token, {
//       httpOnly: true,
//       secure: false,
//       sameSite: "lax",
//     });

//     return res.send("Successfully logged in");
//   }

//   res.send("Wrong credentials!");
// });

// function auth(req, res, next) {
//   const token = req.cookies.token;
//   if (!token) {
//     return res.status(401).send("No token");
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.SECRET_KEY);
//     req.user = decoded;
//     next();
//   } catch (error) {
//     return res.json({ error: error });
//   }

//   next();
// }

// app.get("/home", auth, (req, res) => {
//   res.send(`Welcome ${req.user.username} to the home page`);
// });

app.listen(3000, () => {
  console.log("Server is running on PORT: 3000");
});
