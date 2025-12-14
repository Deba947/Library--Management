import Membership from "../models/Membership.js";
import User from "../models/User.js";
import Book from "../models/Book.js";
import Serial from "../models/Serial.js";
import Transaction from "../models/Transaction.js";


// MASTER MEMBERSHIPS (ADMIN: all, USER: only own)
export const masterMemberships = async (req, res) => {
  try {
    const role = req.header("x-role");
    const username = req.header("x-username");

    let query = {};

    // USER only own membership
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


// MASTER USERS (ADMIN ONLY)
export const masterUsers = async (req, res) => {
  try {
    const role = req.header("x-role");

    // Only admin allowed
    if (role !== "admin") {
      return res.status(403).json({ message: "Admin access required" });
    }

    const users = await User.find().sort({ createdAt: -1 });
    res.json(users);

  } catch (err) {
    console.error("Master Users Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};



export const masterBooks = async (req, res) => {
  try {
    const role = req.header("x-role");
    const username = req.header("x-username");

    let books = [];
    let transactionsByUser = [];
    let userBorrowedBookIds = [];
    let userBorrowedSerialIds = [];

    // ADMIN LOGIC
    if (role === "admin") {
      books = await Book.find();
    }

    // USER LOGIC 
    else if (role === "user") {
      const user = await User.findOne({ username });

      if (!user) return res.json([]);

      transactionsByUser = await Transaction.find({
        userId: user._id,
        returned: { $ne: true } // Find transactions that are NOT returned
      });

      if (transactionsByUser.length === 0) return res.json([]);

      // Extract unique book IDs and all serial IDs for active loans
      userBorrowedBookIds = [...new Set(transactionsByUser.map(t => t.bookId))];
      userBorrowedSerialIds = transactionsByUser.map(t => t.serialId);

      // Load ONLY the books the user has actively borrowed
      books = await Book.find({ _id: { $in: userBorrowedBookIds } });
    } else {
      return res.status(403).json({ message: "Access denied" });
    }

    const response = [];

    for (const book of books) {
      let serials;

      if (role === "admin") {
        // ADMIN: Load all serials for this book
        serials = await Serial.find({ bookId: book._id });
      } else {
        // USER: Load ONLY the specific serials/copies they borrowed (active transactions)
        serials = await Serial.find({
          _id: { $in: userBorrowedSerialIds },
          bookId: book._id
        });
      }

      response.push({
        book,
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
