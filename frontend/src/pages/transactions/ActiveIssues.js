import React, { useEffect, useState, useContext } from "react";
import API from "../../api";
import { AuthContext } from "../../context/AuthContext";

const ActiveIssues = () => {
  const { user } = useContext(AuthContext);
  const [issues, setIssues] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user) return;

    API.get("/transaction/active", {
      headers: {
        "x-role": user.role,
        "x-username": user.username
      }
    })
      .then(res => {
        setIssues(res.data);
        setError("");
      })
      .catch(err => {
        console.error("Active Issues Error:", err);
        setError("Failed to load active issues");
      });
  }, [user]);

  return (
    <div className="container mt-4">
      <h3 className="fw-bold">My Active Issues</h3>
      <hr />

      {error && <div className="alert alert-danger">{error}</div>}

      {issues.length === 0 ? (
        <div className="alert alert-info">No active issues</div>
      ) : (
        <table className="table table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              <th>Book</th>
              <th>Serial</th>
              <th>Issue Date</th>
              <th>Return Date</th>
            </tr>
          </thead>
          <tbody>
            {issues.map(i => (
              <tr key={i._id}>
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
