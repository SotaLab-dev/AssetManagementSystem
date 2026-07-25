import { Box, Toolbar } from "@mui/material";

import Footer from "../components/layout/Footer/Footer";
import Header from "../components/layout/Header/Header";
import Sidebar from "../components/layout/Sidebar/Sidebar";

type MainLayoutProps = {
    children: React.ReactNode;
};

const MainLayout = ({ children }: MainLayoutProps) => {
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

                {children}

                <Footer />
            </Box>
        </Box>
    );
};

export default MainLayout;