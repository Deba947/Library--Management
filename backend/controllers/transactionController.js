import Serial from "../models/Serial.js";
import Book from "../models/Book.js";
import Transaction from "../models/Transaction.js";
import User from "../models/User.js";  

// SEARCH 
export const searchAvailableBooks = async (req, res) => {
  try {
    let { name, author } = req.query;

    name = name?.trim();
    author = author?.trim();

    if (!name && !author) {
      return res.status(400).json({
        message: "Enter book name or author to search"
      });
    }

    const orConditions = [];

    if (name) {
      orConditions.push({
        name: { $regex: `^${name}`, $options: "i" }
      });
    }

    if (author) {
      orConditions.push({
        author: { $regex: `^${author}`, $options: "i" }
      });
    }

    const books = await Book.find({ $or: orConditions });

    const result = [];
    for (const book of books) {
      const serials = await Serial.find({ bookId: book._id });
      result.push({ book, serials });
    }

    res.json(result);
  } catch (err) {
    console.error("Search Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

//  GET ACTIVE ISSUE
export const getIssuedRecord = async (req, res) => {
  try {
    const { serialNumber } = req.query;

    const serial = await Serial.findOne({ serialNumber });

    if (!serial)
      return res.status(404).json({ message: "Invalid serial" });

    const trx = await Transaction.findOne({
      serialId: serial._id,
      status: "issued"
    })
      .populate("userId")
      .populate("bookId")
      .populate("serialId");

    if (!trx)
      return res.status(404).json({ message: "No active issue" });

    res.json(trx);

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// RETURN BOOK 
export const returnBook = async (req, res) => {
  try {
    const { transactionId, actualReturnDate, remarks, finePaid } = req.body;

    const trx = await Transaction.findById(transactionId);

    if (!trx)
      return res.status(404).json({ message: "Transaction not found" });

    const daysLate = Math.ceil(
      (new Date(actualReturnDate) - new Date(trx.returnDate)) /
      (1000 * 60 * 60 * 24)
    );

    const fine = daysLate > 0 ? daysLate * 10 : 0;

    if (fine > 0 && !finePaid)
      return res.status(400).json({ message: "Fine must be paid" });

    const serial = await Serial.findById(trx.serialId);
    serial.available = true;
    await serial.save();

    trx.actualReturnDate = actualReturnDate;
    trx.remarks = remarks;
    trx.status = "returned";
    trx.fine = fine;
    trx.finePaid = fine > 0 ? finePaid : true;

    await trx.save();

    res.json({ message: "Book returned", trx });

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};


// OVERDUE BOOKS (Admin: all, User: own only) 
export const overdueBooks = async (req, res) => {
  try {
    const role = req.header("x-role");
    const username = req.header("x-username"); // frontend sends this

    let query = {
      status: "issued",
      returnDate: { $lt: new Date() }
    };

    // USER SEES ONLY THEIR OWN RECORDS
    if (role === "user") {
      const user = await User.findOne({ username });

      if (!user) return res.json([]);

      query.userId = user._id; // filter for specific user
    }

    const overdue = await Transaction.find(query)
      .populate("userId")
      .populate("serialId")
      .populate("bookId");

    res.json(overdue);

  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};


//  ALL ACTIVE ISSUES
export const activeIssues = async (req, res) => {
  try {
    const role = req.header("x-role");
    const username = req.header("x-username");

    let query = { status: "issued" };

    // USER  ONLY OWN ISSUES
    if (role === "user") {

      
      if (!username) {
        return res.status(400).json({
          message: "Username header missing"
        });
      }

      const user = await User.findOne({ username });

      if (!user) {
        return res.status(404).json({
          message: "User not found"
        });
      }

      query.userId = user._id;
    }

    const list = await Transaction.find(query)
      .populate("userId")
      .populate("serialId")
      .populate("bookId");

    res.json(list);

  } catch (err) {
    console.error("Active Issues Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
