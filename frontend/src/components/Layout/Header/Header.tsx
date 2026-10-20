import { AppBar, Box, IconButton, Popover, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { DRAWER_WIDTH, HEADER_HEIGHT } from "../../../constants/Layout";
import { AppMode } from "../../../types/AppMode";
import { Info } from "@mui/icons-material";
import { useState } from "react";
import InfoList from "../../common/MenuList/InfoList";

type HeaderProps = {
    mode: AppMode;
    sidebarOpen?: boolean
    onMenuClick?: () => void;
};

const Header = ({ mode, sidebarOpen, onMenuClick }: HeaderProps) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const sidebarWidth = mode === AppMode.MAIN && sidebarOpen ? DRAWER_WIDTH : 0;

    return (
        <AppBar
            position="fixed"
            sx={{
                left: sidebarWidth,
                height: HEADER_HEIGHT,
                justifyContent: "center",
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

                    <Typography
                        variant="h6"
                        sx={{
                            flexGrow: 1
                        }}
                    >
                        Asset Management System
                    </Typography>
                    <IconButton onClick={handleClick}>
                        <Info />
                    </IconButton>

                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "flex-end",
                            right: 0
                        }}
                    >
                        <Popover
                            open={open}
                            anchorEl={anchorEl}
                            onClose={handleClose}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "right",
                            }}
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                        >
                            <InfoList />
                        </Popover>
                    </Box>
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