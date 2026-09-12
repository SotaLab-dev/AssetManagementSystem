import {
    Card,
    CardContent,
    Stack,
} from "@mui/material";

import AppButton from "../../../components/ui/AppButton";
import AppSelect from "../../../components/ui/AppSelect";
import AppTextField from "../../../components/ui/AppTextField";
import { assetCategoryOptions, assetStatusOptions, DEFAULT_ASSET_STATUS } from "../../../constants/Asset";
import { useState } from "react";
import { maxLength, required, validateForm } from "../../../utils/validation";
import { Messages } from "../../../constants/Messages";
import { MaxValue } from "../../../constants/MaxValue";
import type { AssetItem } from "../../../types/Asset";
import RoutePath from "../../../constants/Routes";

import { useNavigate } from "react-router-dom";
import { AssetMode } from "../../../types/AssetMode";

type AssetFormProps = {
    initialAsset?: AssetItem;
    mode: AssetMode,
    onSave: (asset: AssetItem) => void;
    onCancel: () => void;
};


const AssetForm = ({ initialAsset, mode, onCancel }: AssetFormProps) => {
    const navigate = useNavigate();

    const [id] = useState<string>(initialAsset?.id ?? "");
    const [assetName, setAssetName] = useState<string>(initialAsset?.assetName ?? "");
    const [managementNumber] = useState<string>(initialAsset?.managementNumber ?? "");
    const [assetCategory, setAssetCategory] = useState<string>(initialAsset?.category ?? "");
    const [assetStatus, setAssetStatus] = useState<string>(initialAsset?.status ?? DEFAULT_ASSET_STATUS);
    const [purchaseDate, setPurchaseDate] = useState<string | null>(initialAsset?.purchaseDate ?? null);
    const [remarks, setRemarks] = useState<string>(initialAsset?.remarks ?? "");
    const [errors, setErrors] = useState<Record<string, string[]>>({});


    const handleSave = async () => {
        const validation = validateForm([
            {
                key: "assetName",
                value: assetName,
                validators: [
                    (v) => required(v, Messages.assetName.requiredMessage),
                    (v) => maxLength(v, MaxValue.assetName.maxValue, Messages.assetName.maxLengthMessage),
                ],
            },
            {
                key: "assetCategory",
                value: assetCategory,
                validators: [
                    (v) => required(v, Messages.assetCategory.requiredMessage),
                ],
            },
            {
                key: "remarks",
                value: remarks,
                validators: [
                    (v) => maxLength(v, MaxValue.remarks.maxValue, Messages.remarks.maxLengthMessage)
                ]
            }

            // 項目が増えてもここに追加するだけ
        ]);

        setErrors(validation);

        if (Object.keys(validation).length > 0) {
            return; // エラーがあるの で保存しない
        }

        const request = {
            assetName: assetName,
            category: assetCategory,
            status: assetStatus,
            purchaseDate: purchaseDate, // "2024-01-01"
            remarks: remarks
        };

        try {
            if (mode == AssetMode.CREATE) {
                const res = await fetch("/api/assets", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(request)
                })
                console.log("status:", res.status)


                if (res.status == 201) {
                    navigate(RoutePath.assets)
                } else {
                    console.log(res.status)
                }
            }
            else if (mode == AssetMode.EDIT) {
                const res = await fetch(`/api/assets/${id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(request)
                })

                if (res.ok) {
                    navigate(RoutePath.assets)
                }else{
                    console.log(res.status)
                }
            }
        }
        catch (e) {
            console.error("fetch error", e)
        }
    };

    return (
        <Card>
            <CardContent>
                <Stack spacing={3}>

                    <AppTextField
                        label="備品名"
                        value={assetName}
                        error={!!errors.assetName}
                        helperText={errors.assetName}
                        slotProps={{
                            htmlInput: {
                                maxLength: MaxValue.assetName.maxValue,
                            },
                        }}
                        onChange={(event) => {
                            setAssetName(event.target.value);
                        }}
                    />

                    <AppSelect
                        label="カテゴリ"
                        value={assetCategory}
                        error={!!errors.assetCategory}
                        helperText={errors.assetCategory}
                        options={assetCategoryOptions}
                        onChange={(event) => {
                            setAssetCategory(event.target.value);
                        }}
                    />

                    <AppSelect
                        label="状態"
                        value={assetStatus}
                        options={assetStatusOptions}
                        onChange={(event) => {
                            setAssetStatus(event.target.value);
                        }}
                    />

                    {mode == AssetMode.EDIT && (
                        <AppTextField
                            label="管理番号"
                            value={managementNumber}
                            disabled
                            error={!!errors.managementNumber}
                            helperText={errors.managementNumber}
                            slotProps={{
                                htmlInput: {
                                    maxLength: MaxValue.managementNumber.maxValue,
                                },
                            }}
                        />
                    )}

                    <AppTextField
                        label="購入日"
                        type="date"
                        value={purchaseDate ?? ""}
                        onChange={(event) => {
                            setPurchaseDate(
                                event.target.value === ""
                                    ? null
                                    : event.target.value
                            );
                        }}
                    />

                    <AppTextField
                        label="備考"
                        value={remarks}
                        error={!!errors.remarks}
                        helperText={errors.remarks}
                        slotProps={{
                            htmlInput: {
                                maxLength: MaxValue.remarks.maxValue,
                            },
                        }}
                        onChange={(event) => {
                            setRemarks(event.target.value);
                        }}
                    />

                    <Stack
                        direction="row"
                        spacing={2}
                        sx={{
                            justifyContent: "flex-end"
                        }}

                    >
                        <AppButton
                            variant="contained"
                            onClick={handleSave}
                        >
                            保存
                        </AppButton>

                        <AppButton
                            variant="outlined"
                            onClick={onCancel}
                        >
                            キャンセル
                        </AppButton>
                    </Stack>
                </Stack>
            </CardContent>
        </Card>
    );
};

export default AssetForm;