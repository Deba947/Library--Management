import express from "express";
import {
  searchAvailableBooks,
  getIssuedRecord,
  returnBook,
  overdueBooks,
  activeIssues
} from "../controllers/transactionController.js";

const router = express.Router();

router.get("/search", searchAvailableBooks);
router.get("/issued-details", getIssuedRecord);
router.post("/return", returnBook);
router.get("/overdue", overdueBooks);
router.get("/active", activeIssues);

export default router;
