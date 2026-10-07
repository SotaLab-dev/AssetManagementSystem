import {
    Box,
    IconButton,
    InputAdornment,
    Paper,
    Stack,
    Typography,
} from "@mui/material";

import { VisibilityOff, Visibility } from "@mui/icons-material"

import AppButton from "../../../components/ui/AppButton";
import AppTextField from "../../../components/ui/AppTextField";
import { AccountMode } from "../../../types/AccountMode"
import type { AccountInfo } from "../../../types/User";

type AccountFormProps = {
    mode: AccountMode;
    title: string;
    accounts?: AccountInfo;
    onSubmitButtonName: string;
    userId?: string,
    setUserId?: (userId: string) => void,
    accountName: string;
    setAccountName: (name: string) => void;
    password: string;
    setPassword: (password: string) => void;
    showPassword: boolean;
    passwordReinput?: string;
    setPasswordReinput?: (password: string) => void;
    newPassword?: string;
    setNewPassword?: (password: string) => void;
    newPasswordReinput?: string;
    setNewPasswordReinput?: (password: string) => void;
    currentPassword?: string;
    showPasswordReinput?: boolean;
    showNewPassword?: boolean;
    showNewPasswordReinput?: boolean;
    showCurrentPassword?: boolean;
    // rememberMe: boolean;
    // setRememberMe: (remember: boolean) => void;
    onCancel?: () => void;
    onSubmit: () => void;
    onTogglePassword?: () => void;
    onTogglePasswordReinput?: () => void;
    onToggleNewPassword?: () => void;
    onToggleNewPasswordReinput?: () => void;
    togglePasswordVisibility?: () => void;
    togglePasswordReinputVisibility?: () => void;
    toggleNewPasswordVisibility?: () => void;
    toggleNewPasswordReinputVisibility?: () => void;
}
const AccountForm = ({
    mode,
    title,
    onSubmitButtonName,
    userId,
    setUserId,
    accountName,
    setAccountName,
    password,
    setPassword,
    passwordReinput,
    setPasswordReinput,
    newPassword,
    setNewPassword,
    newPasswordReinput,
    setNewPasswordReinput,
    currentPassword,
    showPassword,
    showPasswordReinput,
    showNewPassword,
    showNewPasswordReinput,
    // rememberMe,
    // setRememberMe,
    onCancel,
    onSubmit,
    onTogglePassword,
    onTogglePasswordReinput,
    onToggleNewPassword,
    onToggleNewPasswordReinput,
}: AccountFormProps) => {
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
                            setUserId?.(event.target.value)
                        }
                    />
                    <AppTextField
                        label="アカウント名"
                        value={accountName}
                        onChange={(event) =>
                            setAccountName(event.target.value)
                        }
                    />

                    {mode === AccountMode.CREATE && (
                        <>
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
                                onChange={(event) => setPasswordReinput?.(event.target.value)}
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
                        </>
                    )}

                    {mode === AccountMode.EDIT && (
                        <>
                            <AppTextField
                                label="現在のパスワード"
                                type={"password"}
                                disabled
                                placeholder="現在のパスワード"
                                value={currentPassword}
                                autoComplete="off" // ブラウザのオートコンプリート機能を無効化
                            />
                            <AppTextField
                                label="新しいパスワード"
                                type={showNewPassword ? "text" : "password"}
                                onChange={(event) => setNewPassword?.(event.target.value)}
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
                                onChange={(event) => setNewPasswordReinput?.(event.target.value)}
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

                        </>
                    )}

                    {mode === AccountMode.LOGIN && (
                        <>
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "row",
                                }}
                            >
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

                            </Box>
                        </>

                    )}

                    {mode !== AccountMode.LOGIN && (
                        <AppButton
                            fullWidth
                            onClick={onCancel}
                        >
                            キャンセル
                        </AppButton>
                    )}

                    {/* {mode === AccountMode.LOGIN && (
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
                    )} */}

                    <AppButton
                        fullWidth
                        onClick={onSubmit}
                    >
                        {onSubmitButtonName}
                    </AppButton>
                </Stack>
            </Paper >
        </Box >
    );
};

export default AccountForm;

