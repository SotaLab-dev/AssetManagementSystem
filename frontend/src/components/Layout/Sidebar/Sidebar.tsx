import { Box, Drawer, Toolbar, Typography } from "@mui/material";
import { DRAWER_WIDTH } from "../../../constants/Layout";

const Sidebar = () => {
    return (
        <Drawer
            variant="permanent"
            sx={{
                width: DRAWER_WIDTH ,
                flexShrink: 0,
                "& .MuiDrawer-paper": {
                    width: DRAWER_WIDTH ,
                    boxSizing: "border-box",
                },
            }}
        >
            <Toolbar />

            <Box sx={{ p: 2 }}>
                <Typography>
                    Dashboard
                </Typography>
            </Box>
        </Drawer>
    );
};

export default Sidebar;