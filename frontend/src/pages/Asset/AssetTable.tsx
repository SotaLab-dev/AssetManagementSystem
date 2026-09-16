import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import {
    Checkbox,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TablePagination,
    Box,
    Dialog,
    Button,
    DialogTitle,
    DialogActions,
    DialogContent,
} from "@mui/material";

import { useNavigate } from "react-router-dom";

import StatusChip from "../../components/common/StatusChip";
import type { AssetItem } from "../../types/Asset";

type AssetTableProps = {
    assets: AssetItem[];
    count: number;
    page: number;
    rowsPerPage: number;
    deleteSuccess: boolean;
    informationDialogOpen: boolean;
    onPageChange: (
        event: React.MouseEvent<HTMLButtonElement> | null,
        page: number
    ) => void;
    onRowsPerPageChange: (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void;
    onDelete: (id: string) => void;
    onDeleteDialogClose: () => void;
    selectedAssetIds: string[];
    onSelectAsset: (id: string) => void;
    onSelectAll: () => void;
};

const AssetTable = ({
    assets,
    count,
    page,
    rowsPerPage,
    onPageChange,
    onRowsPerPageChange,
    onDelete,
    onDeleteDialogClose,
    deleteSuccess,
    informationDialogOpen,
    selectedAssetIds,
    onSelectAsset,
    onSelectAll,
}: AssetTableProps) => {
    const navigate = useNavigate();
    return (
        <Box
            sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                minHeight: 0,
            }}
        >
            <TableContainer
                component={Paper}
                sx={{
                    flex: 1,
                    minHeight: 0,
                    overflow: "auto",
                }}
            >
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell padding="checkbox">
                                <Checkbox
                                    checked={
                                        assets.length > 0 &&
                                        assets.every((asset) =>
                                            selectedAssetIds.includes(asset.id),
                                        )
                                    }
                                    indeterminate={
                                        assets.some((asset) =>
                                            selectedAssetIds.includes(asset.id),
                                        ) &&
                                        !assets.every((asset) =>
                                            selectedAssetIds.includes(asset.id),
                                        )
                                    }
                                    onChange={onSelectAll}
                                />
                            </TableCell>
                            <TableCell
                                sx={{
                                    backgroundColor: "background.paper",
                                }}>ID</TableCell>
                            <TableCell>備品名</TableCell>
                            <TableCell>カテゴリ</TableCell>
                            <TableCell>状態</TableCell>
                            <TableCell align="center">
                                操作
                            </TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {assets.length === 0 ? (
                            <TableRow>
                                <TableCell
                                    colSpan={6}
                                    align="center"
                                >
                                    データがありません。
                                </TableCell>
                            </TableRow>
                        ) : (
                            assets.map((asset) => (
                                <TableRow
                                    hover
                                    key={asset.id}
                                >
                                    <TableCell padding="checkbox">
                                        <Checkbox
                                            checked={selectedAssetIds.includes(asset.id)}
                                            onChange={() => onSelectAsset(asset.id)}
                                        />
                                    </TableCell>
                                    <TableCell>{asset.id}</TableCell>

                                    <TableCell>
                                        {asset.assetName}
                                    </TableCell>

                                    <TableCell>
                                        {asset.category}
                                    </TableCell>

                                    <TableCell>
                                        <StatusChip status={asset.status} />
                                    </TableCell>

                                    <TableCell
                                        align="center"
                                        width={120}
                                    >
                                        <IconButton
                                            color="primary"
                                            aria-label="編集"
                                            onClick={() => {
                                                navigate(`/asset/edit/${asset.id}`);
                                            }}
                                        >
                                            <EditIcon />
                                        </IconButton>

                                        <IconButton
                                            color="error"
                                            aria-label="削除"
                                            onClick={() => onDelete(asset.id)}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            <TablePagination
                component="div"
                count={count}
                page={page}
                onPageChange={onPageChange}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={onRowsPerPageChange}
                sx={{
                    flexShrink: 0,
                }}
            />

            {deleteSuccess && (
                <Dialog open={informationDialogOpen} onClose={onDeleteDialogClose}>
                    <DialogTitle>
                        削除
                    </DialogTitle>
                    <DialogContent>
                        削除が完了しました。
                    </DialogContent>
                    <DialogActions>
                        <Button
                            onClick={onDeleteDialogClose}
                        >
                            閉じる
                        </Button>
                    </DialogActions>
                </Dialog>
            )}
        </Box>
    );
};

export default AssetTable;