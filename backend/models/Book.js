import mongoose from "mongoose";

const BookSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["book", "movie"],
    default: "book"
  },

  name: {
    type: String,
    required: true
  },

  author: {
    type: String,
    required: true
  },

  category: {
    type: String,
    required: true
  },

  cost: {
    type: Number,
    required: true
  },

  procurementDate: {
    type: Date,
    required: true
  },

  
  serialCount: {
    type: Number,
    default: 1
  }
}, { timestamps: true });

export default mongoose.model("Book", BookSchema);
