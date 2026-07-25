import { AppBar, Toolbar, Typography } from "@mui/material";

const Header = () => {
    return (
        <AppBar position="fixed">
            <Toolbar>
                <Typography variant="h6">
                    Asset Management System
                </Typography>
            </Toolbar>
        </AppBar>
    );
};

export default Header;