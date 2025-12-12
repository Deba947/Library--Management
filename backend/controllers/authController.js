import User from "../models/User.js";
import bcrypt from "bcryptjs";

// -------------------------- PUBLIC SIGNUP ----------------------------
export const signup = async (req, res) => {
  try {
    const { username, password, name, role } = req.body;

    if (!username || !password || !name)
      return res.status(400).json({ message: "All fields required" });

    const exists = await User.findOne({ username });
    if (exists)
      return res.status(400).json({ message: "Username already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      password: hashedPassword,
      name,
      role: role || "user"
    });

    res.json({ message: "Signup successful", user: newUser });

  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// -------------------------- PUBLIC LOGIN ----------------------------
export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password)
      return res.status(400).json({ message: "Username & Password required" });

    const user = await User.findOne({ username });

    if (!user)
      return res.status(404).json({ message: "User does not exist" });

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return res.status(400).json({ message: "Incorrect password" });

    return res.json({
      message: "Login successful",
      user: {
        id: user._id,
        username: user.username,
        role: user.role,
        name: user.name,
      }
    });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// -------------------------- ADMIN: ADD USER ----------------------------
export const addUser = async (req, res) => {
  try {
    const { username, password, name, role } = req.body;

    if (!username || !password || !name)
      return res.status(400).json({ message: "All fields required" });

    const exists = await User.findOne({ username });
    if (exists)
      return res.status(400).json({ message: "Username already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      password: hashedPassword,
      name,
      role
    });

    res.json({ message: "User created successfully", user: newUser });

  } catch (error) {
    console.error("Add User error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// -------------------------- ADMIN: UPDATE USER ----------------------------
export const updateUser = async (req, res) => {
  try {
    const { username, password, name, role, status } = req.body;

    if (!username)
      return res.status(400).json({ message: "Username is required" });

    const updatedData = {};

    if (name?.trim()) updatedData.name = name;
    if (role?.trim()) updatedData.role = role;
    if (status?.trim()) updatedData.status = status;
    if (password?.trim())
      updatedData.password = await bcrypt.hash(password, 10);

    const updatedUser = await User.findOneAndUpdate(
      { username },        // 🔥 FIND BY USERNAME
      updatedData,
      { new: true }
    );

    if (!updatedUser)
      return res.status(404).json({ message: "User not found" });

    return res.json({
      message: "User updated successfully",
      user: updatedUser,
    });

  } catch (error) {
    console.error("Update User error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
