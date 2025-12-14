import express from "express";
import {
  addBook,
  updateBook,
  deleteBook
} from "../controllers/bookController.js";
import { isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/books/add", isAdmin, addBook);
router.put("/books/update", isAdmin, updateBook);

router.delete("/books/:id", isAdmin, deleteBook);

export default router;
