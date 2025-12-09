import React, { useEffect, useState } from "react";
import API from "../../api";

const PendingRequests = () => {
  const [list, setList] = useState([]);

  useEffect(() => {
    API.get("/reports/pending").then((res) => setList(res.data));
  }, []);

  return (
    <div className="container mt-4">
      <h3>Pending Issue Requests</h3>
      <hr />

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>User</th>
            <th>Book</th>
            <th>Serial</th>
            <th>Requested On</th>
          </tr>
        </thead>
        <tbody>
          {list.map((r) => (
            <tr key={r._id}>
              <td>{r.userId?.name}</td>
              <td>{r.bookId?.name}</td>
              <td>{r.serialId?.serialNumber}</td>
              <td>{r.requestDate?.split("T")[0]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PendingRequests;
