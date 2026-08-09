import {
    Navigate,
    Route,
    Routes,
} from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import Dashboard from "../pages/Dashboard/Dashboard";
import Asset from "../pages/Asset/Asset";
import AssetCreate from "../pages/Asset/AssetCreate";
import { AssetEdit } from "../pages/Asset/AssetEdit";
import Login from "../pages/Login/Login";


import RoutePath from "../constants/Routes";
import AssetLayout from "../components/AssetLayout/AssetLayout";

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

                <Route element={<AssetLayout />}>
                    <Route
                        path={RoutePath.assets}
                        element={<Asset />}
                    />

                    <Route
                        path={RoutePath.assetCreate}
                        element={<AssetCreate />}
                    />

                    <Route
                        path={RoutePath.assetEdit}
                        element={<AssetEdit />}
                    />

                </Route>
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