import { useNavigate } from "react-router-dom";
import RoutePath from "../../constants/Routes";
import AccountForm from "./components/AccountForm";
import api from "../../services/api/axios";
import useAccountForm from "./hooks/useAccountForm";
import usePasswordVisibility from "./hooks/usePasswordVisibility";

const AccountCreate = () => {
    const {
        userId,
        setUserId,
        accountName,
        setAccountName,
        password,
        setPassword,
        passwordReinput,
        setPasswordReinput,
    } = useAccountForm();

    const {
        showPassword,
        showPasswordReinput,
        togglePasswordVisibility,
        togglePasswordReinputVisibility
    } = usePasswordVisibility();

    const navigate = useNavigate();

    const handleCancel = () => {
        navigate(RoutePath.accountManage);
    }

    const handleAccountCreate = async () => {
        try {
            if (!userId.trim() || userId.length > 20) {
                return;
            }

            if (!accountName.trim() || accountName.length > 20) {
                return;
            }

            if (password !== passwordReinput) {
                return;
            }

            if (!password.trim() || password.length < 8 || password.length > 64) {
                return;
            }

            const request = {
                UserId: userId,
                AccountName: accountName,
                Password: password
            }

            const res = await api.post("/auth/create", request);
            if (res.status !== 201) {
                // TODO エラーメッセージの表示方法は要検討
                return;
            }
            navigate(RoutePath.login);
        }
        catch (error) {
            console.log("API Error");
        }
    }


    return (
        <AccountForm
            mode="CREATE"
            title="アカウント登録"
            onSubmitButtonName="登録"
            accountCreate = {{
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
                onTogglePassword: togglePasswordVisibility,
                onTogglePasswordReinput: togglePasswordReinputVisibility,
                onCancel: handleCancel,
                onCreate: handleAccountCreate
            }}
        />
    );
};

export default AccountCreate;