import {
    Card,
    CardContent,
    Stack,
} from "@mui/material";

import AppButton from "../../../components/ui/AppButton";
import AppSelect from "../../../components/ui/AppSelect";
import AppTextField from "../../../components/ui/AppTextField";
import { assetCategoryOptions, assetStatusOptions, DEFAULT_ASSET_STATUS } from "../../../constants/Asset";

const AssetForm = () => {
    return (
        <Card>
            <CardContent>
                <Stack spacing={3}>

                    <AppTextField
                        label="備品名"
                        value=""
                        required
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
                        value=""
                    />

                    <AppTextField
                        label="購入日"
                        value=""
                        type="date"
                    />

                    <AppTextField
                        label="備考"
                        value=""
                        multiline
                        rows={4}
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