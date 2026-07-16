import { useEffect, useState } from "react";

function ThemeToggle() {
    const [theme, setTheme] = useState(() => localStorage.getItem("campusgpt-theme") || "light");

    useEffect(() => {
        document.body.dataset.theme = theme;
        document.documentElement.dataset.theme = theme;
        localStorage.setItem("campusgpt-theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((current) => (current === "dark" ? "light" : "dark"));
    };

    return (
        <button className="profile-menu-action profile-theme-toggle" type="button" onClick={toggleTheme}>
            <span>{theme === "dark" ? "☀️" : "🌙"}</span>
            <span>{theme === "dark" ? "Light Mode" : "Dark Mode"}</span>
        </button>
    );
}

export default ThemeToggle;
