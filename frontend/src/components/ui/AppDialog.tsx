import { Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { type ReactNode } from "react";

type AppDialogProps = {
    open: boolean;
    onClose: () => void;
    title?: string;
    actions?: ReactNode;
    children?: ReactNode;
};

export const AppDialog = ({
    open,
    onClose,
    title,
    actions,
    children,
}: AppDialogProps) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="sm"
        >
            {title &&
                <DialogTitle>
                    {title}
                </DialogTitle>
            }
            <DialogContent>
                {children}
            </DialogContent>
            {actions &&
                <DialogActions>
                    {actions}
                </DialogActions>
            }
        </Dialog>
    );
};
