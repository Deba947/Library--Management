import React, { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import API from "../../api";
import { AuthContext } from "../../context/AuthContext";

const RequestIssue = () => {
  const { state } = useLocation();
  const serial = state?.serial;
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const request = async () => {
    await API.post("/request/create", {
      username: user.username,
      bookId: serial.bookId,
      serialId: serial._id,
    });

    alert("Request submitted successfully!");
    navigate("/transactions");
  };

  return (
    <div className="container mt-4">
      <h3>Request Issue</h3>
      <hr />

      <p><b>Book:</b> {serial.bookName}</p>
      <p><b>Author:</b> {serial.author}</p>
      <p><b>Serial Number:</b> {serial.serialNumber}</p>

      <button className="btn btn-primary w-100" onClick={request}>
        Submit Request
      </button>
    </div>
  );
};

export default RequestIssue;
