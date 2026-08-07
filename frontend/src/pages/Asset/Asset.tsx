import { Stack } from "@mui/material";

import AssetSearch from "./AssetSearch";
import AssetTable from "./AssetTable";
import AssetToolbar from "./AssetToolbar";
import { assets as initialAssets } from "../../mocks/assets";
import { useState } from "react";
import type { AssetItem } from "../../types/Asset";

const Asset = () => {
    const [assets] = useState<AssetItem[]>(initialAssets);
    return (
    <Stack spacing={3}>
        <AssetToolbar />

        <AssetSearch />

        <AssetTable assets={assets} />
    </Stack>
    );
};

export default Asset;