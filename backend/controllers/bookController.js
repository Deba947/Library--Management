import Book from "../models/Book.js";
import Serial from "../models/Serial.js";

// ---------------------------- ADD BOOK / MOVIE ----------------------------
export const addBook = async (req, res) => {
  try {
    const { type, name, author, category, cost, procurementDate, serialCount } = req.body;

    if (!name || !author || !category || !cost || !procurementDate || !serialCount)
      return res.status(400).json({ message: "All fields mandatory" });

    const newBook = await Book.create({
      type: type || "book",
      name,
      author,
      category,
      cost,
      procurementDate
    });

    // Add serial numbers
    let serialList = [];
    for (let i = 1; i <= serialCount; i++) {
      const serialNumber = `${newBook._id}-${i}`;
      const serial = await Serial.create({
        bookId: newBook._id,
        serialNumber
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

    const updated = await Book.findByIdAndUpdate(
      bookId,
      { type, name, author, category, cost },
      { new: true }
    );

    if (!updated)
      return res.status(404).json({ message: "Book not found" });

    res.json({
      message: "Book/Movie updated successfully",
      updated
    });

  } catch (err) {
    console.error("Update Book Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
