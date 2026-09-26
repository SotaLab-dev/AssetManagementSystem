import { useNavigate } from "react-router-dom";
import Routes from "../../constants/Routes";
import { AccountMode } from "../../types/AccountMode";
import AccountForm from "./components/AccountForm";

const Login = () => {
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate(Routes.dashboard);
    };

    return (
        <AccountForm
            mode={AccountMode.LOGIN}
            title="ログイン"
            onSubmitButtonName="ログイン"
            onSubmit={handleLogin}
        />
    );
};

export default Login;