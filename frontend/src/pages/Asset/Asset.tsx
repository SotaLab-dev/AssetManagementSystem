import {
    Box,
    Button,
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
        deleteSuccess,
        informationBulkDialogOpen,
        confirmDialogOpen,
        setConfirmDialogOpen,
        informationDialogOpen,
        handleSearch,
        handleReset,
        handleChangePage,
        handleChangeRowsPerPage,
        handleSelectAsset,
        handleSelectAll,
        handleDelete,
        handleDeleteInformationDialogClose,
        handleBulkDelete,
        handleOpenStatusDialog,
        handleCloseStatusDialog,
        handleBulkStatusChange,
        handleBulkDeleteInformationDialogClose,
        handleBulkDeleteConfirmDialogClose
    } = useAssetList();

    return (
        <Stack
            spacing={3}
            sx={{
                height: "100%",
                minHeight: 0,
            }}
        >
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
                    onClick={() => setConfirmDialogOpen(true)}
                >
                    選択した備品を削除
                </AppButton>
            </Stack>

            <Dialog open={confirmDialogOpen} onClose={handleBulkDeleteConfirmDialogClose}>
                <DialogTitle>
                    削除確認
                </DialogTitle>
                <DialogContent>
                    {selectedAssetIds.length}件の備品を削除してもよろしいですか？
                </DialogContent>
                < DialogActions >
                    <Button
                        onClick={handleBulkDeleteConfirmDialogClose}
                    >
                        閉じる
                    </Button>
                    <Button
                        onClick={handleBulkDelete}
                        color="error"
                        autoFocus
                    >
                        削除
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog open={informationBulkDialogOpen} onClose={handleBulkDeleteInformationDialogClose}>
                <DialogTitle>
                    削除完了
                </DialogTitle>
                <DialogContent>
                    {selectedAssetIds.length}件の削除が完了しました。
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleBulkDeleteInformationDialogClose}
                    >
                        閉じる
                    </Button>
                </DialogActions>
            </Dialog>

            <Box
                sx={{
                    flex: 1,
                    minHeight: 0,
                    minWidth: 0
                }}
            >
                <AssetTable
                    assets={paginatedAssets}
                    onDelete={handleDelete}
                    onDeleteDialogClose={handleDeleteInformationDialogClose}
                    deleteSuccess={deleteSuccess}
                    informationDialogOpen={informationDialogOpen}
                    count={filteredAssets.length}
                    page={page}
                    onPageChange={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    selectedAssetIds={selectedAssetIds}
                    onSelectAsset={handleSelectAsset}
                    onSelectAll={handleSelectAll}
                />
            </Box>

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