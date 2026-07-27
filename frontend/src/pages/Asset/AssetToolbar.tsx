import {
    Box,
    Typography,
} from "@mui/material";

import AppButton from "../../components/ui/AppButton";
import { useNavigate } from "react-router-dom";

import RoutePath from "../../constants/Routes";

const AssetToolbar = () => {
    const navigate = useNavigate();
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 3,
            }}
        >
            <Typography variant="h4">
                備品管理
            </Typography>

            <AppButton
                onClick={() => navigate(RoutePath.assetCreate)}
            >
                新規登録
            </AppButton>
        </Box>
    );
};

export default AssetToolbar;