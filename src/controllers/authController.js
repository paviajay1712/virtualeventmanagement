const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const users = require("../models/users");
const { sendEmail } = require("../services/emailService");

const registerUser = async (req, res) => {
  const { username, password, email, role } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      id: users.length + 1,
      username,
      email,
      password: hashedPassword,
      role,
    };
    users.push(newUser);
    await sendEmail(
      email,
      "Registration Successful",
      `Hello ${username},\n\nThank you for registering on our platform.\n\nRegards,\nEvent Management Team`
    );
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to register user" });
  }
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username);
  if (user && (await bcrypt.compare(password, user.password))) {
    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      "secret",
      { expiresIn: "1h" }
    );
    res.json({ token });
  } else {
    res.status(401).json({ error: "Invalid credentials" });
  }
};

module.exports = { registerUser, loginUser };
