import {
    Box,
    Drawer,
    IconButton,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
} from "@mui/material";

import Inventory2Icon from "@mui/icons-material/Inventory2";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

import { DRAWER_WIDTH } from "../../../constants/Layout";
import { useNavigate } from "react-router-dom";
import RoutePath from "../../../constants/Routes";

type SidebarProps = {
    open: boolean;
    onMenuClick: () => void;
}
const Sidebar = ({ open, onMenuClick }: SidebarProps) => {
    const navigate = useNavigate();
    const drawerWidth = open ? DRAWER_WIDTH : 0;

    const handleAssetClick = () => {
        navigate(RoutePath.assets);
    }

    return (
        <Drawer
            variant="permanent"
            open={open}
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                "& .MuiDrawer-paper": {
                    width: drawerWidth,
                    boxSizing: "border-box",
                    overflowX: "hidden",
                    transition: "width 0.2s"
                },
            }}
        >

            <Box
                sx={{
                    p: 1,
                    pt: 0,
                }}
            >
                {open && (
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "flex-end",
                        }}
                    >
                        <IconButton
                            onClick={onMenuClick}
                            aria-label="サイドバーを閉じる"
                        >
                            <ChevronLeftIcon />
                        </IconButton>
                    </Box>
                )}
                <List >
                    <ListItemButton
                        onClick={handleAssetClick}
                        sx={{
                            minHeight: 48,
                            justifyContent: open ? "initial" : "center",
                            px: 2,
                        }}
                    >
                        <ListItemIcon
                            sx={{
                                minWidth: 0,
                                mr: open ? 2 : 0,
                                justifyContent: "center",
                            }}
                        >
                            <Inventory2Icon />
                        </ListItemIcon>
                        {open && (
                            <ListItemText
                                primary="備品管理"
                            />
                        )}
                    </ListItemButton>
                </List>

                {open && (
                    <Typography
                        sx={{
                            mt: 1,
                            px: 2,
                        }}>
                        Dashboard
                    </Typography>
                )}
            </Box>
        </Drawer>
    );
};

export default Sidebar;