import { useState } from "react";
import { Outlet } from "react-router-dom";

import { assets as initialAssets } from "../../mocks/assets";
import type { AssetItem } from "../../types/Asset";

const AssetLayout = () => {
    const [assets, setAssets] = useState<AssetItem[]>(initialAssets);

    return (
        <Outlet
            context={{
                assets,
                setAssets,
            }}
        />
    );
};

export default AssetLayout;