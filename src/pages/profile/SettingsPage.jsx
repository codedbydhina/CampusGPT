import DashboardLayout from "../../layouts/DashboardLayout";
import ThemeToggle from "../../components/profile/ThemeToggle";

function SettingsPage() {
    return (
        <DashboardLayout>
            <div className="profile-page-shell">
                <div className="profile-card">
                    <h2>Settings</h2>
                    <div className="settings-section">
                        <h3>Appearance</h3>
                        <ThemeToggle />
                    </div>
                    <div className="settings-section">
                        <h3>Notifications</h3>
                        <p>Notification preferences will appear here.</p>
                    </div>
                    <div className="settings-section">
                        <h3>Language</h3>
                        <p>Language settings will appear here.</p>
                    </div>
                    <div className="settings-section">
                        <h3>Security</h3>
                        <p>Security preferences will appear here.</p>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}

export default SettingsPage;
