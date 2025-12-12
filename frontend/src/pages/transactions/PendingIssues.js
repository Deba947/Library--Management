import React, { useEffect, useState } from "react";
import API from "../../api";

const PendingIssues = () => {
  const [requests, setRequests] = useState([]);
  const [msg, setMsg] = useState("");

  const loadRequests = async () => {
    try {
      const res = await API.get("/request/all", {
        headers: { "x-role": "admin" }
      });

      // Filter only pending requests
      const pending = res.data.filter((r) => r.status === "pending");

      setRequests(pending);
    } catch (err) {
      setMsg("Failed to load requests");
    }
  };

  useEffect(() => {
    loadRequests();
  }, []);

  const approve = async (id) => {
    try {
      await API.put(`/request/approve/${id}`, {}, {
        headers: { "x-role": "admin" }
      });

      loadRequests();
      alert("Request approved!");
    } catch (err) {
      alert("Error approving request");
    }
  };

  const reject = async (id) => {
    try {
      await API.put(`/request/reject/${id}`, {}, {
        headers: { "x-role": "admin" }
      });

      loadRequests();
      alert("Request rejected!");
    } catch (err) {
      alert("Error rejecting request");
    }
  };

  return (
    <div className="container mt-4">
      <h3>Pending Issue Requests</h3>
      <hr />

      {msg && <div className="alert alert-danger">{msg}</div>}

      {requests.length === 0 ? (
        <div className="alert alert-info">No pending requests</div>
      ) : (
        <table className="table table-bordered mt-3">
          <thead>
            <tr>
              <th>User</th>
              <th>Book</th>
              <th>Serial</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {requests.map((r) => (
              <tr key={r._id}>
                <td>{r.userId?.name}</td>
                <td>{r.bookId?.name}</td>
                <td>{r.serialId?.serialNumber}</td>
                <td>{r.requestDate?.split("T")[0]}</td>

                <td>
                  <button
                    className="btn btn-success btn-sm me-2"
                    onClick={() => approve(r._id)}
                  >
                    Approve
                  </button>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => reject(r._id)}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PendingIssues;
