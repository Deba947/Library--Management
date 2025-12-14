import React, { useEffect, useState } from "react";
import API from "../../api";

const PendingIssues = () => {
  const [requests, setRequests] = useState([]);
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(null);

  const loadRequests = async () => {
    try {
      setLoading(true);

      const res = await API.get("/request/all", {
        headers: { "x-role": "admin" },
      });

      const pending = res.data.filter(r => r.status === "pending");
      setRequests(pending);
      setMsg("");
    } catch (err) {
      setMsg("Failed to load requests");
      console.error("Load Requests Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRequests();
  }, []);

  const handleAction = async (id, actionType) => {
    try {
      setActionLoading(id);

      await API.put(
        `/request/${actionType}/${id}`,
        {},
        { headers: { "x-role": "admin" } }
      );

      alert(`Request ${actionType}d successfully`);
      loadRequests();
    } catch (err) {
      const backendMessage = err.response?.data?.message;
      alert(backendMessage || `Error ${actionType}ing request`);
      console.error(`${actionType} error:`, err);
    } finally {
      setActionLoading(null);
    }
  };

  return (
    <div className="container mt-4">
      <h3 className="fw-bold">Pending Issue Requests</h3>
      <hr />

      {msg && <div className="alert alert-danger">{msg}</div>}

      {loading ? (
        <div className="alert alert-secondary">Loading requests...</div>
      ) : requests.length === 0 ? (
        <div className="alert alert-info">No pending requests</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-hover align-middle mt-3">
            <thead className="table-dark">
              <tr>
                <th>User</th>
                <th>Book</th>
                <th>Serial</th>
                <th>Date</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {requests.map(r => (
                <tr key={r._id}>
                  <td>{r.userId?.name || "-"}</td>
                  <td>{r.bookId?.name || "-"}</td>
                  <td>
                    <span className="badge bg-secondary">
                      {r.serialId?.serialNumber}
                    </span>
                  </td>
                  <td>
                    {(r.createdAt || r.requestDate)
                      ?.split("T")[0]}
                  </td>

                  <td className="text-center">
                    <button
                      className="btn btn-success btn-sm me-2"
                      disabled={actionLoading === r._id}
                      onClick={() => handleAction(r._id, "approve")}
                    >
                      {actionLoading === r._id ? "Processing..." : "Approve"}
                    </button>

                    <button
                      className="btn btn-danger btn-sm"
                      disabled={actionLoading === r._id}
                      onClick={() => handleAction(r._id, "reject")}
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PendingIssues;
