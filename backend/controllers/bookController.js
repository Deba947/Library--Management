import mongoose from "mongoose";
import Book from "../models/Book.js";
import Serial from "../models/Serial.js";
import Transaction from "../models/Transaction.js";

// ADD BOOK
export const addBook = async (req, res) => {
  try {
    const {
      type,
      name,
      author,
      category,
      cost,
      procurementDate,
      serialCount
    } = req.body;

    // Validation
    if (
      !name ||
      !author ||
      !category ||
      cost === undefined ||
      !procurementDate ||
      serialCount === undefined
    ) {
      return res.status(400).json({ message: "All fields mandatory" });
    }

    // Create Book
    const newBook = await Book.create({
      type: type || "book",
      name,
      author,
      category,
      cost,
      procurementDate,
      serialCount
    });

    // Create Serials
    const serials = [];
    for (let i = 1; i <= serialCount; i++) {
      serials.push({
        bookId: newBook._id,
        serialNumber: `${newBook._id}-${i}`,
        bookName: newBook.name,
        author: newBook.author,
        available: true
      });
    }

    await Serial.insertMany(serials);

    res.status(201).json({
      message: "Book added successfully",
      book: newBook,
      totalSerials: serialCount
    });

  } catch (err) {
    console.error("Add Book Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

//UPDATE BOOK 
export const updateBook = async (req, res) => {
  try {
    const { bookId, type, name, author, category, cost } = req.body;

    const updated = await Book.findByIdAndUpdate(
      bookId,
      { type, name, author, category, cost },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Book not found" });
    }

    const serialUpdate = {};
    if (name) serialUpdate.bookName = name;
    if (author) serialUpdate.author = author;

    if (Object.keys(serialUpdate).length > 0) {
      await Serial.updateMany({ bookId }, { $set: serialUpdate });
    }

    res.json({ message: "Book updated", updated });
  } catch (err) {
    console.error("Update Book Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid Book ID" });
    }

    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    // Prevent delete if issued
    const active = await Transaction.findOne({
      bookId: id,
      status: "issued"
    });

    if (active) {
      return res.status(400).json({
        message: "Book cannot be deleted. Active issues exist."
      });
    }

    await Serial.deleteMany({ bookId: id });
    await Book.findByIdAndDelete(id);

    res.json({ message: "Book deleted successfully" });

  } catch (err) {
    console.error("Delete Book Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
