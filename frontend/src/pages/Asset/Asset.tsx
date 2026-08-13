import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Stack,
} from "@mui/material";

import AssetSearch from "./AssetSearch";
import AssetTable from "./AssetTable";
import AssetToolbar from "./AssetToolbar";
import { useAssetList } from "./hooks/useAssetList";

import AppButton from "../../components/ui/AppButton";
import AppSelect from "../../components/ui/AppSelect";
import { assetStatusOptions } from "../../constants/Asset";

const Asset = () => {
    const {
        filteredAssets,
        paginatedAssets,
        page,
        rowsPerPage,
        selectedAssetIds,
        isStatusDialogOpen,
        bulkStatus,
        setBulkStatus,
        handleSearch,
        handleReset,
        handleChangePage,
        handleChangeRowsPerPage,
        handleSelectAsset,
        handleSelectAll,
        handleDelete,
        handleBulkDelete,
        handleOpenStatusDialog,
        handleCloseStatusDialog,
        handleBulkStatusChange
    } = useAssetList();

    return (
        <Stack spacing={3}>
            <AssetToolbar />

            <AssetSearch
                onSearch={handleSearch}
                onReset={handleReset}
            />

            <Stack
                direction="row"
                sx={{
                    justifyContent: "flex-end",
                    gap: 1,
                    flexWrap: "wrap"
                }}
            >
                <AppButton
                    variant="outlined"
                    disabled={selectedAssetIds.length === 0}
                    onClick={handleOpenStatusDialog}
                >
                    状態を変更
                </AppButton>
                <AppButton
                    variant="outlined"
                    color="error"
                    disabled={selectedAssetIds.length === 0}
                    onClick={handleBulkDelete}
                >
                    選択した備品を削除
                </AppButton>
            </Stack>

            <AssetTable
                assets={paginatedAssets}
                onDelete={handleDelete}
                count={filteredAssets.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                selectedAssetIds={selectedAssetIds}
                onSelectAsset={handleSelectAsset}
                onSelectAll={handleSelectAll}
            />

            <Dialog
                open={isStatusDialogOpen}
                onClose={handleCloseStatusDialog}
                fullWidth
                maxWidth="sm"
            >
                <DialogTitle>
                    状態を変更
                </DialogTitle>

                <DialogContent
                    sx={{
                        display: "flex",
                        minHeight: 140,
                        pt: 2,
                        alignItems: "center",
                    }}
                >
                    <AppSelect
                        label="状態"
                        value={bulkStatus}
                        options={assetStatusOptions}
                        onChange={(event) => {
                            setBulkStatus(event.target.value);
                        }}
                    />
                </DialogContent>

                <DialogActions>
                    <AppButton
                        variant="outlined"
                        onClick={handleCloseStatusDialog}
                    >
                        キャンセル
                    </AppButton>

                    <AppButton
                        variant="outlined"
                        onClick={handleBulkStatusChange}
                    >
                        変更
                    </AppButton>
                </DialogActions>
            </Dialog>
        </Stack>
    );
};
export default Asset;