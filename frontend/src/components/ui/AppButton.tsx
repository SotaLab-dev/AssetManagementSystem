import Button from "@mui/material/Button";
import type { ButtonProps } from "@mui/material/Button";
import type { ReactNode } from "react";

type AppButtonProps = {
    children: ReactNode;
    onClick?: () => void;

    type?: ButtonProps["type"];
    variant?: ButtonProps["variant"];
    color?: ButtonProps["color"];

    disabled?: boolean;
    fullWidth?: boolean;
};

const AppButton = ({
    children,
    onClick,
    type = "button",
    variant = "contained",
    color = "primary",
    disabled = false,
    fullWidth = false,
}: AppButtonProps) => {
    return (
        <Button
            type={type}
            variant={variant}
            color={color}
            disabled={disabled}
            fullWidth={fullWidth}
            onClick={onClick}
        >
            {children}
        </Button>
    );
};

export default AppButton;