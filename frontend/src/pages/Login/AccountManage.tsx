import { Delete } from "@mui/icons-material";
import { Box, Checkbox, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import RoutePath from "../../constants/Routes";
import { useAccountList } from "./hooks/useAccountList";
import AppButton from "../../components/ui/AppButton";
import { useConfirmDialog } from "../../components/common/ConfirmDialog/ConfirmDialog";
import { useEffect } from "react";
import type { GetAccountInfo } from "../../types/AccountForm";

export const AccountManage = () => {
    const {
        accountList,
        setAccountList,
        selectedAccount,
        getAccounts,
        handleAccountDelete,
        handleSelectAccount,
    } = useAccountList();

    const { showConfirm } = useConfirmDialog();

    const navigate = useNavigate();
    const location = useLocation();

    const onClickDelete = async (target: GetAccountInfo) => {
        try {
            showConfirm({
                title: "削除確認",
                message: `${target.accountName}を削除しますがよろしいですか？`,
                onOk: async () => await handleAccountDelete(target.accountId)
            });
        }
        catch (error) {
            return;
        }
    };

    useEffect(() => {
        const fetchAccounts = async () => {
            const data = await getAccounts();
            setAccountList(data);
        };

        fetchAccounts();
    }, [location.pathname])

    return (
        <Box
            sx={{
                height: "100vh"
            }}
        >
            <Typography
                variant="h5"
                align="center"
            >
                アカウント一覧
            </Typography>
            <TableContainer>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell padding="checkbox">
                                <Checkbox
                                    checked={false}
                                    indeterminate={false}
                                    disabled
                                />
                            </TableCell>
                            <TableCell>
                                ユーザーID
                            </TableCell>
                            <TableCell>
                                アカウント名
                            </TableCell>
                            <TableCell>
                                操作
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {accountList === undefined ? (
                            <TableRow>
                                <TableCell colSpan={4} align="center">
                                    読み込み中...
                                </TableCell>
                            </TableRow>
                        ) : (
                            accountList?.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={4} align="center">
                                        アカウントがありません。
                                    </TableCell>
                                </TableRow>
                            ) : (
                                accountList?.map((account) =>
                                    <TableRow
                                        hover
                                        key={account.accountId}
                                    >
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                                checked={selectedAccount === account.accountId}
                                                onChange={() => handleSelectAccount(account.accountId)}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            {account.userId}
                                        </TableCell>
                                        <TableCell>
                                            {account.accountName}
                                        </TableCell>
                                        <TableCell>
                                            <IconButton
                                                color="error"
                                                aria-label="削除"
                                                onClick={() => onClickDelete(account)// ダイアログ表示
                                                }
                                            >
                                                <Delete />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                )
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    gap: 2,
                    mt: 2,
                }}>
                <AppButton
                    onClick={() => {
                        if (!selectedAccount) return;

                        const target = accountList?.find(account => account.accountId === selectedAccount);

                        if (!target) return;

                        onClickDelete(target)
                    }}
                >
                    アカウント削除
                </AppButton>
                <AppButton
                    onClick={() => {
                        if (!selectedAccount) return;

                        const target = accountList?.find(account => account.accountId === selectedAccount);

                        if (!target) return;

                        navigate(`/account/edit/${selectedAccount}`);
                    }}
                >
                    アカウント編集
                </AppButton>
                <AppButton
                    onClick={() => navigate(RoutePath.accountSetting)}
                >
                    アカウント登録
                </AppButton>
            </Box>
        </Box >

    )
}