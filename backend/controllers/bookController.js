import Book from "../models/Book.js";
import Serial from "../models/Serial.js";

// ---------------------------- ADD BOOK / MOVIE ----------------------------
export const addBook = async (req, res) => {
  try {
    const { type, name, author, category, cost, procurementDate, serialCount } = req.body;

    if (!name || !author || !category || !cost || !procurementDate || !serialCount)
      return res.status(400).json({ message: "All fields mandatory" });

    // Create main book record
    const newBook = await Book.create({
      type: type || "book",
      name,
      author,
      category,
      cost,
      procurementDate,
      serialCount   // IMPORTANT: save in book
    });

    // Create serial numbers
    let serialList = [];
    for (let i = 1; i <= serialCount; i++) {
      const serialNumber = `${newBook._id}-${i}`;

      const serial = await Serial.create({
        bookId: newBook._id,
        serialNumber,
        bookName: newBook.name,   // REQUIRED for ReturnBook, IssueBook, Availability
        author: newBook.author,   // REQUIRED
        available: true
      });

      serialList.push(serial);
    }

    res.json({
      message: "Book/Movie added successfully",
      book: newBook,
      serials: serialList
    });

  } catch (err) {
    console.error("Add Book Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};


// ---------------------------- UPDATE BOOK / MOVIE ----------------------------
export const updateBook = async (req, res) => {
  try {
    const { bookId, type, name, author, category, cost } = req.body;

    if (!bookId)
      return res.status(400).json({ message: "Book ID required" });

    // Update main Book record
    const updated = await Book.findByIdAndUpdate(
      bookId,
      { type, name, author, category, cost },
      { new: true }
    );

    if (!updated)
      return res.status(404).json({ message: "Book not found" });

    // ----------------------------
    // UPDATE ALL SERIAL COPIES
    // ----------------------------
    const serialUpdateData = {};

    if (name) serialUpdateData.bookName = name;
    if (author) serialUpdateData.author = author;

    if (Object.keys(serialUpdateData).length > 0) {
      await Serial.updateMany(
        { bookId: bookId },
        { $set: serialUpdateData }
      );
    }

    res.json({
      message: "Book/Movie updated successfully",
      updated
    });

  } catch (err) {
    console.error("Update Book Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
