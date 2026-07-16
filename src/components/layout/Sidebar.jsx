import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {
    FaHome,
    FaUniversity,
    FaUsers,
    FaFileAlt,
    FaGraduationCap,
    FaChalkboardTeacher,
    FaUserGraduate,
    FaHistory,
    FaRobot,
    FaCloudUploadAlt
} from "react-icons/fa";


function Sidebar() {

    const { user } = useAuth();
    const menu = {

        SUPER_ADMIN: [
            {
                title: "Dashboard",
                path: "/superadmin/dashboard",
                icon: <FaHome />
            },
            {
                title: "Colleges",
                path: "/superadmin/colleges",
                icon: <FaUniversity />
            },
            {
                title: "College Admins",
                path: "/superadmin/users",
                icon: <FaUsers />
            }
        ],
        COLLEGE_ADMIN: [
            {
                title: "Dashboard",
                path: "/admin/dashboard",
                icon: <FaHome />
            },
            {
                title: "Faculty",
                path: "/admin/faculty",
                icon: <FaChalkboardTeacher />
            },
            {
                title: "Students",
                path: "/admin/students",
                icon: <FaUserGraduate />
            },
            {
                title: "Documents",
                path: "/admin/documents",
                icon: <FaFileAlt />
            }
        ],

        FACULTY: [
            {
                title: "Dashboard",
                path: "/faculty/dashboard",
                icon: <FaHome />
            },
            {
                title: "AI Chat",
                path: "/faculty/chat",
                icon: <FaRobot />
            },
            {
                title: "Documents",
                path: "/faculty/documents",
                icon: <FaFileAlt />
            },
            {
                title: "Upload Document",
                path: "/faculty/documents/upload",
                icon: <FaCloudUploadAlt />
            }
        ],

        STUDENT: [
            {
                title: "Dashboard",
                path: "/student/dashboard",
                icon: <FaHome />
            },
            {
                title: "AI Chat",
                path: "/student/chat",
                icon: <FaRobot />
            },
            {
                title: "History",
                path: "/student/history",
                icon: <FaHistory />
            }
        ]

    };

    const items = menu[user?.role] || [];

    return (

        <div className="sidebar">

            <div className="sidebar-logo">

                <div className="logo-icon">
                    <FaGraduationCap />
                </div>

                <div>

                    <h2>CampusGPT</h2>

                    <p>AI College Platform</p>

                </div>

            </div>

            <ul className="sidebar-menu">

                {items.map((item) => (

                    <li key={item.path}>

                        <NavLink
                            to={item.path}
                            className={({ isActive }) =>
                                isActive ? "active-menu" : ""
                            }
                        >
                            <span className="menu-icon">
                                {item.icon}
                            </span>

                            <span>
                                {item.title}
                            </span>
                        </NavLink>

                    </li>

                ))}

            </ul>

        </div>
    );

}

export default Sidebar;