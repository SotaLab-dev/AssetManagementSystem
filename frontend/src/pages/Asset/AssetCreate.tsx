import { useNavigate, useOutletContext } from "react-router-dom";

import AssetForm from "./components/AssetForm";
import type { AssetItem } from "../../types/Asset";

import RoutePath from "../../constants/Routes";

type AssetLayoutContext = {
    assets: AssetItem[];
    setAssets: React.Dispatch<React.SetStateAction<AssetItem[]>>;
};

const AssetCreate = () => {
    const navigate = useNavigate();

    const { setAssets } =
        useOutletContext<AssetLayoutContext>();

    const handleSave = (newAsset: AssetItem) => {
        setAssets((prev) => [...prev, newAsset]);

        navigate(RoutePath.assets);
    };

    return (
        <AssetForm onSave={handleSave} />
    );
};

export default AssetCreate;