import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

type HeaderProps = {
    onMenuClick: () => void;
};

const Header = ({ onMenuClick }: HeaderProps) => {
    return (
        <AppBar position="fixed">
            <Toolbar>
                <IconButton
                    onClick={onMenuClick}
                    aria-label="サイドバーを開閉"
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6">
                    Asset Management System
                </Typography>
            </Toolbar>
        </AppBar>
    );
};

export default Header;