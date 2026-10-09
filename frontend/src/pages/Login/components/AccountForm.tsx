import CreateForm from "./CreateForm";
import EditForm from "./EditForm";
import LoginForm from "./LoginForm";
import type { AccountCreateProps, AccountEditProps, LoginProps } from "../../../types/AccountForm";

export type AccountFormProps =
    | {
        mode: "CREATE",
        title: string,
        onSubmitButtonName: string,
        accountCreate: AccountCreateProps,
    }
    | {
        mode: "EDIT",
        title: string,
        onSubmitButtonName: string,
        accountEdit: AccountEditProps,
    }
    | {
        mode: "LOGIN",
        title: string,
        onSubmitButtonName: string,
        login: LoginProps
    }


const AccountForm = (props: AccountFormProps) => {
    const { mode, title, onSubmitButtonName } = props;

    const assertNever = (value: never): never => {
        throw new Error(`未対応のモードです:${value}`);
    }
    
    switch (mode) {
        case "CREATE":
            return (
                <CreateForm
                    {...props.accountCreate}
                    title={title}
                    onSubmitButtonName={onSubmitButtonName}
                />
            );

        case "EDIT":
            return (
                <EditForm
                    {...props.accountEdit}
                    title={title}
                    onSubmitButtonName={onSubmitButtonName}
                />
            );

        case "LOGIN":
            return (
                <LoginForm
                    {...props.login}
                    title={title}
                    onSubmitButtonName={onSubmitButtonName}
                />
            );

        default:
            return assertNever(mode)
    }
};

export default AccountForm;