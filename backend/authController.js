const User = require("./models/User");

const register = async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const user = new User({ email, username, password });
    const savedUser = await user.save();

    res
      .status(201)
      .json({ success: true, message: "User successfully created", savedUser });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: error });
  }
};

const login = async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    if (user.password != password)
      return res.status(401).json({ message: "Password is incorrect!" });

    res.status(200).json({ message: "User successfully logged in" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

module.exports = { register, login };
