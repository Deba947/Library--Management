import React, { useEffect, useState } from "react";
import API from "../../api";

const ActiveIssues = () => {
  const [list, setList] = useState([]);

  useEffect(() => {
    API.get("/transaction/active").then((res) => setList(res.data));
  }, []);

  return (
    <div className="container mt-4">
      <h3>Active Issues</h3>
      <hr />

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>User</th>
            <th>Book</th>
            <th>Serial</th>
            <th>Issue Date</th>
            <th>Return Date</th>
          </tr>
        </thead>
        <tbody>
          {list.map((t) => (
            <tr key={t._id}>
              <td>{t.userId?.name}</td>
              <td>{t.bookId?.name}</td>
              <td>{t.serialId?.serialNumber}</td>
              <td>{t.issueDate.split("T")[0]}</td>
              <td>{t.returnDate.split("T")[0]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ActiveIssues;
