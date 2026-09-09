import { useNavigate, useOutletContext } from "react-router-dom";

import AssetForm from "./components/AssetForm";
import type { AssetItem, AssetLayoutContext } from "../../types/Asset";

import RoutePath from "../../constants/Routes";
import { AssetMode } from "../../types/AssetMode";


const AssetCreate = () => {
    const navigate = useNavigate();

    const { setAssets } =
        useOutletContext<AssetLayoutContext>();

    const handleSave = (newAsset: AssetItem) => {
        setAssets((prev) => [...prev, newAsset]);

        navigate(RoutePath.assets);
    };

    const handleCancel = () => {
        navigate(RoutePath.assets);
    };

    return (
        <AssetForm
            mode={AssetMode.CREATE}
            onSave={handleSave}
            onCancel={handleCancel} />
    );
};

export default AssetCreate;