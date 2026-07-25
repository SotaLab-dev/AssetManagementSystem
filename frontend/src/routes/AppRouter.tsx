import { BrowserRouter, Route, Routes } from "react-router-dom";

import Dashboard from "../pages/Dashboard/Dashboard";
import { ROUTES } from "../constants/Routes";

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path={ROUTES.DASHBOARD}
                    element={<Dashboard />}
                />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRouter;