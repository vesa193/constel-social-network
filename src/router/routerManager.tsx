import {
    Navigate,
    Route,
    createBrowserRouter,
    createRoutesFromElements,
} from 'react-router-dom';
import Home from '@/domains/HomePage';
import LoginScreen from '@/domains/auth/LoginScreen';
import { routePaths } from './routePaths';

export const router = () => {
    return createBrowserRouter(
        createRoutesFromElements(
            <>
                <Route
                    path={routePaths.ROOT}
                    element={<Navigate to={routePaths.HOME} />}
                />
                <Route path={routePaths.HOME} element={<Home />} />
                <Route path={routePaths.LOGIN} element={<LoginScreen />} />
            </>
        )
    );
};
