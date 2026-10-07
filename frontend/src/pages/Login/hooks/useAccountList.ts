import { useState } from "react";
import type { AccountInfo } from "../../../types/User";
import { mockAccountList } from "../../../mocks/accounts";
import Routes from "../../../constants/Routes";
import { useNavigate } from "react-router-dom";
import api from "../../../services/api/axios";

export const useAccountList = () => {
    const navigate = useNavigate();
    const [accounts, setAccounts] = useState<AccountInfo[]>(mockAccountList);
    const [selectedAccount, setSelectedAccount] = useState<string | null>(null);
    const [userId, setUserId] = useState<string>("");
    const [accountName, setAccountName] = useState("");
    const [password, setPassword] = useState("");
    const [passwordReinput, setPasswordReinput] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [newPasswordReinput, setNewPasswordReinput] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showPasswordReinput, setShowPasswordReinput] = useState<boolean>(false);
    const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
    const [showNewPasswordReinput, setShowNewPasswordReinput] = useState<boolean>(false);
    // const [rememberMe, setRememberMe] = useState(false);

    const handleLogin = async () => {
        try {
            if(!userId.trim() || userId.length > 20){
                return;
            }

            if(!accountName.trim() || accountName.length > 20){
                return;
            }

            if(!password.trim() || password.length < 8 || password.length > 64){
                return;
            }

            const request = {
                UserId: userId,
                AccountName: accountName,
                Password: password
            }
            const res = await api.post("/auth/login", request);
            if (res.status !== 200) {
                // TODO エラーメッセージの表示方法は要検討
                return;
            }

            navigate(Routes.dashboard);
        }
        catch (error) {
            console.log("API Error");
        }
    };

    const handleAccountDelete = (accountName: string): void => {
        setAccounts(prev =>
            prev.filter(account => account.name !== accountName)
        );
    };

    const handleSelectAccount = (accountName: string) => {
        setSelectedAccount((prev) =>
            prev === accountName ? null : accountName
        );
    };

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    const togglePasswordReinputVisibility = () => {
        setShowPasswordReinput((prev) => !prev);
    };

    const toggleNewPasswordVisibility = () => {
        setShowNewPassword((prev) => !prev);
    };

    const toggleNewPasswordReinputVisibility = () => {
        setShowNewPasswordReinput((prev) => !prev);
    };

    return {
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
        setCurrentPassword,
        showPassword,
        showPasswordReinput,
        showNewPassword,
        showNewPasswordReinput,
        // rememberMe,
        // setRememberMe,
        accounts,
        setAccounts,
        selectedAccount,
        handleLogin,
        handleAccountDelete,
        handleSelectAccount,
        togglePasswordVisibility,
        togglePasswordReinputVisibility,
        toggleNewPasswordVisibility,
        toggleNewPasswordReinputVisibility
    }
}
