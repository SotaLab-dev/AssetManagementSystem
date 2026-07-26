import {
    Navigate,
    Route,
    Routes,
} from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import Dashboard from "../pages/Dashboard/Dashboard";
import Asset from "../pages/Asset/Asset";
import Login from "../pages/Login/Login";

import RoutePath from "../constants/Routes";

const AppRouter = () => {
    return (
        <Routes>
            <Route
                path={RoutePath.login}
                element={<Login />}
            />

            <Route
                element={<MainLayout />}
            >
                <Route
                    path={RoutePath.dashboard}
                    element={<Dashboard />}
                />

                <Route
                    path={RoutePath.assets}
                    element={<Asset />}
                />
            </Route>

            <Route
                path="*"
                element={
                    <Navigate
                        to={RoutePath.dashboard}
                        replace
                    />
                }
            />
        </Routes>
    );
};

export default AppRouter;