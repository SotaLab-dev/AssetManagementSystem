import TextField from "@mui/material/TextField";
import type { TextFieldProps } from "@mui/material/TextField";

type AppTextFieldProps = Omit<
    TextFieldProps,
    "label"
> & {
    label: string;
};

const AppTextField = (props: AppTextFieldProps) => {
    return (
        <TextField
            {...props}
        />
    );
};

export default AppTextField;