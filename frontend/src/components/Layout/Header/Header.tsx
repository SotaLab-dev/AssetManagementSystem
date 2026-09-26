import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { DRAWER_WIDTH, HEADER_HEIGHT } from "../../../constants/Layout";
import { AppMode } from "../../../types/AppMode";

type HeaderProps = {
    mode: AppMode;
    sidebarOpen?: boolean
    onMenuClick?: () => void;
};

const Header = ({ mode, sidebarOpen, onMenuClick }: HeaderProps) => {
    const sidebarWidth = AppMode.MAIN && sidebarOpen ? DRAWER_WIDTH : 0;
    return (
        <AppBar
            position="fixed"
            sx={{
                left: sidebarWidth,
                height: HEADER_HEIGHT,
                justifyContent: "center",
                width: `calc(100% - ${sidebarWidth}px)`,
                transition: "left 0.2s, width 0.2s"
            }}>

            {mode === AppMode.MAIN && (
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
            )}
            {mode === AppMode.LOGIN && (
                <Toolbar>
                    <Typography variant="h6">
                        Asset Management System
                    </Typography>
                </Toolbar>
            )}
        </AppBar>
    );
};

export default Header;