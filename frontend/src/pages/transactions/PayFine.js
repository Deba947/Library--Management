import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import API from "../../api";

const PayFine = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const trx = state?.trx;
  const actualReturnDate = state?.actualReturnDate;

  const [fine, setFine] = useState(0);
  const [finePaid, setFinePaid] = useState(false);
  const [remarks, setRemarks] = useState(state?.remarks || "");
  const [error, setError] = useState("");

  useEffect(() => {
    if (trx && actualReturnDate) {
      const due = new Date(trx.returnDate);
      const act = new Date(actualReturnDate);
      const diff = Math.ceil((act - due) / (1000 * 60 * 60 * 24));

      setFine(diff > 0 ? diff * 10 : 0);
    }
  }, [trx, actualReturnDate]);

  const submit = async () => {
    if (fine > 0 && !finePaid) {
      setError("Fine must be paid to complete the return");
      return;
    }

    try {
      await API.post("/transaction/return", {
        transactionId: trx._id,
        actualReturnDate,
        remarks,
        finePaid
      });

      navigate("/transactions");
    } catch (err) {
      setError("Error completing return");
    }
  };

  return (
    <div className="container mt-4">
      <h3>Pay Fine</h3>
      <hr />

      <p><b>Fine Amount:</b> ₹{fine}</p>

      {fine > 0 && (
        <div className="form-check mb-3">
          <input
            type="checkbox"
            className="form-check-input"
            onChange={(e) => setFinePaid(e.target.checked)}
          />
          <label className="form-check-label">Fine Paid</label>
        </div>
      )}

      <textarea
        className="form-control mb-3"
        placeholder="Remarks"
        value={remarks}
        onChange={(e) => setRemarks(e.target.value)}
      ></textarea>

      {error && <div className="alert alert-danger">{error}</div>}

      <button className="btn btn-primary" onClick={submit}>
        Confirm Return
      </button>
    </div>
  );
};

export default PayFine;
