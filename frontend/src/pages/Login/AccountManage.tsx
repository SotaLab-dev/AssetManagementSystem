import { Delete } from "@mui/icons-material";
import { Box, Checkbox, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import RoutePath from "../../constants/Routes";
import { useAccountList } from "./hooks/useAccountList";
import AppButton from "../../components/ui/AppButton";
import { useConfirmDialog } from "../../components/common/ConfirmDialog/ConfirmDialog";
import type { AccountInfo } from "../../types/User";

export const AccountManage = () => {
    const {
        accounts,
        selectedAccount,
        handleAccountDelete,
        handleSelectAccount,
    } = useAccountList();

    const { showConfirm } = useConfirmDialog();

    const navigate = useNavigate();

    const onClickDelete = (target: AccountInfo) => {

        showConfirm({
            title: "削除確認",
            message: `${target.name}を削除しますがよろしいですか？`,
            onOk: () => handleAccountDelete(target.name)
        });
    };

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
                                アカウント名
                            </TableCell>
                            <TableCell>
                                メールアドレス
                            </TableCell>
                            <TableCell>
                                操作
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {accounts.length === 0 ? (
                            <TableRow>
                                <TableCell>
                                    アカウントがありません。
                                </TableCell>
                            </TableRow>
                        ) : (
                            accounts.map((account) =>
                                <TableRow
                                    hover
                                    key={account.name}
                                >
                                    <TableCell padding="checkbox">
                                        <Checkbox
                                            checked={selectedAccount?.includes(account.name)}
                                            onChange={() => handleSelectAccount(account.name)}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        {account.name}
                                    </TableCell>
                                    <TableCell>
                                        {account.mailAddress}
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
                        )}
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
                    if(!selectedAccount) return;
                    
                    const target = accounts.find(account => account.name === selectedAccount);

                    if(!target) return;

                    onClickDelete(target)
                }}
            >
                アカウント削除
            </AppButton>
            <AppButton
                onClick={() => navigate(RoutePath.accountEdit)}>
                アカウント編集
            </AppButton>
            <AppButton
                onClick={() => navigate(RoutePath.accountSetting)}
            >
                アカウント登録
            </AppButton>
            </Box>
        </Box>

    )
}