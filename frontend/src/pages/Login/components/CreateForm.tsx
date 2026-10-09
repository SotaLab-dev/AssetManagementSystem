import { Visibility, VisibilityOff } from "@mui/icons-material";
import AppButton from "../../../components/ui/AppButton";
import AppTextField from "../../../components/ui/AppTextField";
import { Box, IconButton, InputAdornment, Paper, Stack, Typography } from "@mui/material";
import type { AccountCreateProps } from "../../../types/AccountForm";

const CreateForm = ({
    userId,
    setUserId,
    accountName,
    setAccountName,
    password,
    setPassword,
    passwordReinput,
    setPasswordReinput,
    showPassword,
    showPasswordReinput,
    onTogglePassword,
    onTogglePasswordReinput,
    onCancel,
    onCreate,
    title,
    onSubmitButtonName
}: AccountCreateProps & { title: string, onSubmitButtonName: string }) => {
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
                        onChange={(event) =>
                            setUserId(event.target.value)
                        }
                    />
                    <AppTextField
                        label="アカウント名"
                        value={accountName}
                        onChange={(event) =>
                            setAccountName(event.target.value)
                        }
                    />
                    <AppTextField
                        label="パスワード"
                        type={showPassword ? "text" : "password"}
                        onChange={(event) => setPassword(event.target.value)}
                        placeholder="パスワード"
                        value={password}
                        autoComplete="off"
                        slotProps={{
                            input: {
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={onTogglePassword}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            },
                        }}
                    />
                    <AppTextField
                        label="パスワード再入力"
                        type={showPasswordReinput ? "text" : "password"}
                        onChange={(event) => setPasswordReinput(event.target.value)}
                        placeholder="パスワード再入力"
                        value={passwordReinput}
                        autoComplete="off" // ブラウザのオートコンプリート機能を無効化
                        slotProps={{
                            input: {
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={onTogglePasswordReinput}
                                            edge="end"
                                        >
                                            {showPasswordReinput ? <VisibilityOff /> : <Visibility />}
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
                    {/*
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={rememberMe}
                                    onChange={(event) =>
                                        setRememberMe(event.target.checked)
                                    }
                                />
                            }
                            label="ログイン状態を保持"
                        />
                    */}
                    <AppButton
                        fullWidth
                        onClick={onCreate}
                    >
                        {onSubmitButtonName}
                    </AppButton>
                </Stack>
            </Paper >
        </Box>
    )
}

export default CreateForm;