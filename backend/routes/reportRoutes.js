import express from "express";
import {
  masterBooks,
  masterMemberships,
  masterUsers,
  pendingRequests
} from "../controllers/reportController.js";

const router = express.Router();

router.get("/books", masterBooks);
router.get("/memberships", masterMemberships);
router.get("/users", masterUsers);
router.get("/pending", pendingRequests);

export default router;
