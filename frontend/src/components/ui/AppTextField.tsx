import TextField from "@mui/material/TextField";
import type { TextFieldProps }  from "@mui/material/TextField";

type AppTextFieldProps = {
    // 必須Props
    label: string;
    value: string;
    // 見た目に関するProps
    placeholder?: string;
    type?: TextFieldProps["type"];
    multiline?: TextFieldProps["multiline"];
    rows?: TextFieldProps["rows"];
    // 状態に関するProps
    required?: TextFieldProps["required"];
    disabled?: TextFieldProps["disabled"];
    error?: boolean;
    helperText?: string;
    // イベント
    onChange?: TextFieldProps["onChange"];
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
    multiline = false,
    rows
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
            multiline={multiline}
            rows={rows}
        />
    );
};

export default AppTextField;