    import Sidebar from "../components/layout/Sidebar";
    import Navbar from "../components/layout/Navbar";
    import "../styles/dashboard.css";

    function DashboardLayout({ children }) {

        return (

            <div className="dashboard-layout">

                <Sidebar />

                <div className="dashboard-main">

                    <Navbar />

                    <div className="dashboard-content">

                        {children}

                    </div>

                </div>

            </div>

        );

    }

    export default DashboardLayout;