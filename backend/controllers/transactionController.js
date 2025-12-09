import Book from "../models/Book.js";
import Serial from "../models/Serial.js";
import Transaction from "../models/Transaction.js";

// ---------------------------- BOOK AVAILABILITY SEARCH ----------------------------
export const searchAvailableBooks = async (req, res) => {
  try {
    const { name, author } = req.query;

    if (!name && !author)
      return res.status(400).json({ message: "Enter book name or author" });

    const books = await Book.find({
      $or: [
        { name: new RegExp(name, "i") },
        { author: new RegExp(author, "i") }
      ]
    });

    let result = [];
    for (let b of books) {
      const serials = await Serial.find({ bookId: b._id });
      result.push({ book: b, serials });
    }

    res.json(result);

  } catch (err) {
    console.error("Search Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ---------------------------- ISSUE BOOK ----------------------------
export const issueBook = async (req, res) => {
  try {
    const { userId, bookId, serialId, issueDate, returnDate, remarks } = req.body;

    if (!userId || !bookId || !serialId || !issueDate || !returnDate)
      return res.status(400).json({ message: "All fields are mandatory" });

    const serial = await Serial.findById(serialId);
    if (!serial.available)
      return res.status(400).json({ message: "Book copy unavailable" });

    // Mark as unavailable
    serial.available = false;
    await serial.save();

    const transaction = await Transaction.create({
      userId,
      bookId,
      serialId,
      issueDate,
      returnDate,
      remarks,
      status: "issued"
    });

    res.json({
      message: "Book issued successfully",
      transaction
    });

  } catch (err) {
    console.error("Issue Book Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ---------------------------- GET ISSUE DETAILS FOR RETURN SCREEN ----------------------------
export const getIssuedRecord = async (req, res) => {
  try {
    const { serialNumber } = req.query;

    const serial = await Serial.findOne({ serialNumber });
    if (!serial)
      return res.status(404).json({ message: "Invalid serial number" });

    const trx = await Transaction.findOne({
      serialId: serial._id,
      status: "issued"
    })
      .populate("bookId")
      .populate("userId")
      .populate("serialId");

    if (!trx)
      return res.status(404).json({ message: "No active issue found" });

    res.json(trx);

  } catch (err) {
    console.error("Fetch Issue Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ---------------------------- RETURN BOOK (CALCULATE FINE) ----------------------------
export const returnBook = async (req, res) => {
  try {
    const { transactionId, actualReturnDate, remarks, finePaid } = req.body;

    const trx = await Transaction.findById(transactionId);
    if (!trx)
      return res.status(404).json({ message: "Transaction not found" });

    // Calculate fine
    const diff = Math.ceil(
      (new Date(actualReturnDate) - new Date(trx.returnDate)) / (1000 * 60 * 60 * 24)
    );

    let fine = diff > 0 ? diff * 10 : 0;

    if (fine > 0 && !finePaid)
      return res.status(400).json({ message: "Fine must be paid before returning" });

    // Update serial availability
    const serial = await Serial.findById(trx.serialId);
    serial.available = true;
    await serial.save();

    // Update transaction
    trx.actualReturnDate = actualReturnDate;
    trx.fine = fine;
    trx.finePaid = fine > 0 ? finePaid : true;
    trx.remarks = remarks;
    trx.status = "returned";
    await trx.save();

    res.json({
      message: "Book returned successfully",
      transaction: trx
    });

  } catch (err) {
    console.error("Return Book Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ---------------------------- OVERDUE REPORT ----------------------------
export const overdueBooks = async (req, res) => {
  try {
    const today = new Date();

    const overdue = await Transaction.find({
      status: "issued",
      returnDate: { $lt: today }
    })
      .populate("bookId")
      .populate("serialId")
      .populate("userId");

    res.json(overdue);

  } catch (err) {
    console.error("Overdue Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ---------------------------- ACTIVE ISSUES REPORT ----------------------------
export const activeIssues = async (req, res) => {
  try {
    const list = await Transaction.find({ status: "issued" })
      .populate("bookId")
      .populate("serialId")
      .populate("userId");

    res.json(list);

  } catch (err) {
    console.error("Active Issues Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
