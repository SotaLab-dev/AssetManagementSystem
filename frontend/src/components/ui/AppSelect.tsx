import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
} from "@mui/material";

import type { SelectChangeEvent } from "@mui/material/Select";

export type SelectOption = {
    value: string;
    label: string;
};

type AppSelectProps = {
    label: string;
    value: string;

    options: SelectOption[];

    onChange: (event: SelectChangeEvent) => void;

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

            <Select
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