import { useMemo } from "react";

function ProfileAvatar({ user, size = 44, className = "" }) {
    const initials = useMemo(() => {
        const fullName = [user?.firstName, user?.lastName].filter(Boolean).join(" ").trim();
        if (fullName) {
            return fullName
                .split(/\s+/)
                .slice(0, 2)
                .map((part) => part[0]?.toUpperCase() || "")
                .join("");
        }

        const emailName = (user?.email || "User").split("@")[0];
        return emailName.slice(0, 2).toUpperCase();
    }, [user]);

    const imageSrc = user?.profileImage || user?.avatar || user?.photoUrl;

    return (
        <div
            className={`profile-avatar ${className}`.trim()}
            style={{ width: size, height: size, borderRadius: "50%" }}
            title={user?.email || "Profile"}
        >
            {imageSrc ? (
                <img src={imageSrc} alt="Profile" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%" }} />
            ) : (
                <span>{initials}</span>
            )}
        </div>
    );
}

export default ProfileAvatar;
