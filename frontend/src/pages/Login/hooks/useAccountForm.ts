import { useState } from "react";

const useAccountForm = () => {
    const [userId, setUserId] = useState<string>("");
    const [accountName, setAccountName] = useState("");
    const [password, setPassword] = useState("");
    const [passwordReinput, setPasswordReinput] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [newPasswordReinput, setNewPasswordReinput] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    // const [rememberMe, setRememberMe] = useState(false);
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
        // rememberMe,
        // setRememberMe,
    }
}
export default useAccountForm;