import type React from "react";
import { Navigate } from "react-router-dom";

type childrenProps={
    children :React.ReactNode,
    allowedRole:string
}
const ProtectedRoute = ({children,allowedRole}:childrenProps) => {
    const token = localStorage.getItem("token");
    if (!token) {
        return <Navigate to="/" />;
    }
    const userRole = localStorage.getItem("selectedRole");
    if(userRole !== allowedRole){
        return <Navigate to="/" />
    }
    return <>{children}</>;
};

export default ProtectedRoute;
