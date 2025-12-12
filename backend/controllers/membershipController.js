import Membership from "../models/Membership.js";

// Utility: add months to date
function addMonths(date, months) {
  const result = new Date(date);
  result.setMonth(result.getMonth() + months);
  return result;
}

// -------------------------------- ADD MEMBERSHIP --------------------------------
export const addMembership = async (req, res) => {
  try {
    const { membershipNumber, memberName, duration } = req.body;

    if (!membershipNumber || !memberName)
      return res.status(400).json({ message: "All fields required" });

    const exists = await Membership.findOne({ membershipNumber });
    if (exists)
      return res.status(400).json({ message: "Membership already exists" });

    const months = duration || 6;
    const startDate = new Date();
    const endDate = addMonths(startDate, months);

    const membership = await Membership.create({
      membershipNumber,
      memberName,
      startDate,
      endDate,
      status: "active"
    });

    res.json({ message: "Membership added successfully", membership });
  } catch (err) {
    console.error("Add Membership Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// -------------------------------- UPDATE MEMBERSHIP (EXTEND / CANCEL) --------------------------------
export const updateMembership = async (req, res) => {
  try {
    const { membershipNumber, action, duration } = req.body;

    const member = await Membership.findOne({ membershipNumber });
    if (!member)
      return res.status(404).json({ message: "Membership not found" });

    // EXTEND MEMBERSHIP
    if (action === "extend") {
      const extraMonths = duration || 6;

      let newEnd = new Date(member.endDate);
      newEnd.setMonth(newEnd.getMonth() + extraMonths);

      member.endDate = newEnd;
      member.status = "active";

      await member.save();

      return res.json({
        message: "Membership extended successfully",
        member
      });
    }

    // CANCEL MEMBERSHIP (changes status but does NOT delete)
    if (action === "cancel") {
      member.status = "cancelled";
      await member.save();

      return res.json({ message: "Membership cancelled", member });
    }

    res.status(400).json({ message: "Invalid action" });
  } catch (err) {
    console.error("Update Membership Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// -------------------------------- DELETE MEMBERSHIP --------------------------------
export const deleteMembership = async (req, res) => {
  try {
    const { membershipNumber } = req.params;

    const deleted = await Membership.findOneAndDelete({ membershipNumber });

    if (!deleted)
      return res.status(404).json({ message: "Membership not found" });

    res.json({ message: "Membership deleted successfully" });

  } catch (err) {
    console.error("Delete Membership Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
// -------------------------------- LIST MEMBERSHIPS --------------------------------
export const listMemberships = async (req, res) => {
  try {
    const role = req.header("x-role");
    const username = req.header("x-username"); // sent by frontend for filtering

    let query = {};

    // USER → only see their own membership
    if (role === "user") {
      query.memberName = username;  
    }

    const data = await Membership.find(query).sort({ createdAt: -1 });
    res.json(data);

  } catch (err) {
    console.error("List Membership Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

