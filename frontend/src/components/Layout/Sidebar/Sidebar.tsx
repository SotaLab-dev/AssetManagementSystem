import { Box, Drawer, Toolbar, Typography } from "@mui/material";
import { DRAWER_WIDTH } from "../../../constants/Layout";

type SidebarProps = {
    open: boolean;
}
const Sidebar = ({open}: SidebarProps) => {
    const drawerWidth = open ? DRAWER_WIDTH : 0;

    return (
        <Drawer
            variant="permanent"
            open={open}
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                "& .MuiDrawer-paper": {
                    width: drawerWidth ,
                    boxSizing: "border-box",
                    overflowX: "hidden",
                    transition: "width 0.2s"
                },
            }}
        >
            <Toolbar />

            <Box sx={{ p: 2 }}>
                {open && (
                <Typography>
                    Dashboard
                </Typography>
                )}
            </Box>
        </Drawer>
    );
};

export default Sidebar;