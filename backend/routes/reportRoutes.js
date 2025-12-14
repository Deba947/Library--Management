import express from "express";
import {
  masterBooks,
  masterMemberships,
  masterUsers
  // userMembership
} from "../controllers/reportController.js";

const router = express.Router();

router.get("/books", masterBooks);
router.get("/memberships", masterMemberships);
router.get("/users", masterUsers);



// router.get("/user-membership", userMembership);

export default router;
