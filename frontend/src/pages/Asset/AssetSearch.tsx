import { useOutletContext } from "react-router-dom";


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
import { type AssetLayoutContext } from "../../types/Asset";

type AssetSearchProps = {
    onSearch: () => void;
    onReset: () => void;
};

const AssetSearch = ({ onSearch, onReset }: AssetSearchProps) => {
    const {
        searchCondition,
        setSearchCondition,
    } = useOutletContext<AssetLayoutContext>();


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
                            value={searchCondition.assetName}
                            onChange={(event) => {
                                setSearchCondition((prev) => ({
                                    ...prev,
                                    assetName: event.target.value
                                }));
                            }}
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 4 }}>
                        <AppSelect
                            label="カテゴリ"
                            value={searchCondition.category}
                            options={assetCategorySearchOptions}
                            onChange={(event) => {
                                setSearchCondition((prev) => ({
                                    ...prev,
                                    category: event.target.value
                                }));
                            }}
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 4 }}>
                        <AppSelect
                            label="状態"
                            value={searchCondition.status}
                            options={assetStatusSearchOptions}
                            onChange={(event) => {
                                setSearchCondition((prev) => ({
                                    ...prev,
                                    status: event.target.value
                                }));
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
                        onClick={onSearch}
                    >
                        検索
                    </AppButton>

                    <AppButton
                        variant="outlined"
                        startIcon={<RefreshIcon />}
                        onClick={onReset}
                    >
                        リセット
                    </AppButton>
                </Box>
            </Stack>
        </Paper>
    );
};

export default AssetSearch;