import mongoose from "mongoose";

const MembershipSchema = new mongoose.Schema({
  membershipNumber: {
    type: String,
    required: true,
    unique: true
  },
  memberName: {
    type: String,
    required: true
  },
  duration: {
    type: Number, // In months (6, 12, 24)
    required: true,
    default: 6
  },
  startDate: {
    type: Date,
    default: Date.now
  },
  endDate: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ["active", "expired", "cancelled"],
    default: "active"
  }
}, { timestamps: true });

export default mongoose.model("Membership", MembershipSchema);
