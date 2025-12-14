import User from "../models/User.js";
import bcrypt from "bcryptjs";

// SIGNUP 
export const signup = async (req, res) => {
  try {
    const { username, password, name, role } = req.body;

    if (!username || !password || !name)
      return res.status(400).json({ message: "All fields required" });

    const exists = await User.findOne({ username });
    if (exists)
      return res.status(400).json({ message: "Username already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      password: hashedPassword,
      name,
      role: role || "user",
    });

    res.json({ message: "Signup successful", user });

  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

//  LOGIN
export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user)
      return res.status(404).json({ message: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match)
      return res.status(400).json({ message: "Incorrect password" });

    res.json({
      message: "Login successful",
      user: {
        id: user._id,
        username: user.username,
        name: user.name,
        role: user.role,
      }
    });

  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ADMIN: ADD USER 
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
      role,
    });

    res.json({ message: "User created successfully", newUser });

  } catch (err) {
    console.error("Add User error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

//  ADMIN: UPDATE USER BY USERNAME 
export const updateUser = async (req, res) => {
  try {
    const { username, name, password, role, status } = req.body;

    if (!username)
      return res.status(400).json({ message: "Username is required" });

    const updatedData = {};

    if (name) updatedData.name = name;
    if (role) updatedData.role = role;
    if (status) updatedData.status = status;
    if (password) updatedData.password = await bcrypt.hash(password, 10);

    const user = await User.findOneAndUpdate(
      { username },
      updatedData,
      { new: true }
    );

    if (!user)
      return res.status(404).json({ message: "User not found" });

    res.json({ message: "User updated successfully", user });

  } catch (err) {
    console.error("Update User error:", err);
    res.status(500).json({ message: "Server error" });
  }
};



// ADMIN: DELETE USER BY USERNAME
export const deleteUser = async (req, res) => {
  try {
    const { username } = req.body; 

    if (!username)
      return res.status(400).json({ message: "Username is required" });

    // Prevent deleting the user with the 'admin' role, or add a check to prevent deleting yourself
    const userToDelete = await User.findOne({ username });
    if (userToDelete && userToDelete.role === "admin") {
        return res.status(403).json({ message: "Cannot delete an admin user via this route." });
    }

    const user = await User.findOneAndDelete({ username });

    if (!user)
      return res.status(404).json({ message: "User not found" });

    res.json({ message: "User deleted successfully", user });

  } catch (err) {
    console.error("Delete User error:", err);
    res.status(500).json({ message: "Server error" });
  }
};