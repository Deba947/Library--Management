import React, { useEffect, useState } from "react";
import API from "../../api";

const ActiveIssues = () => {
  const [list, setList] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadData = async () => {
      try {
        const role = localStorage.getItem("role");
        const username = localStorage.getItem("username");

        const res = await API.get("/transactions/active", {   
          headers: {
            "x-role": role,
            "x-username": username
          }
        });

        setList(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load active issues");
      }
    };

    loadData();
  }, []);

  const formatDate = (dateStr) => {
    if (!dateStr) return "-";
    try {
      return dateStr.split("T")[0];
    } catch {
      return "-";
    }
  };

  return (
    <div className="container mt-4">
      <h3>Active Issues</h3>
      <hr />
      
      {error && <div className="alert alert-danger">{error}</div>}

      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>User</th>
            <th>Book</th>
            <th>Serial No.</th>
            <th>Issue Date</th>
            <th>Return Date</th>
          </tr>
        </thead>

        <tbody>
          {list.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center text-muted">
                No active issues found
              </td>
            </tr>
          ) : (
            list.map((t) => (
              <tr key={t._id}>
                <td>{t.userId?.name || "Unknown User"}</td>
                <td>{t.bookId?.name || "Unknown Book"}</td>
                <td>{t.serialId?.serialNumber || "N/A"}</td>
                <td>{formatDate(t.issueDate)}</td>
                <td>{formatDate(t.returnDate)}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ActiveIssues;
