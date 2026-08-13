import { useOutletContext } from "react-router-dom";

import type {
    AssetLayoutContext,
    AssetSearchCondition
} from "../../../types/Asset";

export const useAssetSearch = () => {
    const {
        assets,
        searchCondition,
        setSearchCondition,
        appliedSearchCondition,
        setAppliedSearchCondition,
    } = useOutletContext<AssetLayoutContext>();

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
    };

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
    });


    return {
        filteredAssets,
        handleSearch,
        handleReset,
    }
}