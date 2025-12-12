import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const SearchResults = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const raw = Array.isArray(state?.results) ? state.results : [];

  // Convert backend structure into a serial list
  const converted = [];

  raw.forEach((item) => {
    item.serials.forEach((s) => {
      converted.push({
        _id: s._id,
        serialNumber: s.serialNumber,
        available: s.available,
        bookName: item.book.name,
        author: item.book.author,
        bookId: item.book._id,
      });
    });
  });

  const [selected, setSelected] = useState(null);

  const requestIssue = () => {
    if (!selected) {
      alert("Select a book copy first");
      return;
    }

    navigate("/transactions/request-issue", {
      state: { serial: selected },
    });
  };

  return (
    <div className="container mt-4">
      <h3>Search Results</h3>
      <hr />

      {converted.length === 0 && (
        <div className="alert alert-danger">No books found</div>
      )}

      {converted.length > 0 && (
        <table className="table table-bordered mt-3">
          <thead>
            <tr>
              <th>Book Name</th>
              <th>Author</th>
              <th>Serial Number</th>
              <th>Available</th>
              <th>Select</th>
            </tr>
          </thead>

          <tbody>
            {converted.map((item) => (
              <tr key={item._id}>
                <td>{item.bookName}</td>
                <td>{item.author}</td>
                <td>{item.serialNumber}</td>
                <td>
                  {item.available ? (
                    <span className="text-success fw-bold">Available</span>
                  ) : (
                    <span className="text-danger fw-bold">Issued</span>
                  )}
                </td>

                <td>
                  {item.available ? (
                    <input
                      type="radio"
                      name="selectedSerial"
                      onChange={() => setSelected(item)}
                    />
                  ) : (
                    "-"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <button className="btn btn-success mt-3" onClick={requestIssue}>
        Request Issue
      </button>
    </div>
  );
};

export default SearchResults;
