import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import DashboardLayout from "../../layouts/DashboardLayout";

function EditProfilePage() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [form, setForm] = useState({
        firstName: user?.firstName || "",
        lastName: user?.lastName || "",
        phoneNumber: user?.phoneNumber || "",
        profileImage: user?.profileImage || ""
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setForm((current) => ({ ...current, [name]: value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        navigate("/profile");
    };

    return (
        <DashboardLayout>
            <div className="profile-page-shell">
                <div className="profile-card">
                    <h2>Edit Profile</h2>
                    <form className="profile-form" onSubmit={handleSubmit}>
                        <label>
                            Full Name
                            <input name="firstName" value={form.firstName} onChange={handleChange} placeholder="First Name" />
                        </label>
                        <label>
                            Last Name
                            <input name="lastName" value={form.lastName} onChange={handleChange} placeholder="Last Name" />
                        </label>
                        <label>
                            Phone Number
                            <input name="phoneNumber" value={form.phoneNumber} onChange={handleChange} placeholder="Phone Number" />
                        </label>
                        <label>
                            Profile Picture URL
                            <input name="profileImage" value={form.profileImage} onChange={handleChange} placeholder="https://..." />
                        </label>
                        <div className="profile-actions">
                            <button className="primary-btn" type="submit">Save Changes</button>
                            <button className="secondary-btn" type="button" onClick={() => navigate("/profile")}>Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </DashboardLayout>
    );
}

export default EditProfilePage;
