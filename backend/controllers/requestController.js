import User from "../models/User.js";
import Serial from "../models/Serial.js";
import IssueRequest from "../models/IssueRequest.js";
import Transaction from "../models/Transaction.js";

//  USER : CREATE REQUEST 
export const createRequest = async (req, res) => {
  try {
    const { username, bookId, serialId } = req.body;

    if (!username || !bookId || !serialId)
      return res.status(400).json({ message: "All fields required" });

    // FIND USER BY USERNAME
    const user = await User.findOne({ username });
    if (!user)
      return res.status(404).json({ message: "User not found" });

    // HANDLE serialId OR serialNumber
    let serial;
    if (serialId.length === 24) {
      serial = await Serial.findById(serialId);
    }
    if (!serial) {
      serial = await Serial.findOne({ serialNumber: serialId });
    }

    if (!serial)
      return res.status(404).json({ message: "Serial not found" });

    if (!serial.available)
      return res.status(400).json({ message: "Book copy not available" });

    // CHECK DUPLICATE REQUEST
    const existing = await IssueRequest.findOne({
      userId: user._id,
      serialId: serial._id,
      status: "pending"
    });

    if (existing)
      return res.status(400).json({ message: "Request already pending" });

    // CREATE REQUEST
    const request = await IssueRequest.create({
      userId: user._id,
      bookId,
      serialId: serial._id,
      status: "pending"
    });

    res.json({ message: "Issue request submitted", request });

  } catch (err) {
    console.error("Create Request Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

//  ADMIN : VIEW ALL REQUESTS 
export const getAllRequests = async (req, res) => {
  try {
    const list = await IssueRequest.find()
      .populate("userId")
      .populate("bookId")
      .populate("serialId")
      .sort({ createdAt: -1 });

    res.json(list);
  } catch (err) {
    console.error("Get All Requests Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ADMIN : APPROVE REQUEST (ISSUE BOOK) 
export const approveRequest = async (req, res) => {
  try {
    const { requestId } = req.params;

    // Fetch the request and ensure it exists
    const reqData = await IssueRequest.findById(requestId);

    if (!reqData)
      return res.status(404).json({ message: "Request not found" });

    // 1. CHECK REQUEST STATUS: Only approve pending requests
    if (reqData.status !== "pending") {
      return res.status(400).json({ message: `Request is already ${reqData.status}. Cannot approve.` });
    }

    // 2. GET SERIAL & PERFORM CRITICAL AVAILABILITY CHECK
    const serial = await Serial.findById(reqData.serialId);
    
    if (!serial) {
      reqData.status = "rejected"; 
      await reqData.save();
      return res.status(400).json({ message: "Book copy (Serial) not found for this request. Request rejected." });
    }

    // 3. CRITICAL CHECK: If the serial is not available
    if (!serial.available) {
      const existingTransaction = await Transaction.findOne({
        serialId: reqData.serialId,
        returned: false
      });
        
      let rejectMessage = "Cannot approve request. The book copy (serial) is already issued or pending approval.";

      if (existingTransaction) {
        rejectMessage = "Cannot approve request. The book copy (serial) has already been issued to another user.";
      }
        
      reqData.status = "rejected"; 
      await reqData.save();
        
      return res.status(400).json({ message: rejectMessage });
    }

    // 4. PROCEED WITH APPROVAL (MARK SERIAL UNAVAILABLE)
    serial.available = false;
    await serial.save();

    const issueDate = new Date();
    const returnDate = new Date();
    returnDate.setDate(issueDate.getDate() + 7);

    // 5. CREATE TRANSACTION
    const transaction = await Transaction.create({
      userId: reqData.userId,
      bookId: reqData.bookId,
      serialId: reqData.serialId,
      issueDate,
      returnDate
    });

    // 6. UPDATE REQUEST STATUS
    reqData.status = "approved";
    await reqData.save();

    res.json({ message: "Request approved", transaction });
  } catch (err) {
    console.error("Approve Request Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

//  ADMIN : REJECT REQUEST 
export const rejectRequest = async (req, res) => {
  try {
    const { requestId } = req.params;

    const reqData = await IssueRequest.findById(requestId);
    if (!reqData)
      return res.status(404).json({ message: "Request not found" });

    reqData.status = "rejected";
    await reqData.save();

    res.json({ message: "Request rejected" });
  } catch (err) {
    console.error("Reject Request Error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
