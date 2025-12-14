import React, { useState, useContext } from "react";
import API from "../../../api";
import { AuthContext } from "../../../context/AuthContext";

const AddBook = () => {
  const { user } = useContext(AuthContext);

  const [form, setForm] = useState({
    type: "book",
    name: "",
    author: "",
    category: "",
    cost: "",
    procurementDate: "",
    serialCount: ""
  });

  const [msg, setMsg] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async () => {
    for (let field in form) {
      if (form[field] === "" || form[field] === null) {
        setMsg("All fields are mandatory");
        return;
      }
    }

    const payload = {
      ...form,
      cost: Number(form.cost),
      serialCount: Number(form.serialCount)
    };

    try {
      const res = await API.post("/book/books/add", payload, {
        headers: { "x-role": user?.role }
      });
      setMsg(res.data.message);
    } catch (err) {
      setMsg(err.response?.data?.message || "Error");
    }
  };

  return (
    <div className="container mt-4">
      <h3>Add Book / Movie</h3>
      <hr />

      <label>Type:</label>
      <select name="type" className="form-control mb-3" onChange={handleChange}>
        <option value="book">Book</option>
        <option value="movie">Movie</option>
      </select>

      <input type="text" name="name" placeholder="Name" className="form-control mb-3" onChange={handleChange} />
      <input type="text" name="author" placeholder="Author" className="form-control mb-3" onChange={handleChange} />
      <input type="text" name="category" placeholder="Category" className="form-control mb-3" onChange={handleChange} />
      <input type="number" name="cost" placeholder="Cost" className="form-control mb-3" onChange={handleChange} />

      <label>Procurement Date:</label>
      <input type="date" name="procurementDate" className="form-control mb-3" onChange={handleChange} />

      <input type="number" name="serialCount" placeholder="No. of Copies" className="form-control mb-3" onChange={handleChange} />

      <button className="btn btn-primary" onClick={submit}>Add Book</button>

      {msg && <div className="alert alert-info mt-3">{msg}</div>}
    </div>
  );
};

export default AddBook;
