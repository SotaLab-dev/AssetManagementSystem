import { useNavigate, useParams } from "react-router-dom";
import AccountForm from "./components/AccountForm";
import RoutePath from "../../constants/Routes";
import useAccountForm from "./hooks/useAccountForm";
import usePasswordVisibility from "./hooks/usePasswordVisibility";
import { useEffect, useState } from "react";
import api from "../../services/api/axios";

type InitialValue = {
    userId: string,
    accountName: string
}
const AccountEdit = () => {
    const { accountId } = useParams();
    const [initialValue, setInitialValue] = useState<InitialValue | null>(null);

    const navigate = useNavigate();

    const handleCancel = () => {
        navigate(RoutePath.accountManage)
    }

    const handleLoginInfoUpdate = async (accountId: string) => {
        try {
            if(!accountName.trim()){
                return;
            }

            if (!currentPassword.trim() || currentPassword.length < 8 || currentPassword.length > 64) {
                return;
            }

            if (!newPassword.trim() || newPassword.length < 8 || newPassword.length > 64) {
                return;
            }

            if (!newPasswordReinput.trim() || newPasswordReinput.length < 8 || newPasswordReinput.length > 64) {
                return;
            }

            const isPasswordCheck = newPassword === newPasswordReinput;

            if (!isPasswordCheck) return;

            const request = {
                AccountName: accountName,
                currentPassword: currentPassword,
                newPassword: newPassword
            }
            const res = await api.put(`/auth/edit/${accountId}`, request)

            if (res.status === 200) {
                navigate(RoutePath.accountManage);
            }
        }
        catch (error) {
            return;
        }
    }

    useEffect(() => {
        if (!accountId) return;
        const fetch = async () => {
            const res = await api.get(`/auth/account/${accountId}`);
            setInitialValue({
                userId: res.data.userId,
                accountName: res.data.accountName
            });
        }
        fetch();
    }, [accountId]);

    const {
        userId,
        accountName,
        setAccountName,
        currentPassword,
        setCurrentPassword,
        newPassword,
        setNewPassword,
        newPasswordReinput,
        setNewPasswordReinput,
    } = useAccountForm(initialValue ?? undefined);

    const {
        showCurrentPassword,
        showNewPassword,
        showNewPasswordReinput,
        toggleCurrentPasswordVisibility,
        toggleNewPasswordVisibility,
        toggleNewPasswordReinputVisibility
    } = usePasswordVisibility();


    if (!initialValue) {
        return <div>Loading...</div>
    }

    return (
        <AccountForm
            mode="EDIT"
            title="アカウント編集"
            onSubmitButtonName="更新"
            accountEdit={{
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
                onToggleCurrentPassword: toggleCurrentPasswordVisibility,
                onToggleNewPassword: toggleNewPasswordVisibility,
                onToggleNewPasswordReinput: toggleNewPasswordReinputVisibility,
                onCancel: handleCancel,
                onUpdate: async () => {
                    if(!accountId) return;
                    await handleLoginInfoUpdate(accountId)
                }
            }}
        />
    )
};

export default AccountEdit;