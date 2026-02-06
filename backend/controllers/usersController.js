const User = require("../models/User");

const getAllUsers = async (req, res) => {
  const users = await User.find();

  res.status(200).json(users);
};

const deleteUser = async (req, res) => {
  const id = req.params.id;
  const deletedUser = await User.findByIdAndDelete(id);

  res
    .status(200)
    .json({ success: true, message: "user deleted successfully", deletedUser });
};

module.exports = { getAllUsers, deleteUser };
