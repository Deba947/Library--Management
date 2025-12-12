import Membership from "../models/Membership.js";
import User from "../models/User.js";
import Book from "../models/Book.js";
import Serial from "../models/Serial.js";

/* ============================================================
   MASTER MEMBERSHIPS (ADMIN: all, USER: only own)
   ============================================================ */
export const masterMemberships = async (req, res) => {
  try {
    const role = req.header("x-role");
    const username = req.header("x-username");

    let query = {};

    // USER → only own membership
    if (role === "user") {
      const user = await User.findOne({ username });

      if (!user) return res.json([]);

      query.memberName = user.name; // membership is stored using "name", not username
    }

    const list = await Membership.find(query).sort({ createdAt: -1 });
    res.json(list);

  } catch (err) {
    console.error("Membership Report Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/* ============================================================
   MASTER USERS (ADMIN ONLY)
   ============================================================ */
export const masterUsers = async (req, res) => {
  try {
    const role = req.header("x-role");

    if (role !== "admin")
      return res.status(403).json({ message: "Access denied" });

    const list = await User.find().sort({ createdAt: -1 });
    res.json(list);

  } catch (err) {
    console.error("Master Users Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

/* ============================================================
   MASTER BOOKS (ADMIN + USER: both allowed)
   ============================================================ */
export const masterBooks = async (req, res) => {
  try {
    const books = await Book.find();

    const response = [];

    for (let b of books) {
      const serials = await Serial.find({ bookId: b._id });

      response.push({
        book: b,
        serialCount: serials.length,
        availableCount: serials.filter(s => s.available).length,
        serials
      });
    }

    res.json(response);

  } catch (err) {
    console.error("Master Books Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
