import { Box, IconButton, InputAdornment, Paper, Stack, Typography } from "@mui/material"
import AppButton from "../../../components/ui/AppButton"
import { Visibility, VisibilityOff } from "@mui/icons-material"
import AppTextField from "../../../components/ui/AppTextField"
import type { LoginProps } from "../../../types/AccountForm"

const LoginForm = ({
    userId,
    setUserId,
    accountName,
    setAccountName,
    password,
    setPassword,
    showPassword,
    onTogglePassword,
    onLogin,
    title,
    onSubmitButtonName
    
}: LoginProps & { title: string, onSubmitButtonName: string }) => {
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
                                        <IconButton onClick={onTogglePassword} edge="end">
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            },
                        }}
                    />

                    <AppButton
                        fullWidth
                        onClick={() => onLogin(userId, accountName, password)}
                    >
                        {onSubmitButtonName}
                    </AppButton>
                </Stack>
            </Paper>
        </Box>
    )
}

export default LoginForm;