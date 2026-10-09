import { useState } from "react";

const usePasswordVisibility = () => {
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showPasswordReinput, setShowPasswordReinput] = useState<boolean>(false);
    const [showCurrentPassword, setShowCurrentPassword] = useState<boolean>(false);
    const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
    const [showNewPasswordReinput, setShowNewPasswordReinput] = useState<boolean>(false);

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    const togglePasswordReinputVisibility = () => {
        setShowPasswordReinput((prev) => !prev);
    };

    const toggleCurrentPasswordVisibility = () => {
        setShowCurrentPassword((prev) => !prev);
    }
    const toggleNewPasswordVisibility = () => {
        setShowNewPassword((prev) => !prev);
    };

    const toggleNewPasswordReinputVisibility = () => {
        setShowNewPasswordReinput((prev) => !prev);
    };
    return {
        showPassword,
        showPasswordReinput,
        showCurrentPassword,
        showNewPassword,
        showNewPasswordReinput,
        togglePasswordVisibility,
        togglePasswordReinputVisibility,
        toggleCurrentPasswordVisibility,
        toggleNewPasswordVisibility,
        toggleNewPasswordReinputVisibility
    }
}
export default usePasswordVisibility;