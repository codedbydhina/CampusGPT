import { useAuth } from "../../context/AuthContext";
import ProfileDropdown from "./ProfileDropdown";

function NavbarUserMenu() {
    const { user } = useAuth();

    return <ProfileDropdown user={user} />;
}

export default NavbarUserMenu;
