import { Box, IconButton, InputAdornment, Paper, Stack, Typography } from "@mui/material";
import AppTextField from "../../../components/ui/AppTextField";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import AppButton from "../../../components/ui/AppButton";
import type { AccountEditProps } from "../../../types/AccountForm";


const EditForm = ({
    userId,
    accountName,
    setAccountName,
    currentPassword,
    setCurrentPassword,
    newPassword,
    setNewPassword,
    newPasswordReinput,
    setNewPasswordReinput,
    showCurrentPassword,
    showNewPassword,
    showNewPasswordReinput,
    onToggleCurrentPassword,
    onToggleNewPassword,
    onToggleNewPasswordReinput,
    onCancel,
    onUpdate,
    title,
    onSubmitButtonName
}: AccountEditProps & { title: string, onSubmitButtonName: string }) => {
    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "background.default",
            }}
        >
            <Paper
                sx={{
                    width: 500,
                    p: 5,
                }}
            >
                <Stack spacing={3}>
                    <Typography
                        variant="h6"
                        align="center"
                    >
                        {title}
                    </Typography>

                    <AppTextField
                        label="ユーザーID"
                        value={userId}
                        disabled
                    />
                    <AppTextField
                        label="アカウント名"
                        value={accountName}
                        onChange={(event) =>
                            setAccountName(event.target.value)
                        }
                    />
                    <AppTextField
                        label="現在のパスワード"
                        type={showCurrentPassword ? "text" : "password"}
                        placeholder="現在のパスワード"
                        value={currentPassword}
                        onChange={(event) => setCurrentPassword(event.target.value)}
                        autoComplete="off" // ブラウザのオートコンプリート機能を無効化
                        slotProps={{
                            input: {
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={onToggleCurrentPassword}
                                            edge="end"
                                        >
                                            {showCurrentPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }
                        }}
                    />
                    <AppTextField
                        label="新しいパスワード"
                        type={showNewPassword ? "text" : "password"}
                        onChange={(event) => setNewPassword(event.target.value)}
                        placeholder="新しいパスワード"
                        value={newPassword}
                        autoComplete="off" // ブラウザのオートコンプリート機能を無効化
                        slotProps={{
                            input: {
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={onToggleNewPassword}
                                            edge="end"
                                        >
                                            {showNewPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            },
                        }}
                    />
                    <AppTextField
                        label="新しいパスワード確認用"
                        type={showNewPasswordReinput ? "text" : "password"}
                        onChange={(event) => setNewPasswordReinput(event.target.value)}
                        placeholder="新しいパスワード確認用"
                        value={newPasswordReinput}
                        autoComplete="off" // ブラウザのオートコンプリート機能を無効化
                        slotProps={{
                            input: {
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={onToggleNewPasswordReinput}
                                            edge="end"
                                        >
                                            {showNewPasswordReinput ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            },
                        }}
                    />
                    <AppButton
                        fullWidth
                        onClick={onCancel}
                    >
                        キャンセル
                    </AppButton>
                    <AppButton
                        fullWidth
                        onClick={onUpdate}
                    >
                        {onSubmitButtonName}
                    </AppButton>
                </Stack>
            </Paper>
        </Box>
    )
}

export default EditForm;