import { Box, Toolbar } from "@mui/material";
import { Outlet } from "react-router-dom";

import Footer from "../components/layout/Footer/Footer";
import Header from "../components/layout/Header/Header";
import Sidebar from "../components/layout/Sidebar/Sidebar";
import { useState } from "react";

const MainLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

    return (
        <Box
            sx={{
                display: "flex",
                height: "100vh",
                overflow: "hidden",
            }}
        >
            <Header
                sidebarOpen={sidebarOpen}
                onMenuClick={() => {
                    setSidebarOpen((prev) => !prev);
                }}
            />

            <Sidebar
                open={sidebarOpen}
                onMenuClick={() => {
                    setSidebarOpen((prev) => !prev);
                }}
            />
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    minHeight: 0,
                    minWidth: 0,
                    height: "100vh",
                    display: "flex",
                    flexDirection: "column",
                    boxSizing: "border-ox",
                    overflow: "hidden",
                    p: 3
                }}
            >
                <Toolbar
                    sx={{
                        flexShrink: 0,
                    }}
                />
                <Box
                    sx={{
                        flexGrow: 1,
                        minHeight: 0,
                        minWidth: 0,
                    }}
                >
                    <Outlet />
                </Box>

                <Footer />

            </Box>
        </Box>
    );
};

export default MainLayout;