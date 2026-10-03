import { AccountMode } from "../../types/AccountMode";
import AccountForm from "./components/AccountForm";
import { useAccountList } from "./hooks/useAccountList";

const Login = () => {
    const {
        accountName,
        setAccountName,
        password,
        setPassword,
        showPassword,
        handleLogin,
        togglePasswordVisibility,
    } = useAccountList();

    return (
        <AccountForm
            mode={AccountMode.LOGIN}
            title="ログイン"
            onSubmitButtonName="ログイン"
            onSubmit={handleLogin}
            onTogglePassword={togglePasswordVisibility}
            accountName={accountName}
            setAccountName={setAccountName}
            password={password}
            setPassword={setPassword}
            showPassword={showPassword}
            // rememberMe={false}
            // setRememberMe={() => {}}
        />
    );
};

export default Login;