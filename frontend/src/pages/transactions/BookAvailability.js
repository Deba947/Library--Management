import React, { useState } from "react";
import API from "../../api";
import { useNavigate } from "react-router-dom";

const BookAvailability = () => {
  const [name, setName] = useState("");
  const [author, setAuthor] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const search = async () => {
    if (!name && !author) {
      setError("Enter book name or author");
      return;
    }

    try {
      const params = new URLSearchParams();
      if (name.trim()) params.append("name", name.trim());
      if (author.trim()) params.append("author", author.trim());

      const res = await API.get(`/transaction/search?${params.toString()}`);

      navigate("/transactions/search-results", {
        state: { results: res.data }
      });
    } catch (err) {
      setError("No results found");
    }
  };

  return (
    <div className="container mt-4">
      <h3>Book Availability</h3>
      <hr />

      <input
        className="form-control mb-3"
        placeholder="Book Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        className="form-control mb-3"
        placeholder="Author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />

      {error && <div className="alert alert-danger">{error}</div>}

      <button className="btn btn-primary" onClick={search}>
        Search
      </button>
    </div>
  );
};

export default BookAvailability;
