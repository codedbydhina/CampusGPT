import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import DashboardLayout from "../../layouts/DashboardLayout";
import InfoCard from "../../components/ui/InfoCard";

import { getUserById } from "../../services/userService";

function UserDetails() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [user, setUser] = useState(null);

    useEffect(() => {

        loadUser();

    }, []);

    async function loadUser() {

        try {

            const response = await getUserById(id);

            setUser(response);

        } catch (error) {

            console.error(error);

        }

    }

    if (!user) {

        return (
            <DashboardLayout>
                <h2>Loading...</h2>
            </DashboardLayout>
        );

    }

    return (

        <DashboardLayout>

            <div className="details-header">

                <button
                    className="back-btn"
                    onClick={() => navigate("/superadmin/users")}
                >
                    ← Back
                </button>

                <div>

                    <h1>User Details</h1>

                    <p className="page-subtitle">
                        View complete information about the selected user.
                    </p>

                </div>

            </div>

            <div className="details-grid">

                <InfoCard title="👤 User Information">

                    <div className="info-row">
                        <span>First Name</span>
                        <strong>{user.firstName}</strong>
                    </div>

                    <div className="info-row">
                        <span>Last Name</span>
                        <strong>{user.lastName}</strong>
                    </div>

                    <div className="info-row">
                        <span>Email</span>
                        <strong>{user.email}</strong>
                    </div>

                    <div className="info-row">
                        <span>Role</span>
                        <strong>{user.role}</strong>
                    </div>

                    <div className="info-row">
                        <span>Status</span>

                        <span className={
                            user.active
                                ? "status-active"
                                : "status-inactive"
                        }>

                            {user.active ? "Active" : "Inactive"}

                        </span>

                    </div>

                </InfoCard>

                <InfoCard title="🏫 College">

                    <div className="info-row">

                        <span>College</span>

                        <strong>{user.collegeName}</strong>

                    </div>

                </InfoCard>

            </div>

        </DashboardLayout>

    );

}

export default UserDetails;