import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import type { AssetSearchCondition } from "../../types/Asset";

import { Box, Dialog, DialogActions, DialogContent, DialogTitle, Stack } from "@mui/material";

import AssetSearch from "./AssetSearch";
import AssetTable from "./AssetTable";
import AssetToolbar from "./AssetToolbar";
import { type AssetLayoutContext } from "../../types/Asset";
import AppButton from "../../components/ui/AppButton";
import { assetStatusOptions, DEFAULT_ASSET_STATUS } from "../../constants/Asset";
import AppSelect from "../../components/ui/AppSelect";

const Asset = () => {
    const [page, setPage] = useState<number>(0);
    const [rowsPerPage, setRowsPerPage] = useState<number>(10);
    const [selectedAssetIds, setSelectedAssetIds] = useState<string[]>([]);
    const [isStatusDialogOpen, setIsStatusDialogOpen] = useState<boolean>(false);
    const [bulkStatus, setBulkStatus] = useState(DEFAULT_ASSET_STATUS);

    const {
        assets,
        setAssets,
        searchCondition,
        setSearchCondition,
        appliedSearchCondition,
        setAppliedSearchCondition,
    } = useOutletContext<AssetLayoutContext>();

    const handleDelete = (id: string) => {
        const confirmed = window.confirm(
            "この備品を本当に削除しますか？"
        );
        if (!confirmed) {
            return;
        }

        setAssets((prev) => prev.filter((asset) => asset.id !== id)
        );
    };

    const handleSearch = () => {
        setAppliedSearchCondition(searchCondition);
        setPage(0);
    };

    const handleReset = () => {
        const emptyCondition: AssetSearchCondition = {
            assetName: "",
            category: "",
            status: "",
        };
        setSearchCondition(emptyCondition);
        setAppliedSearchCondition(emptyCondition);
        setPage(0);
    }

    const filteredAssets = assets.filter((asset) => {
        const matchesAssetName =
            appliedSearchCondition.assetName === "" ||
            asset.assetName
                .toLowerCase()
                .includes(
                    appliedSearchCondition.assetName.toLowerCase()
                );
        const matchesCategory =
            appliedSearchCondition.category === "" ||
            asset.category === appliedSearchCondition.category;

        const matchesStatus =
            appliedSearchCondition.status === "" ||
            asset.status === appliedSearchCondition.status;

        return (
            matchesAssetName &&
            matchesCategory &&
            matchesStatus
        )
    })

    const paginatedAssets = filteredAssets.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage,
    );

    const handleChangePage = (
        _event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,

    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleSelectAsset = (id: string) => {
        setSelectedAssetIds((prev) =>
            prev.includes(id)
                ? prev.filter((selectedId) => selectedId !== id)
                : [...prev, id],
        );
    };

    const handleSelectAll = () => {
        const currentPageIds = paginatedAssets.map(
            (asset) => asset.id,
        );

        const allSelected = currentPageIds.every((id) =>
            selectedAssetIds.includes(id),
        );

        if (allSelected) {
            setSelectedAssetIds((prev) =>
                prev.filter(
                    (id) => !currentPageIds.includes(id),
                ),
            );
            return;
        }
        setSelectedAssetIds((prev) => [
            ...new Set([...prev, ...currentPageIds]),
        ]);
    }; {

        const handleBulkDelete = () => {
            if (selectedAssetIds.length === 0) {
                return;
            }
            const confirmed = window.confirm(
                `${selectedAssetIds.length}件の備品を削除しますか？`,
            );

            if (!confirmed) {
                return;
            }

            setAssets((prev) =>
                prev.filter(
                    (asset) => !selectedAssetIds.includes(asset.id),
                ),
            );

            setSelectedAssetIds([]);
        };

        const handleOpenStatusDialog = () => {
            if (selectedAssetIds.length === 0) {
                return;
            }

            setBulkStatus(DEFAULT_ASSET_STATUS);
            setIsStatusDialogOpen(true);
        }

        const handleCloseStatusDialog = () => {
            setIsStatusDialogOpen(false);
        }

        const handleBulkStatusChange = () => {
            setAssets((prev) =>
                prev.map((asset) =>
                    selectedAssetIds.includes(asset.id)
                        ? {
                            ...asset,
                            status: bulkStatus,
                        }
                        : asset,
                ),
            );
            setSelectedAssetIds([]);
            setIsStatusDialogOpen(false);
        };

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
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "flex-end",
                            gap: 1,
                            flexWrap: "wrap",
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
                    </Box>
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
                >
                    <DialogTitle>
                        状態を変更
                    </DialogTitle>

                    <DialogContent>
                        <AppSelect
                            label="状態"
                            value={bulkStatus}
                            options={assetStatusOptions}
                            onChange={(event) => {
                                setBulkStatus(event?.target.value);
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
};
export default Asset;