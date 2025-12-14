import express from "express";
import {
  signup,
  loginUser,
  addUser,
  updateUser,
  deleteUser
} from "../controllers/authController.js";

import { isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// PUBLIC
router.post("/signup", signup);
router.post("/login", loginUser);

// ADMIN ONLY
router.post("/add-user", isAdmin, addUser);
router.put("/update-user", isAdmin, updateUser);
router.delete("/delete-user", isAdmin, deleteUser);




export default router;
