import express from "express";
import {
  searchAvailableBooks,
  issueBook,
  getIssuedRecord,
  returnBook,
  overdueBooks,
  activeIssues
} from "../controllers/transactionController.js";

const router = express.Router();

// Transaction routes
router.get("/search", searchAvailableBooks);
router.post("/issue", issueBook);
router.get("/issued-details", getIssuedRecord);
router.post("/return", returnBook);

// Reports
router.get("/overdue", overdueBooks);
router.get("/active", activeIssues);

export default router;
