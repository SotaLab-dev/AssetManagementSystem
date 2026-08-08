import { useOutletContext } from "react-router-dom";
import type { AssetItem } from "../../types/Asset";

import { Stack } from "@mui/material";

import AssetSearch from "./AssetSearch";
import AssetTable from "./AssetTable";
import AssetToolbar from "./AssetToolbar";

const Asset = () => {
    const { assets } = useOutletContext<{
    assets: AssetItem[];
    setAssets: React.Dispatch<React.SetStateAction<AssetItem[]>>;
}>();
    return (
    <Stack spacing={3}>
        <AssetToolbar />

        <AssetSearch />

        <AssetTable assets={assets} />
    </Stack>
    );
};

export default Asset;