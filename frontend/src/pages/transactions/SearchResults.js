import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const SearchResults = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [selected, setSelected] = useState(null);

  const handleSelect = (serial) => {
    setSelected(serial);
  };

  const issue = () => {
    if (!selected) alert("Select a book from results");
    else navigate("/transactions/issue-book", { state: { serial: selected } });
  };

  return (
    <div className="container mt-4">
      <h3>Search Results</h3>
      <hr />

      {state?.results?.length === 0 && (
        <div className="alert alert-danger">No books found</div>
      )}

      {state.results.map((item) => (
        <div key={item.book._id} className="border p-3 mb-3">
          <h5>{item.book.name}</h5>
          <p>Author: {item.book.author}</p>

          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Serial Number</th>
                <th>Available</th>
                <th>Select</th>
              </tr>
            </thead>
            <tbody>
              {item.serials.map((s) => (
                <tr key={s._id}>
                  <td>{s.serialNumber}</td>
                  <td>{s.available ? "Yes" : "No"}</td>
                  <td>
                    {s.available && (
                      <input
                        type="radio"
                        name="selectedSerial"
                        onChange={() => handleSelect(s)}
                      />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}

      <button className="btn btn-success" onClick={issue}>
        Issue Selected Book
      </button>
    </div>
  );
};

export default SearchResults;
