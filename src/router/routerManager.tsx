import LoginScreen from '@/domains/auth/LoginScreen';
import HomeScreen from '@/domains/home/HomeScreen';
import { Navigate, Route, Routes } from 'react-router-dom';
import PrivateRoutes from './PrivateRoutes';
import { routePaths } from './routePaths';

export const MainRouter = () => {
    return (
        <Routes>
            <Route
                path={routePaths.ROOT}
                element={<Navigate to={routePaths.HOME} />}
            />
            <Route element={<PrivateRoutes />}>
                <Route path={routePaths.HOME} element={<HomeScreen />} />
            </Route>
            <Route path={routePaths.LOGIN} element={<LoginScreen />} />
        </Routes>
    );
};
