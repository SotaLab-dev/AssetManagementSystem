import AccountForm from "./components/AccountForm";
import useAccountForm from "./hooks/useAccountForm";
import useAuth from "./hooks/useAuth";
import usePasswordVisibility from "./hooks/usePasswordVisibility";

const Login = () => {
    const {
        userId,
        setUserId,
        accountName,
        setAccountName,
        password,
        setPassword,
    } = useAccountForm();

    const {
        showPassword,
        togglePasswordVisibility,
    } = usePasswordVisibility();

    const {
        handleLogin,
    } = useAuth();

    return (
        <AccountForm
            mode="LOGIN"
            title="ログイン"
            onSubmitButtonName="ログイン"
            login={{
                userId,
                setUserId,
                accountName,
                setAccountName,
                password,
                setPassword,
                showPassword,
                onTogglePassword: togglePasswordVisibility,
                onLogin: () => handleLogin(userId, accountName, password),
            }}
        />
    );
};

export default Login;