require("dotenv").config({ quiet: true });
const express = require("express");
const connectDB = require("./config/db.js");
const cors = require("cors");
const userRoutes = require("./routes/user.router.js");
const authRoutes = require("./routes/auth.router.js");
const app = express();
const PORT = 5000;

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
);

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on PORT ${PORT}`);
});
