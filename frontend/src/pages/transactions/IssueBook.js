import React, { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import API from "../../api";
import { AuthContext } from "../../context/AuthContext";

const IssueBook = () => {
  const { state } = useLocation();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const serial = state?.serial;

  const today = new Date().toISOString().split("T")[0];

  const getReturnDate = () => {
    let d = new Date();
    d.setDate(d.getDate() + 15);
    return d.toISOString().split("T")[0];
  };

  const [issueDate, setIssueDate] = useState(today);
  const [returnDate, setReturnDate] = useState(getReturnDate());
  const [remarks, setRemarks] = useState("");
  const [error, setError] = useState("");

  const submit = async () => {
    if (new Date(issueDate) < new Date(today)) {
      setError("Issue date cannot be before today");
      return;
    }

    const maxReturn = new Date(issueDate);
    maxReturn.setDate(maxReturn.getDate() + 15);

    if (new Date(returnDate) > maxReturn) {
      setError("Return date cannot exceed 15 days limit");
      return;
    }

    try {
      await API.post("/transaction/issue", {
        userId: user.id,
        bookId: serial.bookId,
        serialId: serial._id,
        issueDate,
        returnDate,
        remarks
      });

      navigate("/transactions");

    } catch (err) {
      setError(err.response?.data?.message || "Issue failed");
    }
  };

  return (
    <div className="container mt-4">
      <h3>Issue Book</h3>
      <hr />

      <p><b>Serial:</b> {serial.serialNumber}</p>

      <label>Issue Date:</label>
      <input
        type="date"
        className="form-control mb-3"
        value={issueDate}
        onChange={(e) => setIssueDate(e.target.value)}
      />

      <label>Return Date (Max 15 days):</label>
      <input
        type="date"
        className="form-control mb-3"
        value={returnDate}
        onChange={(e) => setReturnDate(e.target.value)}
      />

      <textarea
        className="form-control mb-3"
        placeholder="Remarks (optional)"
        onChange={(e) => setRemarks(e.target.value)}
      ></textarea>

      {error && <div className="alert alert-danger">{error}</div>}

      <button className="btn btn-primary" onClick={submit}>
        Issue Book
      </button>
    </div>
  );
};

export default IssueBook;
