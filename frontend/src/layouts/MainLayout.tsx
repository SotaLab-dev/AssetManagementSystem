import { Box, Toolbar } from "@mui/material";
import { Outlet } from "react-router-dom";

import Footer from "../components/layout/Footer/Footer";
import Header from "../components/layout/Header/Header";
import Sidebar from "../components/layout/Sidebar/Sidebar";

const MainLayout = () => {
    return (
        <Box sx={{ display: "flex" }}>
            <Header />

            <Sidebar />

            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                }}
            >
                <Toolbar />

                <Outlet />

                <Footer />
            </Box>
        </Box>
    );
};

export default MainLayout;