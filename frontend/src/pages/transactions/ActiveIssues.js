import React, { useEffect, useState } from "react";
import API from "../../api";

const ActiveIssues = () => {
  const [issues, setIssues] = useState([]);
  const [msg, setMsg] = useState("");

  const loadIssues = async () => {
    try {
      const res = await API.get("/transaction/active");

      setIssues(res.data);
    } catch (err) {
      setMsg("Failed to load active issues");
    }
  };

  useEffect(() => {
    loadIssues();
  }, []);

  return (
    <div className="container mt-4">
      <h3>Active Issued Books</h3>
      <hr />

      {msg && <div className="alert alert-danger">{msg}</div>}

      {issues.length === 0 ? (
        <div className="alert alert-info">No active issues</div>
      ) : (
        <table className="table table-bordered mt-3">
          <thead>
            <tr>
              <th>User</th>
              <th>Book</th>
              <th>Serial</th>
              <th>Issued On</th>
              <th>Return Date</th>
            </tr>
          </thead>

          <tbody>
            {issues.map((i) => (
              <tr key={i._id}>
                <td>{i.userId?.name}</td>
                <td>{i.bookId?.name}</td>
                <td>{i.serialId?.serialNumber}</td>
                <td>{i.issueDate?.split("T")[0]}</td>
                <td>{i.returnDate?.split("T")[0]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ActiveIssues;
