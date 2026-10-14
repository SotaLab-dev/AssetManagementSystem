import { useEffect, useState } from "react";

const useAccountForm = (initialValue?: {
    userId: string
    accountName: string
}) => {
    const [userId, setUserId] = useState<string>(initialValue?.userId ?? "");
    const [accountName, setAccountName] = useState<string>(initialValue?.accountName ?? "");
    const [password, setPassword] = useState("");
    const [passwordReinput, setPasswordReinput] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [newPasswordReinput, setNewPasswordReinput] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    // const [rememberMe, setRememberMe] = useState(false);

    useEffect(() => {
        if (!initialValue) return;

        setUserId(initialValue.userId)
        setAccountName(initialValue.accountName)

    }, [initialValue])

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