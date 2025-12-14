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
    type: Number,           
    required: true
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
    enum: ["active", "cancelled"],
    default: "active"
  }
}, { timestamps: true });

export default mongoose.model("Membership", MembershipSchema);
