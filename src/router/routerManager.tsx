import {
    Navigate,
    Route,
    createBrowserRouter,
    createRoutesFromElements,
} from 'react-router-dom';
import Home from '@/domains/HomePage';
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
                    <Route path={routePaths.HOME} element={<Home />} />
                </Route>
                <Route path={routePaths.LOGIN} element={<LoginScreen />} />
            </>
        )
    );
};
