import { AuthContext } from '@/context/AuthtContext';
import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoutes = () => {
    const { token } = useContext(AuthContext);
    const JWTToken = token || localStorage.getItem('token');

    return !!JWTToken ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoutes;
