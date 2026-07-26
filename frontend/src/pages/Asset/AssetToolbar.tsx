import AddIcon from "@mui/icons-material/Add";
import {
    Box,
    Typography,
} from "@mui/material";

import AppButton from "../../components/ui/AppButton";

type AssetToolbarProps = {
    onCreate: () => void;
};

const AssetToolbar = ({
    onCreate,
}: AssetToolbarProps) => {
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
                startIcon={<AddIcon />}
                onClick={onCreate}
            >
                新規登録
            </AppButton>
        </Box>
    );
};

export default AssetToolbar;