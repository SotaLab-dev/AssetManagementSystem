import {
    FormControl,
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

    onChange?: SelectProps<string>["onChange"];

    required?: boolean;
    disabled?: boolean;
};

const AppSelect = ({
    label,
    value,
    options,
    onChange,
    required = false,
    disabled = false,
}: AppSelectProps) => {
    return (
        <FormControl
            fullWidth
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
        </FormControl>
    );
};

export default AppSelect;