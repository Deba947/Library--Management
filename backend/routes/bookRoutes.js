import express from "express";
import { addBook, updateBook } from "../controllers/bookController.js";
import { isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/add", isAdmin, addBook);
router.put("/update", isAdmin, updateBook);


export default router;
