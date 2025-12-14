import React, { useEffect, useState } from "react";
import API from "../../api"; 

const MasterUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Function to fetch the users list
    const fetchUsers = () => {
        setLoading(true);
        setError(null);
        
        API.get("/reports/users", {
            headers: { "x-role": localStorage.getItem("role") }
        })
            .then((res) => {
                setUsers(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error loading users:", err);
                setError("Failed to load user list.");
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    // Function to handle user deletion
    const handleDelete = async (username, name) => {
        
        if (!window.confirm(`Are you sure you want to delete user: ${name} (${username})?`)) {
            return;
        }

        try {
            
            
            await API.delete("/auth/delete-user", {
                data: { username },
                headers: { "x-role": localStorage.getItem("role") } 
            });

            alert(`User ${name} deleted successfully!`);
            fetchUsers(); // Refresh the list after successful deletion

        } catch (err) {
            console.error("Delete failed:", err);
            
            const msg = err.response?.data?.message || "Failed to delete user. Check console.";
            alert(`Error: ${msg}`);
        }
    };

    if (loading) {
        return <div className="container mt-5 text-center">Loading users...</div>;
    }

    if (error) {
        return <div className="container mt-5 alert alert-danger">{error}</div>;
    }


    return (
        <div className="container mt-4">
            <h3>Master Users</h3>
            <hr />

            <table className="table table-bordered">
                <thead className="table-dark">
                    <tr>
                        <th>User ID</th>
                        <th>Name</th>
                        <th>Username</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th>Actions</th> 
                    </tr>
                </thead>

                <tbody>
                    {users.map((u) => (
                        <tr key={u._id}>
                            <td>{u._id}</td>
                            <td>{u.name}</td>
                            <td>{u.username}</td>
                            <td>{u.role}</td>
                            <td>{u.status}</td>
                            <td>
                               
                                {u.role !== 'admin' && ( 
                                    <button
                                        className="btn btn-danger btn-sm"
                                        onClick={() => handleDelete(u.username, u.name)}
                                    >
                                        Delete
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MasterUsers;