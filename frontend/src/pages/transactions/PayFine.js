import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import API from "../../api";

const PayFine = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const trx = state?.record;
  const [actualReturnDate, setActualReturn] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [fine, setFine] = useState(0);
  const [finePaid, setFinePaid] = useState(false);
  const [remarks, setRemarks] = useState("");

  useEffect(() => {
    if (trx) {
      const due = new Date(trx.returnDate);
      const act = new Date(actualReturnDate);

      const diff = Math.ceil((act - due) / (1000 * 60 * 60 * 24));
      setFine(diff > 0 ? diff * 10 : 0);
    }
  }, [actualReturnDate, trx]);

  const submitReturn = async () => {
    if (fine > 0 && !finePaid) {
      alert("Fine must be paid");
      return;
    }

    await API.post("/transaction/return", {
      transactionId: trx._id,
      actualReturnDate,
      remarks,
      finePaid,
    });

    alert("Book Returned Successfully");
    navigate("/transactions");
  };

  return (
    <div className="container mt-4">
      <h3>Pay Fine</h3>
      <hr />

      <p><b>Book:</b> {trx.bookId.name}</p>
      <p><b>Author:</b> {trx.bookId.author}</p>
      <p><b>Serial:</b> {trx.serialId.serialNumber}</p>

      <label>Actual Return Date:</label>
      <input
        type="date"
        className="form-control mb-3"
        value={actualReturnDate}
        onChange={(e) => setActualReturn(e.target.value)}
      />

      <p><b>Fine:</b> ₹{fine}</p>

      {fine > 0 && (
        <div className="form-check mb-3">
          <input
            type="checkbox"
            className="form-check-input"
            onChange={(e) => setFinePaid(e.target.checked)}
          />
          <label>Fine Paid</label>
        </div>
      )}

      <textarea
        className="form-control mb-3"
        placeholder="Remarks"
        onChange={(e) => setRemarks(e.target.value)}
      />

      <button className="btn btn-success w-100" onClick={submitReturn}>
        Confirm Return
      </button>
    </div>
  );
};

export default PayFine;
