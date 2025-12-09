import Membership from "../models/Membership.js";

// Utility to add months to a date
function addMonths(date, months) {
  const result = new Date(date);
  result.setMonth(result.getMonth() + months);
  return result;
}

// ---------------------------- ADD MEMBERSHIP ----------------------------
export const addMembership = async (req, res) => {
  try {
    const { membershipNumber, memberName, duration } = req.body;

    if (!membershipNumber || !memberName)
      return res.status(400).json({ message: "All fields required" });

    const exists = await Membership.findOne({ membershipNumber });
    if (exists)
      return res.status(400).json({ message: "Membership number already exists" });

    const finalDuration = duration || 6; // default 6 months
    const startDate = new Date();
    const endDate = addMonths(startDate, finalDuration);

    const membership = await Membership.create({
      membershipNumber,
      memberName,
      duration: finalDuration,
      startDate,
      endDate
    });

    res.json({ message: "Membership created successfully", membership });
  } catch (err) {
    console.error("Add Membership Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ---------------------------- UPDATE MEMBERSHIP ----------------------------
export const updateMembership = async (req, res) => {
  try {
    const { membershipNumber, action, duration } = req.body;

    if (!membershipNumber)
      return res.status(400).json({ message: "Membership number required" });

    const record = await Membership.findOne({ membershipNumber });
    if (!record)
      return res.status(404).json({ message: "Membership not found" });

    // Extend Membership
    if (action === "extend") {
      const extendBy = duration || 6; // Default extend = 6 months
      record.endDate = addMonths(record.endDate, extendBy);
      record.status = "active";
    }

    // Cancel Membership
    if (action === "cancel") {
      record.status = "cancelled";
    }

    await record.save();
    res.json({ message: "Membership updated", record });

  } catch (err) {
    console.error("Update Membership Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
