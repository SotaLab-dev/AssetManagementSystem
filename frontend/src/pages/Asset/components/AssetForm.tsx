import {
    Card,
    CardContent,
    Stack,
    Typography,
} from "@mui/material";

import AppButton from "../../../components/ui/AppButton";
import AppSelect from "../../../components/ui/AppSelect";
import AppTextField from "../../../components/ui/AppTextField";

const categoryOptions = [
    { value: "PC", label: "PC" },
    { value: "モニター", label: "モニター" },
    { value: "スマートフォン", label: "スマートフォン" },
];

const statusOptions = [
    { value: "利用中", label: "利用中" },
    { value: "貸出中", label: "貸出中" },
    { value: "故障中", label: "故障中" },
];

const AssetForm = () => {
    return (
        <Card>
            <CardContent>
                <Stack spacing={3}>
                    <Typography variant="h5">
                        備品登録
                    </Typography>

                    <AppTextField
                        label="備品名"
                        value=""
                        required
                    />

                    <AppSelect
                        label="カテゴリ"
                        value=""
                        options={categoryOptions}
                    />

                    <AppSelect
                        label="状態"
                        value="利用中"
                        options={statusOptions}
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