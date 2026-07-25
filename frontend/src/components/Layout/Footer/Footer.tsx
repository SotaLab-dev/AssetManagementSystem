import { Box, Typography } from "@mui/material";

const Footer = () => {
    return (
        <Box
            component="footer"
            sx={{
                py: 2,
                textAlign: "center",
            }}
        >
            <Typography variant="body2">
                ©2026 Asset Management System
            </Typography>
        </Box>
    );
};

export default Footer;