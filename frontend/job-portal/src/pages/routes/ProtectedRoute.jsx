import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ requiredRole }) => {
    const { user, token, hydrating } = useSelector((state) => state.auth);
    const location = useLocation();

    if (hydrating || (token && !user)) return <div role="status">Loading account...</div>;
    if (!token) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    const roles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];

    if (requiredRole && !roles.includes(user?.role)) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
