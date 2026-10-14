import { useState } from "react";
import api from "../../../services/api/axios";
import type { GetAccountInfo } from "../../../types/AccountForm";

export const useAccountList = () => {
    const [accountList, setAccountList] = useState<GetAccountInfo[]>();
    const [selectedAccount, setSelectedAccount] = useState<string>("");

    const getAccounts = async (): Promise<GetAccountInfo[]> => {
        const res = await api.get("/auth/accounts");

        return res.data
    }

    const handleSelectAccount = (accountId: string) => {
        setSelectedAccount((prev) =>
            prev === accountId ? "" : accountId
        );
    };

    const handleAccountDelete =  async(accountId: string) => {
        try {
            if (!accountId) {
                return;
            }
            const res = await api.delete(`/auth/delete/${accountId}`)

            if (res.status === 204) {
                setAccountList((prev) =>
                    prev?.filter(account => account.accountId !== accountId)
                );
                setSelectedAccount((prev) =>
                    prev === accountId ? "" : prev
                );
            }
        }
        catch {
            return;
        }
    }

    return {
        accountList,
        setAccountList,
        selectedAccount,
        getAccounts,
        handleAccountDelete,
        handleSelectAccount,
    }
}
