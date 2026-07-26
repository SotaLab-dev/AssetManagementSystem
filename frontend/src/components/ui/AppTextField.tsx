import TextField from "@mui/material/TextField";
import type { TextFieldProps }  from "@mui/material/TextField";

type AppTextFieldProps = {
    // 必須Props
    label: string;
    value: string;
    // 見た目に関するProps
    placeholder?: string;
    type?: TextFieldProps["type"];
    // 状態に関するProps
    required?: boolean;
    disabled?: boolean;
    error?: boolean;
    helperText?: string;
    // イベント
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const AppTextField = ({
    label,
    value,
    onChange,
    placeholder,
    type = "text",
    required = false,
    disabled = false,
    error = false,
    helperText,
}: AppTextFieldProps) => {
    return (
        <TextField
            label={label}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            type={type}
            required={required}
            disabled={disabled}
            error={error}
            helperText={helperText}
        />
    );
};

export default AppTextField;