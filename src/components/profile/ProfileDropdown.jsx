import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import ProfileAvatar from "./ProfileAvatar";
import ThemeToggle from "./ThemeToggle";

function ProfileDropdown({ user }) {
    const navigate = useNavigate();
    const { logout } = useAuth();
    const [open, setOpen] = useState(false);
    const menuRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    const roleLabel = (user?.role || "User").toString().replace(/_/g, " ");

    return (
        <div className="profile-dropdown-wrapper" ref={menuRef}>
            <button className="profile-trigger" type="button" onClick={() => setOpen((current) => !current)}>
                <ProfileAvatar user={user} size={40} />
                <div className="profile-trigger-meta">
                    <span className="profile-trigger-name">{user?.firstName || user?.name || user?.email?.split("@")[0] || "User"}</span>
                    <span className="profile-trigger-role">{roleLabel}</span>
                </div>
                <span className="profile-trigger-caret">▾</span>
            </button>

            {open && (
                <div className="profile-dropdown" role="menu" aria-label="Profile menu">
                    <div className="profile-dropdown-header">
                        <ProfileAvatar user={user} size={48} />
                        <div>
                            <strong>{[user?.firstName, user?.lastName].filter(Boolean).join(" ") || user?.email || "User"}</strong>
                            <div>{user?.email}</div>
                            <div>{roleLabel}</div>
                        </div>
                    </div>

                    <div className="profile-dropdown-body">
                        <button className="profile-menu-action" type="button" onClick={() => { setOpen(false); navigate("/profile"); }}>
                            👤 My Profile
                        </button>
                        <button className="profile-menu-action" type="button" onClick={() => { setOpen(false); navigate("/profile/edit"); }}>
                            ✏️ Edit Profile
                        </button>
                        <button className="profile-menu-action" type="button" onClick={() => { setOpen(false); navigate("/profile/password"); }}>
                            🔒 Change Password
                        </button>
                        <button className="profile-menu-action" type="button" onClick={() => { setOpen(false); navigate("/settings"); }}>
                            ⚙️ Settings
                        </button>
                        <button className="profile-menu-action" type="button" onClick={() => { setOpen(false); navigate("/notifications"); }}>
                            🔔 Notifications
                        </button>
                        <ThemeToggle />
                        <button className="profile-menu-action" type="button" onClick={() => { setOpen(false); }}>
                            🌐 Language
                        </button>
                        <button className="profile-menu-action" type="button" onClick={() => { setOpen(false); navigate("/help"); }}>
                            ❓ Help & Support
                        </button>
                        <button className="profile-menu-action" type="button" onClick={() => { setOpen(false); navigate("/about"); }}>
                            📄 About CampusGPT
                        </button>
                    </div>

                    <div className="profile-dropdown-footer">
                        <button className="profile-menu-action logout-action" type="button" onClick={handleLogout}>
                            🚪 Logout
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ProfileDropdown;
