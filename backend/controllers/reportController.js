import Book from "../models/Book.js";
import Serial from "../models/Serial.js";
import Membership from "../models/Membership.js";
import User from "../models/User.js";
import IssueRequest from "../models/IssueRequest.js";

// ---------------------------- MASTER BOOK LIST ----------------------------
export const masterBooks = async (req, res) => {
  try {
    const books = await Book.find().sort({ name: 1 });

    const result = [];
    for (let b of books) {
      const serials = await Serial.find({ bookId: b._id });
      result.push({
        book: b,
        serialCount: serials.length,
        availableCount: serials.filter(s => s.available).length,
        serials
      });
    }

    res.json(result);

  } catch (err) {
    console.error("Master Books Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ---------------------------- MASTER MEMBERSHIP LIST ----------------------------
export const masterMemberships = async (req, res) => {
  try {
    const list = await Membership.find().sort({ membershipNumber: 1 });
    res.json(list);
  } catch (err) {
    console.error("Master Membership Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ---------------------------- MASTER USER LIST ----------------------------
export const masterUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ name: 1 });
    res.json(users);
  } catch (err) {
    console.error("Master Users Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ---------------------------- PENDING ISSUE REQUESTS ----------------------------
export const pendingRequests = async (req, res) => {
  try {
    const list = await IssueRequest.find({ status: "pending" })
      .populate("bookId")
      .populate("serialId")
      .populate("userId");

    res.json(list);
  } catch (err) {
    console.error("Pending Requests Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
