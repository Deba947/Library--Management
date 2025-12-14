import express from "express";
import { addMembership, updateMembership, deleteMembership } from "../controllers/membershipController.js";
import { isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/add", isAdmin, addMembership);
router.put("/update", isAdmin, updateMembership);


router.delete("/delete/:membershipNumber", isAdmin, deleteMembership); 


export default router;