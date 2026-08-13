import { useNavigate, useParams } from "react-router-dom";

import AssetForm from "./components/AssetForm";
import RoutePath from "../../constants/Routes";
import type { AssetItem, AssetLayoutContext } from "../../types/Asset";
import { useOutletContext } from "react-router-dom";

export const AssetEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const { assets, setAssets } =
        useOutletContext<AssetLayoutContext>();

    const asset = assets.find(
        (item) => item.id === id
    );

    if (!asset) {
        return null;
    }

    const handleSave = (updatedAsset: AssetItem) => {
        setAssets((prev) =>
            prev.map((item) =>
                item.id === updatedAsset.id
                    ? updatedAsset
                    : item
            )
        );

        navigate(RoutePath.assets);
    };

    const handleCancel = () => {
        navigate(RoutePath.assets);
    };

    return (
        <AssetForm
            initialAsset={asset}
            onSave={handleSave}
            onCancel={handleCancel}
        />
    );
};

export default AssetEdit;