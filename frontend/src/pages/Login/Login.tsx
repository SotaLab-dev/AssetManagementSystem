import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    Box,
    Checkbox,
    FormControlLabel,
    Paper,
    Stack,
    Typography,
} from "@mui/material";

import AppButton from "../../components/ui/AppButton";
import AppTextField from "../../components/ui/AppTextField";
import Routes from "../../constants/Routes";

const Login = () => {
    const navigate = useNavigate();

    const [accountName, setAccountName] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);

    const handleLogin = () => {
        navigate(Routes.dashboard);
    };

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
                        variant="h4"
                        align="center"
                    >
                        Asset Management System
                    </Typography>

                    <Typography
                        variant="h6"
                        align="center"
                    >
                        ログイン
                    </Typography>

                    <AppTextField
                        label="アカウント名"
                        value={accountName}
                        onChange={(event) =>
                            setAccountName(event.target.value)
                        }
                    />

                    <AppTextField
                        label="パスワード"
                        type="password"
                        value={password}
                        onChange={(event) =>
                            setPassword(event.target.value)
                        }
                    />

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

                    <AppButton
                        fullWidth
                        onClick={handleLogin}
                    >
                        ログイン
                    </AppButton>
                </Stack>
            </Paper>
        </Box>
    );
};

export default Login;