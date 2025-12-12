import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api";

const ReturnBook = () => {
  const [serialNumber, setSerialNumber] = useState("");
  const [data, setData] = useState(null);
  const [msg, setMsg] = useState("");

  const navigate = useNavigate();

  const fetchDetails = async () => {
    if (!serialNumber.trim()) {
      setMsg("Enter serial number");
      return;
    }

    try {
      const res = await API.get(
        `/transaction/issued-details?serialNumber=${serialNumber}`
      );

      setData(res.data);
      setMsg("");

    } catch (err) {
      setMsg(err.response?.data?.message || "Not found");
      setData(null);
    }
  };

  const continueReturn = () => {
    navigate("/transactions/pay-fine", { state: { record: data } });
  };

  return (
    <div className="container mt-4">
      <h3>Return Book</h3>
      <hr />

      <input
        className="form-control mb-3"
        placeholder="Enter Serial Number"
        onChange={(e) => setSerialNumber(e.target.value)}
      />

      <button className="btn btn-primary w-100" onClick={fetchDetails}>
        Fetch Details
      </button>

      {msg && <div className="alert alert-danger mt-3">{msg}</div>}

      {data && (
        <div className="mt-4 p-3 border rounded">
          <h5>Book Details</h5>
          <p><b>Name:</b> {data.bookId.name}</p>
          <p><b>Author:</b> {data.bookId.author}</p>
          <p><b>Serial:</b> {data.serialId.serialNumber}</p>

          <h5 className="mt-3">Issue Info</h5>
          <p><b>Issued:</b> {data.issueDate.split("T")[0]}</p>
          <p><b>Return Date:</b> {data.returnDate.split("T")[0]}</p>

          <button className="btn btn-success w-100 mt-3" onClick={continueReturn}>
            Continue → Fine Payment
          </button>
        </div>
      )}
    </div>
  );
};

export default ReturnBook;
