import React, { useState } from "react";
import API from "../../api";
import { useNavigate } from "react-router-dom";

const ReturnBook = () => {
  const [serialNumber, setSerialNumber] = useState("");
  const [trx, setTrx] = useState(null);
  const [actualReturnDate, setActualReturnDate] = useState("");
  const [remarks, setRemarks] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const findTransaction = async () => {
    try {
      const res = await API.get(
        `/transaction/issued-details?serialNumber=${serialNumber}`
      );
      setTrx(res.data);
    } catch (err) {
      setError("No issued record found");
    }
  };

  const proceed = () => {
    navigate("/transactions/pay-fine", {
      state: { trx, actualReturnDate, remarks }
    });
  };

  return (
    <div className="container mt-4">
      <h3>Return Book</h3>
      <hr />

      {!trx && (
        <>
          <input
            className="form-control mb-3"
            placeholder="Serial Number"
            onChange={(e) => setSerialNumber(e.target.value)}
          />

          <button className="btn btn-primary" onClick={findTransaction}>
            Search
          </button>

          {error && <div className="alert alert-danger mt-3">{error}</div>}
        </>
      )}

      {trx && (
        <>
          <p><b>Book:</b> {trx.bookId.name}</p>
          <p><b>Author:</b> {trx.bookId.author}</p>
          <p><b>Issue Date:</b> {trx.issueDate.split("T")[0]}</p>
          <p><b>Return Date:</b> {trx.returnDate.split("T")[0]}</p>

          <label>Actual Return Date:</label>
          <input
            type="date"
            className="form-control mb-3"
            onChange={(e) => setActualReturnDate(e.target.value)}
          />

          <textarea
            className="form-control mb-3"
            placeholder="Remarks"
            onChange={(e) => setRemarks(e.target.value)}
          ></textarea>

          <button className="btn btn-success" onClick={proceed}>
            Proceed to Fine Calculation
          </button>
        </>
      )}
    </div>
  );
};

export default ReturnBook;
