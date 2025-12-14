import React, { useEffect, useState, useContext } from "react";
import API from "../../api";
import { AuthContext } from "../../context/AuthContext";

const OverdueBooks = () => {
  const [list, setList] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    API.get("/transaction/overdue", {
      headers: {
        "x-role": user.role,            
        "x-username": user.username      
      }
    })
      .then((res) => setList(res.data))
      .catch((err) => {
        console.error("Overdue Error:", err);
        setList([]);
      });
  }, [user]);

  return (
    <div className="container mt-4">
      <h3 className="fw-bold text-center">
        {user.role === "admin" ? "All Overdue Books" : "Your Overdue Books"}
      </h3>
      <hr />

      {list.length === 0 ? (
        <p className="text-muted text-center mt-3">
          No overdue books found.
        </p>
      ) : (
        <table className="table table-bordered mt-3">
          <thead>
            <tr>
              {user.role === "admin" && <th>User</th>}
              <th>Book</th>
              <th>Serial</th>
              <th>Return Date</th>
              <th>Days Late</th>
              <th>Fine (₹)</th>
            </tr>
          </thead>

          <tbody>
            {list.map((item) => {
              const returnDate = new Date(item.returnDate);
              const today = new Date();
              const diff =
                Math.ceil((today - returnDate) / (1000 * 60 * 60 * 24));

              const daysLate = diff > 0 ? diff : 0;
              const fine = daysLate * 10;

              return (
                <tr key={item._id}>
                  {user.role === "admin" && (
                    <td>{item.userId?.name || "Unknown"}</td>
                  )}

                  <td>{item.bookId?.name}</td>
                  <td>{item.serialId?.serialNumber}</td>
                  <td>{item.returnDate.split("T")[0]}</td>
                  <td>{daysLate}</td>
                  <td>₹ {fine}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default OverdueBooks;
