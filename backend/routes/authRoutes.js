import express from "express";
import {
  signup,
  loginUser,
  addUser,
  updateUser
} from "../controllers/authController.js";
import { isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public
router.post("/signup", signup);     // user/admin signup
router.post("/login", loginUser);   // login both roles

// Admin
router.post("/add-user", isAdmin, addUser);
router.put("/update-user", isAdmin, updateUser);

export default router;
