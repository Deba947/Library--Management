import React, { useEffect, useState } from "react";
import API from "../../api";

const MasterBooks = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const role = localStorage.getItem("role");
  const username = localStorage.getItem("username");
  const isAdmin = role === "admin";

  // FETCH BOOKS 
  const fetchBooks = async () => {
    try {
      const res = await API.get("/reports/books", {
        headers: {
          "x-role": role,
          "x-username": username
        }
      });

      setData(res.data);
    } catch (err) {
      console.error("Fetch Books Error:", err);
      alert("Failed to load books");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
    // eslint-disable-next-line
  }, []);

  //  DELETE BOOK (ADMIN ONLY) 
  const handleDeleteBook = async (bookId, bookName) => {
    if (!window.confirm(`Are you sure you want to delete "${bookName}"?`)) return;

    try {
      
      await API.delete(`/book/books/${bookId}`, {
        headers: {
          "x-role": role
        }
      });

      alert("Book deleted successfully");
      fetchBooks(); // refresh list
    } catch (err) {
      console.error("Delete Book Error:", err);
      alert(err.response?.data?.message || "Delete failed");
    }
  };

  if (loading) {
    return <div className="text-center mt-5">Loading books...</div>;
  }

  return (
    <div className="container mt-4">
      <h3 className="fw-bold">
        {isAdmin ? "Master Books" : "My Borrowed Books"}
      </h3>
      <hr />

      {data.length === 0 ? (
        <div className="alert alert-info">No books found</div>
      ) : (
        data.map((item) => (
          <div key={item.book._id} className="card mb-4 shadow-sm">
            <div className="card-body">

              {/* HEADER */}
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="fw-bold mb-0">{item.book.name}</h5>

                {isAdmin && (
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() =>
                      handleDeleteBook(item.book._id, item.book.name)
                    }
                  >
                    Delete Book
                  </button>
                )}
              </div>

              <p className="mt-2 mb-1">
                <strong>Author:</strong> {item.book.author}
              </p>
              <p className="mb-1">
                <strong>Category:</strong> {item.book.category}
              </p>

              {/* SERIALS TABLE */}
              <div className="table-responsive mt-3">
                <table className="table table-bordered table-hover">
                  <thead className="table-dark">
                    <tr>
                      <th>Serial Number</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {item.serials.map((s) => (
                      <tr key={s._id}>
                        <td>{s.serialNumber}</td>
                        <td>
                          <span
                            className={`badge ${
                              s.available ? "bg-success" : "bg-danger"
                            }`}
                          >
                            {s.available ? "Available" : "Issued"}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MasterBooks;
