import { useDialog } from "../../../contexts/DialogProvider";
import { Button } from "@mui/material";

type ConfirmDialogConfig = {
    title: string,
    message: string,
    onOk: () => void | Promise<void>,
}
export const useConfirmDialog = () => {
    const { showDialog, closeDialog } = useDialog();

    const showConfirm = ({
        title,
        message,
        onOk,
    }: ConfirmDialogConfig) => {
        showDialog({
            title: title,
            content: <div>{message}</div>,
            actions: (
                <>
                    <Button
                        onClick={closeDialog}
                    >
                        キャンセル
                    </Button>
                    <Button
                        onClick={async () => {
                            await onOk();
                            closeDialog();
                        }}
                        variant="contained"
                    >
                        OK
                    </Button>
                </>
            ),
            open: false
        });
    }
    return {
        showConfirm,
    }
}
