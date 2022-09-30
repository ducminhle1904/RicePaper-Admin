import { useAuth } from "./auth";
import Router from "next/router";

const ProtectRoute = ({ children }) => {
    const { isAuthenticated } = useAuth();
    if (!isAuthenticated && Router.pathname !== "/login") {
        Router.push("/login");
    }
    if (isAuthenticated && Router.pathname === "/login") {
        Router.push("/dashboard");
    }
    return children;
};

export default ProtectRoute;
