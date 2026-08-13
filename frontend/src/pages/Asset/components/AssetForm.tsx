import {
    Card,
    CardContent,
    Stack,
} from "@mui/material";

import AppButton from "../../../components/ui/AppButton";
import AppSelect from "../../../components/ui/AppSelect";
import AppTextField from "../../../components/ui/AppTextField";
import { assetCategoryOptions, assetStatusOptions, DEFAULT_ASSET_STATUS, MAX_ASSET_NAME_LENGTH, MAX_MANAGEMENT_NO_LENGTH, MAX_REMARKS_LENGTH } from "../../../constants/Asset";
import { useState } from "react";
import { maxLength, required, validateForm } from "../../../utils/validation";
import { Messages } from "../../../constants/Messages";
import { MaxValue } from "../../../constants/MaxValue";
import type { AssetItem } from "../../../types/Asset";

type AssetFormProps = {
    initialAsset?: AssetItem;
    onSave: (asset: AssetItem) => void;
};


const AssetForm = ({ initialAsset, onSave }: AssetFormProps) => {
    const [assetName, setAssetName] = useState<string>(initialAsset?.assetName ?? "");
    const [managementNumber, setManagementNumber] = useState<string>(initialAsset?.managementNumber ?? "");
    const [assetCategory, setAssetCategory] = useState<string>(initialAsset?.category ?? "");
    const [assetStatus, setAssetStatus] = useState<string>(initialAsset?.status ?? DEFAULT_ASSET_STATUS);
    const [purchaseDate, setPurchaseDate] = useState<Date | null>(initialAsset?.purchaseDate ?? null);
    const [remarks, setRemarks] = useState<string>(initialAsset?.remarks ?? "");
    const [errors, setErrors] = useState<Record<string, string[]>>({});

    const handleSave = () => {
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
              value:  assetCategory ,
              validators: [
                (v) => required(v, Messages.assetCategory.requiredMessage),
              ],
            },
            {
                key: "managementNumber",
                value: managementNumber,
                validators: [
                    (v) => required(v, Messages.managementNumber.requiredMessage),
                    (v) => maxLength(v, MaxValue.managementNumber.maxValue, Messages.managementNumber.maxLengthMessage),
                ],
            },

            // 項目が増えてもここに追加するだけ
        ]);

        setErrors(validation);

        if (Object.keys(validation).length > 0) {
            return; // エラーがあるの で保存しない
        }

        // 保存処理
        const newAsset: AssetItem = {
            id: initialAsset?.id ?? crypto.randomUUID(),
            assetName,
            category: assetCategory,
            status: assetStatus,
            managementNumber,
            purchaseDate,
            remarks,
        };

        onSave(newAsset);
    };

    return (
        <Card>
            <CardContent>
                <Stack spacing={3}>

                    <AppTextField
                        label="備品名"
                        value={assetName}
                        required
                        error={!!errors.assetName}
                        helperText={errors.assetName}
                        slotProps={{
                            htmlInput: {
                                maxLength: MAX_ASSET_NAME_LENGTH,
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

                    <AppTextField
                        label="管理番号"
                        value={managementNumber}
                        error={!!errors.managementNumber}
                        helperText={errors.managementNumber}
                        slotProps={{
                            htmlInput: {
                                maxLength: MAX_MANAGEMENT_NO_LENGTH,
                            },
                        }}
                        onChange={(event) => {
                            setManagementNumber(event.target.value);
                        }}
                    />

                    <AppTextField
                        label="購入日"
                        type="date"
                        value={purchaseDate ? purchaseDate.toISOString().split('T')[0] : ""}
                        onChange={(event) => {
                            setPurchaseDate(event.target.value ? new Date(event.target.value) : null);
                        }}
                    />

                    <AppTextField
                        label="備考"
                        value={remarks}
                        slotProps={{
                            htmlInput: {
                                maxLength: MAX_REMARKS_LENGTH,
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