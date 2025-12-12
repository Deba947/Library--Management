import express from "express";
import {
  signup,
  loginUser,
  addUser,
  updateUser
} from "../controllers/authController.js";
import { isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// PUBLIC
router.post("/signup", signup);
router.post("/login", loginUser);

// ADMIN
router.post("/add-user", isAdmin, addUser);
router.put("/update-user", isAdmin, updateUser);

export default router;
