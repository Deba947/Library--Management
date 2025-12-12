import express from "express";
import {
  createRequest,
  getAllRequests,
  approveRequest,
  rejectRequest
} from "../controllers/requestController.js";

import { isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/create", createRequest);
router.get("/all", isAdmin, getAllRequests);
router.put("/approve/:requestId", isAdmin, approveRequest);
router.put("/reject/:requestId", isAdmin, rejectRequest);

export default router;
