import type { AssetItem } from "../types/Asset";

export const assets: AssetItem[] = [
    {
        id: "1",
        assetName: "ノートPC",
        category: "PC",
        status: "利用中",
        managementNumber: "MAN001",
        purchaseDate: new Date("2023-01-01"),
        remarks: "備品登録用"
    },
    {
        id: "2",
        assetName: "モニター",
        category: "ディスプレイ",
        status: "貸出中",
        managementNumber: "MAN002",
        purchaseDate: new Date("2023-02-01"),
        remarks: "備品登録用"
    },
    {
        id: "3",
        assetName: "マウス",
        category: "周辺機器",
        status: "故障中",
        managementNumber: "MAN003",
        purchaseDate: new Date("2023-03-01"),
        remarks: "備品登録用"
    },
];