import { useState } from "react";
import type { AccountInfo } from "../../../types/User";
import { mockAccountList } from "../../../mocks/accounts";

export const useAccountList = () => {
    const [accounts, setAccounts] = useState<AccountInfo[]>(mockAccountList);
    const [selectedAccount, setSelectedAccount] = useState<string | null>(null);

    const handleAccountDelete = (accountName: string): void => {
        setAccounts(prev => 
            prev.filter(account => account.name !== accountName)
        );
    };

    const handleSelectAccount = (accountName: string) => {
        setSelectedAccount((prev) =>
            prev === accountName ? null : accountName
        );
    };

    return {
        accounts,
        setAccounts,
        selectedAccount,
        handleAccountDelete,
        handleSelectAccount,
    }
}
