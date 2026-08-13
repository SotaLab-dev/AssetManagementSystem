import {
    FormControl,
    FormHelperText,
    InputLabel,
    MenuItem,
    Select,
    type SelectProps,
} from "@mui/material";

export type SelectOption = {
    value: string;
    label: string;
};

type AppSelectProps = {
    label: string;
    value: string;

    options: SelectOption[];

    error?: boolean;
    helperText?: string | string[];

    onChange?: SelectProps<string>["onChange"];

    required?: boolean;
    disabled?: boolean;
};

const AppSelect = ({
    label,
    value,
    options,
    error = false,
    helperText,
    onChange,
    required = false,
    disabled = false,
}: AppSelectProps) => {
    return (
        <FormControl
            fullWidth
            error={error}
            required={required}
            disabled={disabled}
        >
            <InputLabel>
                {label}
            </InputLabel>

            <Select<string>
                label={label}
                value={value}
                onChange={onChange}
            >
                {options.map((option) => (
                    <MenuItem
                        key={option.value}
                        value={option.value}
                    >
                        {option.label}
                    </MenuItem>
                ))}
            </Select>
            {helperText && (
                <FormHelperText>
                    {helperText}
                </FormHelperText>
            )}
        </FormControl>
    );
};

export default AppSelect;