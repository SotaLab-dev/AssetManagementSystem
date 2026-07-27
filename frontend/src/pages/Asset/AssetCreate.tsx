import {
    Stack,
    Typography,
} from "@mui/material";

import AssetForm from "./components/AssetForm";

const AssetCreate = () => {
    return (
        <Stack spacing={3}>
            <Typography variant="h4">
                備品登録
            </Typography>

            <AssetForm />
        </Stack>
    );
};

export default AssetCreate;