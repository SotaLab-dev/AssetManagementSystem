import { useNavigate, useParams } from "react-router-dom";
import { AccountMode } from "../../types/AccountMode";
import AccountForm from "./components/AccountForm";
import RoutePath from "../../constants/Routes";
import { useAccountList } from "./hooks/useAccountList";

const AccountEdit = () => {

    const {
        accounts
    }= useAccountList();

    const { name } = useParams(); 
    const navigate = useNavigate();

    const account = accounts.find(
        (item) => item.name === name
    );

    const handleCancel = () => {
        navigate(RoutePath.accountManage)
    }

    const handleLoginInfoUpdate = () => {
        navigate(RoutePath.accountManage);
    }
    
    return (
        <AccountForm
            mode={AccountMode.EDIT}
            title="アカウント編集"
            accounts={account}
            onSubmitButtonName="更新"
            onCancel={handleCancel}
            onSubmit={handleLoginInfoUpdate}
        />
    )
};

export default AccountEdit;