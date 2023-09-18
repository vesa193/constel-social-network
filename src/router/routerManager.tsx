import {
    Navigate,
    Route,
    createBrowserRouter,
    createRoutesFromElements,
} from 'react-router-dom';
import HomeScreen from '@/domains/home/HomeScreen';
import LoginScreen from '@/domains/auth/LoginScreen';
import { routePaths } from './routePaths';
import PrivateRoutes from './PrivateRoutes';

export const router = () => {
    return createBrowserRouter(
        createRoutesFromElements(
            <>
                <Route
                    path={routePaths.ROOT}
                    element={<Navigate to={routePaths.HOME} />}
                />
                <Route element={<PrivateRoutes />}>
                    <Route path={routePaths.HOME} element={<HomeScreen />} />
                </Route>
                <Route path={routePaths.LOGIN} element={<LoginScreen />} />
            </>
        )
    );
};
