const getAllUsers = require("../controllers/usersController");
const User = require("../models/User");

const router = require("express").Router();

router.get("/", getAllUsers);

module.exports = router;
