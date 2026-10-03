import type { InputBaseProps } from "@mui/material";
import TextField from "@mui/material/TextField";
import type { TextFieldProps } from "@mui/material/TextField";
import type { ReactNode } from "react";

type AppTextFieldProps = Omit<
    TextFieldProps,
    "label" | "InputProps"
> & {
  label: string | ReactNode;
  InputProps?: Partial<InputBaseProps>;
};

const AppTextField = ({
    fullWidth = true,
    sx,
    InputProps,
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
