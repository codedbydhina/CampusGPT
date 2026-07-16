import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../layouts/DashboardLayout";

function ChangePasswordPage() {
    const navigate = useNavigate();
    const [form, setForm] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setForm((current) => ({ ...current, [name]: value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (form.newPassword !== form.confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        navigate("/profile");
    };

    return (
        <DashboardLayout>
            <div className="profile-page-shell">
                <div className="profile-card">
                    <h2>Change Password</h2>
                    <form className="profile-form" onSubmit={handleSubmit}>
                        <label>
                            Current Password
                            <input type="password" name="currentPassword" value={form.currentPassword} onChange={handleChange} />
                        </label>
                        <label>
                            New Password
                            <input type="password" name="newPassword" value={form.newPassword} onChange={handleChange} />
                        </label>
                        <label>
                            Confirm Password
                            <input type="password" name="confirmPassword" value={form.confirmPassword} onChange={handleChange} />
                        </label>
                        <div className="profile-actions">
                            <button className="primary-btn" type="submit">Update Password</button>
                            <button className="secondary-btn" type="button" onClick={() => navigate("/profile")}>Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </DashboardLayout>
    );
}

export default ChangePasswordPage;
