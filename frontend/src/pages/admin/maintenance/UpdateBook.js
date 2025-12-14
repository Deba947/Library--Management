import React, { useState, useContext } from "react";
import API from "../../../api";
import { AuthContext } from "../../../context/AuthContext";
import { Navigate } from "react-router-dom";

const UpdateBook = () => {
  const { user } = useContext(AuthContext);

 
  const [form, setForm] = useState({
    bookId: "",
    type: "book",
    name: "",
    author: "",
    category: "",
    cost: ""
  });

  const [msg, setMsg] = useState("");

  
  if (user?.role !== "admin") return <Navigate to="/" />;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async () => {
    if (!form.bookId) {
      setMsg("Book ID required");
      return;
    }

    try {
      const res = await API.put("/book/books/update", form, {
        headers: { "x-role": user.role }
      });
      setMsg(res.data.message);
    } catch (err) {
      setMsg(err.response?.data?.message || "Error");
    }
  };

  return (
    <div className="container mt-4">
      <h3>Update Book / Movie</h3>
      <hr />

      <input
        type="text"
        name="bookId"
        placeholder="Book ID"
        className="form-control mb-3"
        onChange={handleChange}
      />

      <label>Type:</label>
      <select
        name="type"
        className="form-control mb-3"
        onChange={handleChange}
      >
        <option value="book">Book</option>
        <option value="movie">Movie</option>
      </select>

      <input
        name="name"
        placeholder="Name"
        className="form-control mb-3"
        onChange={handleChange}
      />

      <input
        name="author"
        placeholder="Author"
        className="form-control mb-3"
        onChange={handleChange}
      />

      <input
        name="category"
        placeholder="Category"
        className="form-control mb-3"
        onChange={handleChange}
      />

      <input
        name="cost"
        type="number"
        placeholder="Cost"
        className="form-control mb-3"
        onChange={handleChange}
      />

      <button className="btn btn-primary" onClick={submit}>
        Update Book
      </button>

      {msg && <div className="alert alert-info mt-3">{msg}</div>}
    </div>
  );
};

export default UpdateBook;