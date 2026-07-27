import type { SelectOption } from "../components/ui/AppSelect";

export const assetCategoryOptions: SelectOption[] = [
    {
        value: "PC",
        label: "PC",
    },
    {
        value: "モニター",
        label: "モニター",
    },
    {
        value: "スマートフォン",
        label: "スマートフォン",
    },
];

export const assetStatusOptions: SelectOption[] = [
    {
        value: "利用中",
        label: "利用中",
    },
    {
        value: "貸出中",
        label: "貸出中",
    },
    {
        value: "故障中",
        label: "故障中",
    },
];

export const assetCategorySearchOptions: SelectOption[] = [
    {
        value: "",
        label: "すべて",
    },
    ...assetCategoryOptions,
];

export const assetStatusSearchOptions: SelectOption[] = [
    {
        value: "",
        label: "すべて",
    },
    ...assetStatusOptions,
];

export const MAX_ASSET_NAME_LENGTH = 100;

export const MAX_MANAGEMENT_NO_LENGTH = 50;

export const MAX_REMARKS_LENGTH = 500;

export const DEFAULT_ASSET_STATUS = assetStatusOptions[0].value;