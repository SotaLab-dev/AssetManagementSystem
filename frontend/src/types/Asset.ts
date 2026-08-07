export type AssetItem = {
    id: number;
    assetName: string;
    category: string;
    status: "利用中" | "貸出中" | "故障中";
};