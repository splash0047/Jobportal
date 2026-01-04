import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ requiredRole }) => {
    const { user, token } = useSelector((state) => state.auth);
    const location = useLocation();

    if (!token) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    const roles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];

    if (requiredRole && !roles.includes(user?.role)) {
        return <Navigate to="/unauthorized" replace />; // Or handle better
    }

    return <Outlet />;
};

export default ProtectedRoute;
