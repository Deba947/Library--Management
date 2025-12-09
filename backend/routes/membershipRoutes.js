import express from "express";
import { addMembership, updateMembership } from "../controllers/membershipController.js";
import { isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/add", isAdmin, addMembership);
router.put("/update", isAdmin, updateMembership);

export default router;
