import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "./hooks/useAuth.js";

const RequireAuth = ({ allowedRoles }) => {
    const { auth } = useAuth();
    const location = useLocation();

    // Asegúrate de que roles sea un arreglo, usando Object.values si es un objeto
    const rolesArray = Array.isArray(auth?.roles) ? auth.roles : Object.values(auth?.roles || {});

    return (
        rolesArray?.find(role => allowedRoles?.includes(role))
            ? <Outlet />
            : auth?.user
                ? <Navigate to="/unauthorized" state={{ from: location }} replace />
                : <Navigate to="/login" state={{ from: location }} replace />
    );
}

export default RequireAuth;