import { useOutletContext } from "react-router-dom";

import type { AssetLayoutContext } from "../../../types/Asset";

import { useAssetSearch } from "./useAssetSearch";
import { useAssetPagination } from "./useAssetPagination";
import { useAssetSelection } from "./useAssetSelection";

export const useAssetList = () => {
    const {
        assets,
        setAssets,
    } = useOutletContext<AssetLayoutContext>();

    const {
        filteredAssets,
        handleSearch,
        handleReset,
    } = useAssetSearch();

    const {
        page,
        rowsPerPage,
        getPaginatedAssets,
        handleChangePage,
        handleChangeRowsPerPage,
        setPage,
    } = useAssetPagination();

    const paginatedAssets = getPaginatedAssets(filteredAssets);

    const {
        selectedAssetIds,
        isStatusDialogOpen,
        bulkStatus,
        setBulkStatus,
        handleSelectAsset,
        handleSelectAll,
        handleDelete,
        handleBulkDelete,
        handleOpenStatusDialog,
        handleCloseStatusDialog,
        handleBulkStatusChange,
    } = useAssetSelection({
        assets,
        setAssets,
        paginatedAssets,
    });

    const handleSearchAndResetPage = () => {
        handleSearch();
        setPage(0);
    };

    const handleResetAndResetPage = () => {
        handleReset();
        setPage(0);
    };

    return {
        filteredAssets,
        paginatedAssets,
        page,
        rowsPerPage,
        selectedAssetIds,
        isStatusDialogOpen,
        bulkStatus,
        setBulkStatus,
        handleSearch: handleSearchAndResetPage,
        handleReset: handleResetAndResetPage,
        handleChangePage,
        handleChangeRowsPerPage,
        handleSelectAsset,
        handleSelectAll,
        handleDelete,
        handleBulkDelete,
        handleOpenStatusDialog,
        handleCloseStatusDialog,
        handleBulkStatusChange,
    };
};