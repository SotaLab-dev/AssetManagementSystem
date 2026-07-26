import type { SelectOption } from "../components/ui/AppSelect";

export const categoryOptions: SelectOption[] = [
    {
        value: "",
        label: "すべて",
    },
    {
        value: "PC",
        label: "PC",
    },
    {
        value: "Display",
        label: "ディスプレイ",
    },
    {
        value: "Accessory",
        label: "周辺機器",
    },
];

export const statusOptions: SelectOption[] = [
    {
        value: "",
        label: "すべて",
    },
    {
        value: "Available",
        label: "利用中",
    },
    {
        value: "Lending",
        label: "貸出中",
    },
    {
        value: "Broken",
        label: "故障中",
    },
];