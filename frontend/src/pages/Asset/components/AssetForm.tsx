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

const AssetForm = () => {
    const [assetName, setAssetName] = useState<string>("");
    const [managementNumber, setManagementNumber] = useState<string>("");
    const [purchaseDate, setPurchaseDate] = useState<Date | null>(null);
    const [remarks, setRemarks] = useState<string>("");
    return (
        <Card>
            <CardContent>
                <Stack spacing={3}>

                    <AppTextField
                        label="備品名"
                        value={assetName}
                        required
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
                        value=""
                        options={assetCategoryOptions}
                    />

                    <AppSelect
                        label="状態"
                        value={DEFAULT_ASSET_STATUS}
                        options={assetStatusOptions}
                    />

                    <AppTextField
                        label="管理番号"
                        value={managementNumber}
                        required
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
                        value={purchaseDate ? purchaseDate.toISOString().split('T')[0] : "" }
                        required
                        onChange={(event) => {
                            setPurchaseDate(event.target.value ? new Date(event.target.value) : null);
                        }}
                    />

                    <AppTextField
                        label="備考"
                        value={remarks}
                        required
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