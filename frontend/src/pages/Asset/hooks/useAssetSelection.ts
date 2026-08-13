import { useState } from "react";

import { DEFAULT_ASSET_STATUS } from "../../../constants/Asset";
import type { AssetItem } from "../../../types/Asset";

type UseAssetSelectionProps = {
    assets: AssetItem[];
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
                (selectedId) => selectedId !== id),
        );
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
        handleBulkStatusChange
    };
};
