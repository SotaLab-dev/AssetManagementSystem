import { useNavigate, useParams } from "react-router-dom";

import AssetForm from "./components/AssetForm";
import RoutePath from "../../constants/Routes";
import type { AssetItem } from "../../types/Asset";
import { useOutletContext } from "react-router-dom";

type AssetLayoutContext = {
    assets: AssetItem[];
    setAssets: React.Dispatch<
        React.SetStateAction<AssetItem[]>
    >;
};

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

    return (
        <AssetForm
            initialAsset={asset}
            onSave={handleSave}
        />
    );
};

export default AssetEdit;