import { useNavigate } from "react-router-dom";
import RoutePath from "../../constants/Routes";
import { AccountMode } from "../../types/AccountMode";
import AccountForm from "./components/AccountForm";
import { useAccountList } from "./hooks/useAccountList";
import api from "../../services/api/axios";

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
        showPassword,
        showPasswordReinput,
        togglePasswordVisibility,
        togglePasswordReinputVisibility
    } = useAccountList();

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
            mode={AccountMode.CREATE}
            title="アカウント登録"
            onSubmitButtonName="登録"
            userId={userId}
            setUserId={setUserId}
            accountName={accountName}
            setAccountName={setAccountName}
            password={password}
            setPassword={setPassword}
            passwordReinput={passwordReinput}
            setPasswordReinput={setPasswordReinput}
            showPassword={showPassword}
            showPasswordReinput={showPasswordReinput}
            onTogglePassword={togglePasswordVisibility}
            onTogglePasswordReinput={togglePasswordReinputVisibility}
            onCancel={handleCancel}
            onSubmit={handleAccountCreate}
        />
    );
};

export default AccountCreate;