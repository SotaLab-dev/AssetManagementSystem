export type AssetItem = {
    id: string;
    assetName: string;
    category: string;
    status: string;
    managementNumber: string;
    purchaseDate: string | null;
    remarks: string;
};

export type AssetSearchCondition = {
    assetName: string;
    category: string;
    status: string;
}

export type AssetLayoutContext = {
    assets: AssetItem[];

    setAssets: React.Dispatch<
        React.SetStateAction<AssetItem[]>
    >;

    searchCondition: AssetSearchCondition;

    setSearchCondition: React.Dispatch<
        React.SetStateAction<AssetSearchCondition>
    >;

    appliedSearchCondition: AssetSearchCondition;

    setAppliedSearchCondition: React.Dispatch<
        React.SetStateAction<AssetSearchCondition>
    >;
};
