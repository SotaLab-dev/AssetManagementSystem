import { useNavigate } from "react-router-dom";
import AccountForm from "./components/AccountForm";
import RoutePath from "../../constants/Routes";
import useAccountForm from "./hooks/useAccountForm";
import usePasswordVisibility from "./hooks/usePasswordVisibility";

const AccountEdit = () => {
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
    } = useAccountForm();

    const {
        showCurrentPassword,
        showNewPassword,
        showNewPasswordReinput,
        toggleCurrentPasswordVisibility,
        toggleNewPasswordVisibility,
        toggleNewPasswordReinputVisibility
    } = usePasswordVisibility();

    const navigate = useNavigate();

    const handleCancel = () => {
        navigate(RoutePath.accountManage)
    }

    const handleLoginInfoUpdate = () => {
        navigate(RoutePath.accountManage);
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
                onUpdate: handleLoginInfoUpdate
            }}
        />
    )
};

export default AccountEdit;