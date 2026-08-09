import { useOutletContext } from "react-router-dom";
import type { AssetItem } from "../../types/Asset";

import { Stack } from "@mui/material";

import AssetSearch from "./AssetSearch";
import AssetTable from "./AssetTable";
import AssetToolbar from "./AssetToolbar";

type AssetLayoutContext = {
    assets: AssetItem[];
    setAssets: React.Dispatch<React.SetStateAction<AssetItem[]>>;
};

const Asset = () => {
    const { assets, setAssets } = useOutletContext<AssetLayoutContext>();

    const handleDelete = (id: string) => {
        const confirmed = window.confirm(
            "この備品を本当に削除しますか？"
        );
        if(!confirmed){
            return;
        }

        setAssets((prev) => prev.filter((asset) => asset.id !== id)
        );
    };

    return (
        <Stack spacing={3}>
            <AssetToolbar />

            <AssetSearch />

            <AssetTable
                assets={assets}
                onDelete={handleDelete} 
            />
        </Stack>
    );
};

export default Asset;