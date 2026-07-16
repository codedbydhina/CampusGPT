import DashboardLayout from "../../layouts/DashboardLayout";

function AboutPage() {
    return (
        <DashboardLayout>
            <div className="profile-page-shell">
                <div className="profile-card">
                    <h2>About CampusGPT</h2>
                    <p>CampusGPT is a multi-tenant AI platform for academic institutions.</p>
                </div>
            </div>
        </DashboardLayout>
    );
}

export default AboutPage;
