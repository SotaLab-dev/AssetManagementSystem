import { useState } from "react";
import { useOutletContext } from "react-router-dom";

import { DEFAULT_ASSET_STATUS } from "../../../constants/Asset";
import type {
    AssetLayoutContext,
    AssetSearchCondition,
} from "../../../types/Asset";

export const useAssetList = () => {
    const {
        assets,
        setAssets,
        searchCondition,
        setSearchCondition,
        appliedSearchCondition,
        setAppliedSearchCondition,
    } = useOutletContext<AssetLayoutContext>();


    const [page, setPage] = useState<number>(0);
    const [rowsPerPage, setRowsPerPage] = useState<number>(10);
    const [selectedAssetIds, setSelectedAssetIds] = useState<string[]>([]);
    const [isStatusDialogOpen, setIsStatusDialogOpen] = useState<boolean>(false);
    const [bulkStatus, setBulkStatus] = useState(DEFAULT_ASSET_STATUS);

    const handleDelete = (id: string) => {
        const confirmed = window.confirm(
            "この備品を本当に削除しますか？"
        );
        if (!confirmed) {
            return;
        }

        setAssets((prev) =>
            prev.filter(
                (asset) => asset.id !== id
            )
        );
        setSelectedAssetIds((prev) =>
            prev.filter(
                (selectedId) => selectedId !== id,
            ),
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

        if(currentPageIds.length === 0){
            return;
        };

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
    };

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
    };

    const handleCloseStatusDialog = () => {
        setIsStatusDialogOpen(false);
    };

    const handleBulkStatusChange = () => {
        if (selectedAssetIds.length === 0) {
            return;
        };

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

    return {
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
    }
};