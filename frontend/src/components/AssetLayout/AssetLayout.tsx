import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

import type { AssetItem, AssetSearchCondition } from "../../types/Asset";
import { AssetMode } from "../../types/AssetMode";

export const GetAssets = async () => {
    try {
        const res = await fetch("/api/assets");

        if (!res.ok) {
            throw new Error("API request failed");
        }

        const data = await res.json();
        
        return data;
    }
    catch (err) {
        console.error("API error", err);
        return [];
    }
};

const AssetLayout = () => {
    const location = useLocation();
    const [assets, setAssets] = useState<AssetItem[]>([]);
    const [mode, setMode] = useState<AssetMode>(AssetMode.CREATE);

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
            const data : AssetItem[] = await GetAssets();
            setAssets(data);
        }

        fetchAssets();
    }, [location.pathname])

    return (
        <Outlet
            context={{
                assets,
                setAssets,
                searchCondition,
                setSearchCondition,
                appliedSearchCondition,
                setAppliedSearchCondition,
                mode,
                setMode
            }}
        />
    );
};

export default AssetLayout;