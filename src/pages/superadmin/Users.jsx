import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import {
    FaEye,
    FaEdit,
    FaTrash
} from "react-icons/fa";

import DashboardLayout from "../../layouts/DashboardLayout";
import PageHeader from "../../components/common/PageHeader";

import {
    getAllUsers,
    deleteUser
} from "../../services/userService";

import { useNavigate } from "react-router-dom";

function Users() {

    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {

        loadUsers();

    }, []);

    async function loadUsers() {

        setLoading(true);

        try {

            const response = await getAllUsers();

            setUsers(Array.isArray(response) ? response : []);

        } catch (error) {

            console.error(error);
            setUsers([]);

        } finally {

            setLoading(false);

        }

    }

    async function handleDelete(id) {

        const result = await Swal.fire({

            title: "Delete User?",

            text: "This action cannot be undone.",

            icon: "warning",

            showCancelButton: true,

            confirmButtonColor: "#dc2626",

            cancelButtonColor: "#64748b",

            confirmButtonText: "Delete",

            cancelButtonText: "Cancel"

        });

        if (!result.isConfirmed) {

            return;

        }

        try {

            await deleteUser(id);

            await Swal.fire({

                icon: "success",

                title: "Deleted!",

                text: "User deleted successfully.",

                timer: 1800,

                showConfirmButton: false

            });

            loadUsers();

        } catch (error) {

            Swal.fire({

                icon: "error",

                title: "Delete Failed",

                text: "Unable to delete the user."

            });

        }

    }

    const collegeAdminUsers = users.filter((user) => {

        const role = user?.role?.toString().toUpperCase();

        return role === "COLLEGE_ADMIN" || role === "ROLE_COLLEGE_ADMIN";

    });

    const filteredUsers = collegeAdminUsers.filter((user) => {

        const keyword = search.toLowerCase();
        const fullName = `${user?.firstName || ""} ${user?.lastName || ""}`.trim().toLowerCase();
        const email = (user?.email || "").toLowerCase();
        const collegeName = (user?.collegeName || "").toLowerCase();

        return (
            fullName.includes(keyword) ||
            email.includes(keyword) ||
            collegeName.includes(keyword) ||
            (user?.role || "").toLowerCase().includes(keyword)
        );

    });

    return (

        <DashboardLayout>

            <PageHeader
                title="College Admin Management"
            />

            <p style={{ margin: "-8px 0 16px", color: "#64748b" }}>
                Manage college administrator accounts across all colleges.
            </p>

            <input
                className="search-box"
                placeholder="Search College Admins..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            {loading ? (
                <p style={{ padding: "16px 0", color: "#64748b" }}>Loading...</p>
            ) : filteredUsers.length === 0 ? (
                <p style={{ padding: "16px 0", color: "#64748b" }}>No College Admins Found</p>
            ) : (
                <table className="college-table">

                    <thead>

                        <tr>

                            <th>Name</th>
                            <th>Email</th>

                            <th>Assigned College</th>
                            <th>Status</th>
                            <th>Actions</th>

                        </tr>

                    </thead>

                    <tbody>

                        {filteredUsers.map(user => (

                            <tr key={user.id}>

                                <td>
                                    {user.firstName} {user.lastName}
                                </td>

                                <td>{user.email}</td>



                                <td>{user.collegeName || "—"}</td>

                                <td>

                                    <span className={
                                        user.active
                                            ? "status-active"
                                            : "status-inactive"
                                    }>

                                        {user.active ? "Active" : "Inactive"}

                                    </span>

                                </td>

                                <td>

                                    <div className="action-buttons">
                                        <button
                                            className="view-btn"
                                            onClick={() => navigate(`/superadmin/users/${user.id}`)}
                                            title="View"
                                        >
                                            <FaEye />
                                        </button>

                                        <button
                                            className="edit-btn"
                                            onClick={() => navigate(`/superadmin/users/edit/${user.id}`)}
                                            title="Edit"
                                        >
                                            <FaEdit />
                                        </button>

                                        <button
                                            className="delete-btn"
                                            onClick={() => handleDelete(user.id)}
                                            title="Delete"
                                        >
                                            <FaTrash />
                                        </button>
                                    </div>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>
            )}

        </DashboardLayout>

    );

}

export default Users;