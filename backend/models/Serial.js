import mongoose from "mongoose";

const SerialSchema = new mongoose.Schema({
  bookId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Book",
    required: true
  },

  serialNumber: {
    type: String,
    required: true,
    unique: true
  },

  // NEW FIELDS — required for IssueBook & ReturnBook
  bookName: {
    type: String,
    required: true
  },

  author: {
    type: String,
    required: true
  },

  available: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

export default mongoose.model("Serial", SerialSchema);
