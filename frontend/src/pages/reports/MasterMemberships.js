import React, { useEffect, useState, useContext } from "react";
import API from "../../api";
import { AuthContext } from "../../context/AuthContext";

const MasterMemberships = () => {
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useContext(AuthContext);

    const isUserAdmin = user?.role === "admin"; // Check role once

    // Function to fetch the memberships list
    const fetchList = () => {
        setLoading(true);
        API.get("/reports/memberships", {
            headers: {
                "x-role": user.role,
                "x-username": user.username
            }
        })
            .then((res) => {
                setList(res.data);
                setLoading(false);
            })
            .catch(() => {
                setList([]);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchList();
    }, [user]); // Runs when the user context changes

    // Handle Deletion 
    const handleDelete = async (membershipNumber, memberName) => {
        if (!window.confirm(`Are you sure you want to delete the membership for: ${memberName} (${membershipNumber})?`)) {
            return;
        }

        try {
            
            await API.delete(`/membership/delete/${membershipNumber}`, {
                headers: { "x-role": user.role } 
            });

            alert(`Membership ${membershipNumber} deleted successfully!`);
            fetchList(); // Refresh the list after successful deletion

        } catch (err) {
            console.error("Delete failed:", err);
            const msg = err.response?.data?.message || "Failed to delete membership.";
            alert(`Error: ${msg}`);
        }
    };
   

    if (loading) {
        return <div className="container mt-5 text-center">Loading memberships...</div>;
    }

    return (
        <div className="container mt-4">
            <h3 className="fw-bold text-center">
                {isUserAdmin ? "Master Membership List" : "Your Membership"}
            </h3>
            <hr />

            {list.length === 0 ? (
                <p className="text-center text-muted">No membership found.</p>
            ) : (
                <table className="table table-bordered mt-3">
                    <thead>
                        <tr>
                            <th>Membership No</th>
                            <th>Name</th>
                            <th>Duration</th>
                            <th>Status</th>
                            <th>Start</th>
                            <th>End</th>
                            {isUserAdmin && <th>Actions</th>} {/* <-- CONDITIONALLY RENDER COLUMN HEADER */}
                        </tr>
                    </thead>

                    <tbody>
                        {list.map((m) => (
                            <tr key={m._id}>
                                <td>{m.membershipNumber}</td>
                                <td>{m.memberName}</td>
                                
                                <td>{m.duration ? `${m.duration} months` : 'N/A'}</td> 
                                <td>{m.status}</td>
                                <td>{m.startDate.split("T")[0]}</td>
                                <td>{m.endDate.split("T")[0]}</td>
                                
                                {isUserAdmin && ( 
                                    <td>
                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => handleDelete(m.membershipNumber, m.memberName)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default MasterMemberships;