import { useState } from "react";

import RefreshIcon from "@mui/icons-material/Refresh";
import SearchIcon from "@mui/icons-material/Search";

import {
    Box,
    Grid,
    Paper,
    Stack,
    Typography,
} from "@mui/material";

import AppButton from "../../components/ui/AppButton";
import AppSelect from "../../components/ui/AppSelect";
import AppTextField from "../../components/ui/AppTextField";

import {
    assetCategorySearchOptions,
    assetStatusSearchOptions,
} from "../../constants/Asset";

const AssetSearch = () => {
    const [assetName, setAssetName] = useState("");
    const [category, setCategory] = useState("");
    const [status, setStatus] = useState("");

    const handleSearch = () => {
        console.log({
            assetName,
            category,
            status,
        });
    };

    const handleReset = () => {
        setAssetName("");
        setCategory("");
        setStatus("");
    };

    return (
        <Paper sx={{ p: 3 }}>
            <Stack spacing={3}>
                <Typography variant="h6">
                    検索条件
                </Typography>

                <Grid container spacing={2}>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <AppTextField
                            label="備品名"
                            value={assetName}
                            onChange={(event) => {
                                setAssetName(event.target.value);
                            }}
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 4 }}>
                        <AppSelect
                            label="カテゴリ"
                            value={category}
                            options={assetCategorySearchOptions}
                            onChange={(event) => {
                                setCategory(event.target.value);
                            }}
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 4 }}>
                        <AppSelect
                            label="状態"
                            value={status}
                            options={assetStatusSearchOptions}
                            onChange={(event) => {
                                setStatus(event.target.value);
                            }}
                        />
                    </Grid>
                </Grid>

                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        gap: 2,
                        flexWrap: "wrap",
                    }}
                >
                    <AppButton
                        startIcon={<SearchIcon />}
                        onClick={handleSearch}
                    >
                        検索
                    </AppButton>

                    <AppButton
                        variant="outlined"
                        startIcon={<RefreshIcon />}
                        onClick={handleReset}
                    >
                        リセット
                    </AppButton>
                </Box>
            </Stack>
        </Paper>
    );
};

export default AssetSearch;