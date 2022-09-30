import { useAuth } from "./auth";
import Router, { useRouter } from "next/router";

const ProtectRoute = ({ children }: any) => {
    const { isAuthenticated } = useAuth();
    const router = useRouter();
    if (typeof window !== "undefined") {
        if (!isAuthenticated && window.location.pathname !== "/login") {
            router.push("/login");
        }
        if (isAuthenticated && window.location.pathname === "/login") {
            router.push("/dashboard");
        }
    }

    return children;
};

export default ProtectRoute;
