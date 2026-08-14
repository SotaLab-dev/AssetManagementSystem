import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { DRAWER_WIDTH } from "../../../constants/Layout";

type HeaderProps = {
    sidebarOpen: boolean
    onMenuClick: () => void;
};

const Header = ({ sidebarOpen, onMenuClick }: HeaderProps) => {
    const sidebarWidth = sidebarOpen ? DRAWER_WIDTH :0;
    return (
        <AppBar 
            position="fixed"
            sx={{
                left: sidebarWidth,
                width: `calc(100% - ${sidebarWidth}px)`,
                transition: "left 0.2s, width 0.2s"
            }}>
            <Toolbar>
                {!sidebarOpen && (
                <IconButton
                    onClick={onMenuClick}
                    aria-label="サイドバーを開閉"
                >
                    <MenuIcon />
                </IconButton>
                )}
                <Typography variant="h6">
                    Asset Management System
                </Typography>
            </Toolbar>
        </AppBar>
    );
};

export default Header;