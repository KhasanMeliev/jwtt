const { getAllUsers, deleteUser } = require("../controllers/usersController");
const User = require("../models/User");

const router = require("express").Router();

router.get("/", getAllUsers);
router.delete("/delete/:id", deleteUser);

module.exports = router;
