import { useState } from "react";
import { Outlet } from "react-router-dom";

import { assets as initialAssets } from "../../mocks/assets";
import type { AssetItem, AssetSearchCondition } from "../../types/Asset";

const AssetLayout = () => {
    const [assets, setAssets] = useState<AssetItem[]>(initialAssets);
    const [searchCondition, setSearchCondition] = useState<AssetSearchCondition>({
        assetName: "",
        category: "",
        status: "",
    });
    const [appliedSearchCondition, setAppliedSearchCondition] = useState<AssetSearchCondition>({
        assetName: "",
        category: "",
        status: "",
    });

    return (
        <Outlet
            context={{
                assets,
                setAssets,
                searchCondition,
                setSearchCondition,
                appliedSearchCondition,
                setAppliedSearchCondition,
            }}
        />
    );
};

export default AssetLayout;