import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import DashboardLayout from "../../layouts/DashboardLayout";
import { getCollegeById } from "../../services/collegeService";
import InfoCard from "../../components/ui/InfoCard";

function CollegeDetails() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [college, setCollege] = useState(null);

    useEffect(() => {

        loadCollege();

    }, []);

    async function loadCollege() {

        try {

            const response = await getCollegeById(id);

            setCollege(response);

        } catch (error) {

            console.error(error);

        }

    }

    if (!college) {

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
                    onClick={() => navigate("/superadmin/colleges")}
                >
                    ← Back
                </button>

                <div>

                    <h1>College Details</h1>

                    <p className="page-subtitle">
                        View complete information about the selected college.
                    </p>

                </div>

            </div>

            <div className="details-grid">

                <InfoCard title="🏫 College Information">

                    <div className="info-row">
                        <span>Name</span>
                        <strong>{college.collegeName}</strong>
                    </div>

                    <div className="info-row">
                        <span>Code</span>
                        <strong>{college.collegeCode}</strong>
                    </div>

                    <div className="info-row">
                        <span>Email</span>
                        <strong>{college.email}</strong>
                    </div>

                    <div className="info-row">
                        <span>Phone</span>
                        <strong>{college.phone}</strong>
                    </div>

                    <div className="info-row">
                        <span>Status</span>

                        <span className={
                            college.active
                                ? "status-active"
                                : "status-inactive"
                        }>
                            {college.active ? "Active" : "Inactive"}
                        </span>

                    </div>

                </InfoCard>

                <InfoCard title="👤 College Administrator">

                    <div className="info-row">
                        <span>Name</span>
                        <strong>
                            {college.adminFirstName} {college.adminLastName}
                        </strong>
                    </div>

                    <div className="info-row">
                        <span>Email</span>
                        <strong>{college.adminEmail}</strong>
                    </div>

                </InfoCard>

            </div>
            <div className="address-section">
                <InfoCard title="📍 Address Information">

                    <div className="info-row">
                        <span>Address</span>
                        <strong>{college.address}</strong>
                    </div>

                    <div className="info-row">
                        <span>City</span>
                        <strong>{college.city}</strong>
                    </div>

                    <div className="info-row">
                        <span>State</span>
                        <strong>{college.state}</strong>
                    </div>

                    <div className="info-row">
                        <span>Country</span>
                        <strong>{college.country}</strong>
                    </div>

                </InfoCard>
            </div>

        </DashboardLayout>

    );

}

export default CollegeDetails;