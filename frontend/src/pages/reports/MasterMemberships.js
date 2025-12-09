import React, { useEffect, useState } from "react";
import API from "../../api";

const MasterMemberships = () => {
  const [list, setList] = useState([]);

  useEffect(() => {
    API.get("/reports/memberships").then((res) => setList(res.data));
  }, []);

  return (
    <div className="container mt-4">
      <h3>Master Memberships</h3>
      <hr />

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Membership No</th>
            <th>Name</th>
            <th>Duration</th>
            <th>Status</th>
            <th>Start</th>
            <th>End</th>
          </tr>
        </thead>
        <tbody>
          {list.map((m) => (
            <tr key={m._id}>
              <td>{m.membershipNumber}</td>
              <td>{m.memberName}</td>
              <td>{m.duration} months</td>
              <td>{m.status}</td>
              <td>{m.startDate.split("T")[0]}</td>
              <td>{m.endDate.split("T")[0]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MasterMemberships;
