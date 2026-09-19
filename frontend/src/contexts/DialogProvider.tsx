import { createContext, useState, useContext, type ReactNode } from "react";
import { AppDialog } from "../components/ui/AppDialog";

type DialogConfig = {
    open: boolean,
    title: string,
    content: ReactNode | null,
    actions: ReactNode | null,
};

type DialogContextType = {
    showDialog: (config: DialogConfig) => void,
    closeDialog : () => void,
};

const DialogContext = createContext<DialogContextType | undefined>(undefined);

export const DialogProvider = ({ children }: {children: ReactNode}) => {
  const [dialog, setDialog] = useState<DialogConfig>({
    open: false,
    title: "",
    content: null,
    actions: null,
  });

  const showDialog = (config: Omit<DialogConfig, "open">) => setDialog({ ...config, open: true });
  const closeDialog = () => setDialog((d) => ({ ...d, open: false }));

  return (
    <DialogContext.Provider value={{ showDialog, closeDialog }}>
      {children}

      <AppDialog
        open={dialog.open ?? false}
        onClose={closeDialog}
        title={dialog.title}
        actions={dialog.actions}
      >
        {dialog.content}
      </AppDialog>
    </DialogContext.Provider>
  );
};

export const useDialog = () => {
    const ctx = useContext(DialogContext);
    if(!ctx) throw new Error("useDialog must be used inside DialogProvider");
    return ctx;
};
