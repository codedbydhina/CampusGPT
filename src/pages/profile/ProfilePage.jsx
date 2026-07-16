import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import DashboardLayout from "../../layouts/DashboardLayout";
import ProfileAvatar from "../../components/profile/ProfileAvatar";

function ProfilePage() {
    const { user } = useAuth();
    const navigate = useNavigate();

    const roleLabel = (user?.role || "User").toString().replace(/_/g, " ");

    return (
        <DashboardLayout>
            <div className="profile-page-shell">
                <div className="profile-card">
                    <div className="profile-card-header">
                        <ProfileAvatar user={user} size={90} />
                        <div>
                            <h2>{[user?.firstName, user?.lastName].filter(Boolean).join(" ") || user?.email || "User"}</h2>
                            <p>{roleLabel}</p>
                        </div>
                    </div>

                    <div className="profile-grid">
                        <div><strong>Full Name</strong><div>{[user?.firstName, user?.lastName].filter(Boolean).join(" ") || "—"}</div></div>
                        <div><strong>Email</strong><div>{user?.email || "—"}</div></div>
                        <div><strong>Role</strong><div>{roleLabel}</div></div>
                        <div><strong>College</strong><div>{user?.collegeName || user?.college || "—"}</div></div>
                        <div><strong>Department</strong><div>{user?.department || "—"}</div></div>
                        <div><strong>Designation</strong><div>{user?.designation || "—"}</div></div>
                        <div><strong>Register Number</strong><div>{user?.registerNumber || "—"}</div></div>
                        <div><strong>Phone Number</strong><div>{user?.phoneNumber || "—"}</div></div>
                        <div><strong>Status</strong><div>{user?.active ? "Active" : "Inactive"}</div></div>
                        <div><strong>Created Date</strong><div>{user?.createdAt || "—"}</div></div>
                    </div>

                    <div className="profile-actions">
                        <button className="primary-btn" type="button" onClick={() => navigate("/profile/edit")}>Edit Profile</button>
                        <button className="primary-btn" type="button" onClick={() => navigate("/profile/password")}>Change Password</button>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}

export default ProfilePage;
