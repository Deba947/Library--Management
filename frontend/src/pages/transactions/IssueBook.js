import React, { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import API from "../../api";
import { AuthContext } from "../../context/AuthContext";

const IssueBook = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  // ---- Always create hooks at the top (ESLint safe) ----
  const serial = state?.serial || null;

  const today = new Date().toISOString().split("T")[0];

  const getDefaultReturnDate = () => {
    let d = new Date();
    d.setDate(d.getDate() + 15);
    return d.toISOString().split("T")[0];
  };

  const [issueDate, setIssueDate] = useState(today);
  const [returnDate, setReturnDate] = useState(getDefaultReturnDate());
  const [remarks, setRemarks] = useState("");
  const [error, setError] = useState("");

  // ---- If serial missing → block screen (AFTER hooks) ----
  if (!serial) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger">
          Invalid action. Please select a book from the availability page.
        </div>
      </div>
    );
  }

  // ---- Submit request ----
  const submitIssue = async () => {
    setError("");

    // Validation: issue date cannot be before today
    if (new Date(issueDate) < new Date(today)) {
      setError("Issue date cannot be earlier than today.");
      return;
    }

    // Validation: return date cannot exceed 15 days
    const max = new Date(issueDate);
    max.setDate(max.getDate() + 15);

    if (new Date(returnDate) > max) {
      setError("Return date cannot exceed 15 days from issue date.");
      return;
    }

    try {
      await API.post("/transaction/issue", {
        userId: user.id,
        bookId: serial.bookId,
        serialId: serial._id,
        issueDate,
        returnDate,
        remarks,
      });

      navigate("/transactions");
    } catch (err) {
      setError(err.response?.data?.message || "Issue failed. Please try again.");
    }
  };

  return (
    <div className="container mt-4">
      <h3>Issue Book</h3>
      <hr />

      {/* Book Name */}
      <div className="mb-3">
        <label>Book Name:</label>
        <input className="form-control" value={serial.bookName} disabled />
      </div>

      {/* Author */}
      <div className="mb-3">
        <label>Author:</label>
        <input className="form-control" value={serial.author} disabled />
      </div>

      {/* Serial Number */}
      <div className="mb-3">
        <label>Serial Number:</label>
        <input className="form-control" value={serial.serialNumber} disabled />
      </div>

      {/* Issue Date */}
      <label>Issue Date:</label>
      <input
        type="date"
        className="form-control mb-3"
        value={issueDate}
        onChange={(e) => setIssueDate(e.target.value)}
      />

      {/* Return Date */}
      <label>Return Date (Max 15 days):</label>
      <input
        type="date"
        className="form-control mb-3"
        value={returnDate}
        onChange={(e) => setReturnDate(e.target.value)}
      />

      {/* Remarks */}
      <textarea
        className="form-control mb-3"
        placeholder="Remarks (optional)"
        value={remarks}
        onChange={(e) => setRemarks(e.target.value)}
      />

      {error && <div className="alert alert-danger">{error}</div>}

      <button className="btn btn-primary" onClick={submitIssue}>
        Issue Book
      </button>
    </div>
  );
};

export default IssueBook;
