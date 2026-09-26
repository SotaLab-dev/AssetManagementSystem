import Box from "@mui/material/Box";
import Header from "../components/layout/Header/Header";
import { Outlet } from "react-router-dom";
import { Toolbar } from "@mui/material";
import { AppMode } from "../types/AppMode";

const AuthLayout = () => {
    return (
        <Box
            sx={{
                display: "flex",
                height: "100vh",
                overflow: "hidden",
            }}
        >
            <Header
                mode={AppMode.LOGIN}
            />

            <Toolbar />
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    minHeight: 0,
                    minWidth: 0,
                    height: "100vh",
                    display: "flex",
                    flexDirection: "column",
                    p: 3
                }}
            >
                <Outlet />
            </Box>
        </Box>
    )
};

export default AuthLayout;