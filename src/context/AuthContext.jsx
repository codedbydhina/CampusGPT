import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [user, setUser] = useState({

        token: localStorage.getItem("token"),
        email: localStorage.getItem("email"),
        role: localStorage.getItem("role"),
        id: Number(localStorage.getItem("userId")),
        collegeId: Number(localStorage.getItem("collegeId"))

    });

    const login = (data) => {

        localStorage.setItem("token", data.token);
        localStorage.setItem("email", data.email);
        localStorage.setItem("role", data.role);
        localStorage.setItem("userId", data.id);
        localStorage.setItem("collegeId", data.collegeId);

        setUser(data);
    };

    const logout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("email");
        localStorage.removeItem("role");

        setUser(null);
    };

    return (

        <AuthContext.Provider value={{

            user,
            login,
            logout

        }}>

            {children}

        </AuthContext.Provider>

    );

}

export function useAuth() {

    return useContext(AuthContext);

}   