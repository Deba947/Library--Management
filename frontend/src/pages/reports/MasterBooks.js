import React, { useEffect, useState } from "react";
import API from "../../api";

const MasterBooks = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    API.get("/reports/books").then((res) => setData(res.data));
  }, []);

  return (
    <div className="container mt-4">
      <h3>Master Books</h3>
      <hr />

      {data.map((item) => (
        <div key={item.book._id} className="border p-3 mb-3">
          <h5>{item.book.name} ({item.book.type})</h5>
          <p>Author: {item.book.author}</p>
          <p>Category: {item.book.category}</p>
          <p>Total Copies: {item.serialCount}</p>
          <p>Available: {item.availableCount}</p>

          <table className="table table-bordered mt-3">
            <thead>
              <tr>
                <th>Serial Number</th>
                <th>Available</th>
              </tr>
            </thead>
            <tbody>
              {item.serials.map((s) => (
                <tr key={s._id}>
                  <td>{s.serialNumber}</td>
                  <td>{s.available ? "Yes" : "No"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default MasterBooks;
