import TextField from "@mui/material/TextField";
import type { TextFieldProps } from "@mui/material/TextField";

type AppTextFieldProps = Omit<
    TextFieldProps,
    "label"
> & {
    label: string;
};

const AppTextField = ({
    fullWidth = true,
    sx,
    ...props
}: AppTextFieldProps) => {
    return (
        <TextField
            {...props}
            fullWidth={fullWidth}
            sx={{
                "& .MuiInputBase-root": {
                    height: 56,
                },
                "& .MuiInputLabel-root": {
                    transform: "translate(14px, 18px) scale(1)",
                },

                "& .MuiInputLabel-root.Mui-focused": {
                    transform: "translate(14px, -9px) scale(0.75)",
                },

                "& .MuiInputLabel-root.MuiInputLabel-shrink": {
                    transform: "translate(14px, -9px) scale(0.75)",
                },
                ...sx,
            }}
        />
    );
};

export default AppTextField;