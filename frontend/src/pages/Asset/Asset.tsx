import { useOutletContext } from "react-router-dom";
import type { AssetSearchCondition } from "../../types/Asset";

import { Stack } from "@mui/material";

import AssetSearch from "./AssetSearch";
import AssetTable from "./AssetTable";
import AssetToolbar from "./AssetToolbar";
import { type AssetLayoutContext } from "../../types/Asset";

const Asset = () => {
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

    };

    const handleReset = () => {
        const emptyCondition: AssetSearchCondition = {
            assetName: "",
            category: "",
            status: "",
        };
        setSearchCondition(emptyCondition);
        setAppliedSearchCondition(emptyCondition);
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

    return (
        <Stack spacing={3}>
            <AssetToolbar />

            <AssetSearch
                onSearch={handleSearch}
                onReset={handleReset}
            />

            <AssetTable
                assets={filteredAssets}
                onDelete={handleDelete}
            />
        </Stack>
    );
};

export default Asset;