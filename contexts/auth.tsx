import React, { createContext, useState, useContext, useEffect, ReactNode } from "react";
import Cookies from "js-cookie";
import Router from "next/router";

//api here is an axios instance which has the baseURL set according to the env.
import request from "../utils/axios";
import { authContextType } from "../models";
import LoginPage from "../pages/login";

type Props = {
    children: ReactNode;
};

const authContextDefaultValues: authContextType = {
    user: null,
    loading: false,
    isAuthenticated: false,
    login: () => {},
    logout: () => {},
};

const AuthContext = createContext<authContextType>(authContextDefaultValues);

export const AuthProvider = ({ children }: Props) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const isAuthenticated = !!user;
    console.count();

    useEffect(() => {
        async function loadUserFromCookies() {
            const token = Cookies.get("token");
            if (token) {
                request.defaults.headers.common["Authorization"] = `Bearer ${token}`;
                const { data: user } = await request.get("/user_info");
                if (user) setUser(user);
            }
            setLoading(false);
        }
        loadUserFromCookies();
    }, []);

    const login = async (username: string, password: string) => {
        const { data: res } = await request.post("/login", { username, password });
        const token = res.response.accessToken;
        if (token) {
            Cookies.set("token", token, { expires: 60 });
            request.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            const { data: dataUser } = await request.get("/user_info");
            setUser(dataUser.response);
            Router.push("/dashboard");
        }
    };

    const logout = () => {
        Cookies.remove("token");
        setUser(null);
        delete request.defaults.headers.common["Authorization"];
        Router.push("/login");
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, loading, logout }}>
            {user ? children : <LoginPage />}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
