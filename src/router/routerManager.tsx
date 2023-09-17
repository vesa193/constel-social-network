import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import Home from '@/pages/HomePage';
import Login from '@/pages/auth/LoginPage';
import { routePaths } from './routePaths';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path={routePaths.ROOT} element={<Home />} />
      <Route path={routePaths.LOGIN} element={<Login />} />
    </>
  )
);
