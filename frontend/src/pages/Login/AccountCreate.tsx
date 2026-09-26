import { useNavigate } from "react-router-dom";
import RoutePath from "../../constants/Routes";
import { AccountMode } from "../../types/AccountMode";
import AccountForm from "./components/AccountForm";

const AccountCreate = () => {
    const navigate = useNavigate();

    const handleCancel = () => {
        navigate(RoutePath.accountManage);
    }

    const handleAccountCreate = () => {
        navigate(RoutePath.login);
    };

    return (
        <AccountForm
            mode={AccountMode.CREATE}
            title="アカウント登録"
            onSubmitButtonName="登録"
            onCancel={handleCancel}
            onSubmit={handleAccountCreate}
            />
    );
};

export default AccountCreate;