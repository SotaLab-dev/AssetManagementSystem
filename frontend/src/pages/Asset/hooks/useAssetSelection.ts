import { useState } from "react";

import { DEFAULT_ASSET_STATUS } from "../../../constants/Asset";
import type { AssetItem } from "../../../types/Asset";
import { GetAssets } from "../../../components/AssetLayout/AssetLayout";

type UseAssetSelectionProps = {
    setAssets: React.Dispatch<React.SetStateAction<AssetItem[]>>;
    paginatedAssets: AssetItem[];
};

export const useAssetSelection = ({
    setAssets,
    paginatedAssets,
}: UseAssetSelectionProps) => {
    const [selectedAssetIds, setSelectedAssetIds] = useState<string[]>([]);
    const [isStatusDialogOpen, setIsStatusDialogOpen] = useState<boolean>(false);
    const [bulkStatus, setBulkStatus] = useState(DEFAULT_ASSET_STATUS);
    const [deleteSuccess, setDeleteSuccess] = useState<boolean>(false);
    const [confirmDialogOpen, setConfirmDialogOpen] = useState<boolean>(false);
    const [informationDialogOpen, setInformationDialogOpen] = useState<boolean>(false);
    const [informationBulkDialogOpen, setInformationBulkDialogOpen] = useState<boolean>(false);

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

        if (currentPageIds.length === 0) {
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

    const handleDelete = async (id: string) => {
        try {
            const res = await fetch(`/api/assets/${id}`, {
                method: "DELETE",
            });
            if (res.ok) {
                const data = await GetAssets();
                setAssets(data);

                setDeleteSuccess(true);
                setInformationDialogOpen(true);
            }
            else {
                console.log(res.status)
            }
        }
        catch (err) {
            console.error("API error", err);
        }
    }

    const handleDeleteInformationDialogClose = () => {
        setInformationDialogOpen(false);
        setDeleteSuccess(false);
    };

    const handleDeleteDialogClose = () => {
        setConfirmDialogOpen(false);
    }

    const handleBulkDelete = async () => {
        try {
            setConfirmDialogOpen(false);
            const res = await fetch("/api/assets/bulk", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ ids: selectedAssetIds }),
            });

            if (res.ok) {
                const data = await GetAssets();
                setAssets(data);

                setDeleteSuccess(true);
                setInformationBulkDialogOpen(true);
            }
        }
        catch (err) {
            console.error("API error", err);
        }
    };

    const handleBulkDeleteConfirmDialogClose = () => {
        setConfirmDialogOpen(false);
    };

    const handleBulkDeleteInformationDialogClose = () => {
        setInformationBulkDialogOpen(false);
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

    const handleBulkStatusChange = async () => {
        try {
            if (selectedAssetIds.length === 0) {
                return;
            };
            const res = await fetch("/api/assets/bulk", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ ids: selectedAssetIds, status: bulkStatus }),
            });

            if (res.ok) {
                const data = await GetAssets();
                setAssets(data);
            }
            setSelectedAssetIds([]);
            setIsStatusDialogOpen(false);
        }
        catch (err) {
            console.error("API error", err);
        }
    };

    return {
        selectedAssetIds,
        isStatusDialogOpen,
        bulkStatus,
        setBulkStatus,
        deleteSuccess,
        confirmDialogOpen,
        setConfirmDialogOpen,
        informationDialogOpen,
        setInformationDialogOpen,
        informationBulkDialogOpen,
        setInformationBulkDialogOpen,
        handleSelectAsset,
        handleSelectAll,
        handleDelete,
        handleDeleteInformationDialogClose,
        handleBulkDelete,
        handleDeleteDialogClose,
        handleBulkDeleteInformationDialogClose,
        handleBulkDeleteConfirmDialogClose,
        handleOpenStatusDialog,
        handleCloseStatusDialog,
        handleBulkStatusChange
    };
};
