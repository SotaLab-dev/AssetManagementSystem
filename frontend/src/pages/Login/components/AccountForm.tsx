import { useEffect, useState } from "react";

import {
    Box,
    Checkbox,
    FormControlLabel,
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
    onSubmitButtonName: string
    onCancel?: () => void;
    onSubmit: () => void;
}
const AccountForm = ({ mode, title, accounts, onCancel, onSubmit, onSubmitButtonName }: AccountFormProps) => {
    const [accountName, setAccountName] = useState(accounts?.name ?? "");
    const [password, setPassword] = useState(accounts?.password ?? "");
    const [passwordReinput, setPasswordReinput] = useState("");
    const [, setMaskedPassword] = useState<string>("")
    const [, setMaskedPasswordReinput] = useState<string>("");
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showPasswordReinput, setShowPasswordReinput] = useState<boolean>(false);
    const [rememberMe, setRememberMe] = useState(false);

    // パスワードの表示・非表示を切り替える
    const togglePasswordVisibility = () => {
        if (!showPassword) {
            setMaskedPassword("•".repeat(password.length));
        }
        setShowPassword(!showPassword);
    };

    const togglePasswordReinputVisibility = () => {
        if (!showPasswordReinput) {
            setMaskedPasswordReinput("●".repeat(passwordReinput.length));
        }
        setShowPasswordReinput(!showPasswordReinput);
    }

    useEffect(() => {
        if (accounts) {
            setAccountName(accounts.name);
            setPassword(accounts.password);
            setMaskedPassword("•".repeat(accounts.password.length));
        }
    }, [accounts]);


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
                    width: 420,
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
                                autoComplete="off" // ブラウザのオートコンプリート機能を無効化
                                {...({
                                    InputProps: {
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={togglePasswordVisibility}
                                                    edge="end"
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }
                                }
                                )}
                            />

                            <AppTextField
                                label="パスワード再入力"
                                type={showPassword ? "text" :"password"}
                                onChange={(event) => setPasswordReinput(event.target.value)}
                                placeholder="パスワード再入力"
                                value={passwordReinput}
                                autoComplete="off" // ブラウザのオートコンプリート機能を無効化
                                {...({
                                    InputProps: {
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={togglePasswordReinputVisibility}
                                                    edge="end"
                                                >
                                                    {showPasswordReinput ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }
                                }
                                )}
                            />
                        </>
                    )}

                    {mode === AccountMode.EDIT && (
                        <>
                            <AppTextField
                                label="現在のパスワード"
                                type={showPassword ? "text" : "password"}
                                disabled
                                onChange={(event) => setPassword(event.target.value)}
                                placeholder="パスワード"
                                value={password}
                                autoComplete="off" // ブラウザのオートコンプリート機能を無効化
                                {...({
                                    InputProps: {
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={togglePasswordVisibility}
                                                    edge="end"
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }
                                }
                                )}
                            />

                            <AppTextField
                                label="新しいパスワード"
                                type={showPassword ? "text" : "password"}
                                onChange={(event) => setPasswordReinput(event.target.value)}
                                placeholder="パスワード再入力"
                                value={passwordReinput}
                                autoComplete="off" // ブラウザのオートコンプリート機能を無効化
                                {...({
                                    InputProps: {
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={togglePasswordReinputVisibility}
                                                    edge="end"
                                                >
                                                    {showPasswordReinput ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }
                                }
                                )}
                            />
                            <AppTextField
                                label="新しいパスワード確認用"
                                type={showPassword ? "text" : "password"}
                                onChange={(event) => setPasswordReinput(event.target.value)}
                                placeholder="パスワード再入力"
                                value={passwordReinput}
                                autoComplete="off" // ブラウザのオートコンプリート機能を無効化
                                {...({
                                    InputProps: {
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={togglePasswordReinputVisibility}
                                                    edge="end"
                                                >
                                                    {showPasswordReinput ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }
                                }
                                )}
                            />
                        </>
                    )}

                    {mode === AccountMode.LOGIN && (
                        <AppTextField
                            label="パスワード"
                            type={showPassword ? "text" : "password"}
                            onChange={(event) => setPassword(event.target.value)}
                            placeholder="パスワード"
                            value={password}
                            autoComplete="off" // ブラウザのオートコンプリート機能を無効化
                            {...({
                                InputProps: {
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={togglePasswordVisibility}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }
                            }
                            )}
                        />
                    )}

                    {mode !== AccountMode.LOGIN && (
                        <AppButton
                            fullWidth
                            onClick={onCancel}
                        >
                            キャンセル
                        </AppButton>
                    )}

                    {mode === AccountMode.LOGIN && (
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
                    )}

                    <AppButton
                        fullWidth
                        onClick={onSubmit}
                    >
                        {onSubmitButtonName}
                    </AppButton>
                </Stack>
            </Paper>
        </Box>
    );
};

export default AccountForm;

