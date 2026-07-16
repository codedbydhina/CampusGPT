import NavbarUserMenu from "../profile/NavbarUserMenu";

function Navbar() {
    return (
        <div className="navbar">
            <div>
                <h3>CampusGPT Dashboard</h3>
            </div>

            <div className="navbar-right">
                <NavbarUserMenu />
            </div>
        </div>
    );
}

export default Navbar;