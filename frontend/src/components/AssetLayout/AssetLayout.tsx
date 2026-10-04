import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

import type { AssetItem, AssetSearchCondition } from "../../types/Asset";
import { AssetMode } from "../../types/AssetMode";
import api from "../../services/api/axios";

export const GetAssets = async () => {
    try {
        const res = await api.get("/assets");

        if (res.status !== 200) {
            throw new Error("API request failed");
        }
        
        return res.data;
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