import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

import type { AssetItem, AssetSearchCondition } from "../../types/Asset";

const AssetLayout = () => {

    const GetAssets = async () => {
        try {
            const res = await fetch("/api/assets");
            const data : AssetItem[] = await res.json();

            if (!res.ok) {
                throw new Error("API request failed");
            }
            return data;
        }
        catch (err) {
            console.error("API error", err);
            return [];
        }
    }

    const [assets, setAssets] = useState<AssetItem[]>([]);

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

        useEffect(() => {
        const fetchAssets = async () => {
            const data = await GetAssets();
            setAssets(data);
        }
        
        fetchAssets();
    },[])

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