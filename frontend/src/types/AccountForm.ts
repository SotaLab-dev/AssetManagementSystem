import type { Dispatch, SetStateAction } from "react";

export type LoginProps = {
    userId: string,
    setUserId: Dispatch<SetStateAction<string>>,
    accountName: string,
    setAccountName: Dispatch<SetStateAction<string>>,
    password: string,
    setPassword: Dispatch<SetStateAction<string>>,
    showPassword: boolean,
    onTogglePassword: () => void,
    onLogin: (userId: string, accountName: string, password: string) => void,
}

export type AccountCreateProps = {
    userId: string,
    setUserId: Dispatch<SetStateAction<string>>,
    accountName: string,
    setAccountName: Dispatch<SetStateAction<string>>,
    password: string,
    setPassword: Dispatch<SetStateAction<string>>;
    passwordReinput: string,
    setPasswordReinput: Dispatch<SetStateAction<string>>,
    showPassword: boolean,
    showPasswordReinput: boolean,
    onTogglePassword: () => void;
    onTogglePasswordReinput: () => void;
    onCancel: () => void;
    onCreate: () => void;
}


export type AccountEditProps = {
    userId: string,
    accountName: string,
    setAccountName:  Dispatch<SetStateAction<string>>,
    currentPassword: string,
    setCurrentPassword: Dispatch<SetStateAction<string>>,
    newPassword: string,
    setNewPassword: Dispatch<SetStateAction<string>>,
    newPasswordReinput: string,
    setNewPasswordReinput: Dispatch<SetStateAction<string>>
    showCurrentPassword: boolean,
    showNewPassword: boolean,
    showNewPasswordReinput: boolean,
    onToggleCurrentPassword: () => void;
    onToggleNewPassword: () => void;
    onToggleNewPasswordReinput: () => void;
    onCancel: () => void;
    onUpdate: () => void;
}


