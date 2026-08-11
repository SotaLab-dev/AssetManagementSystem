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
} from "@mui/material";

import { useNavigate } from "react-router-dom";

import StatusChip from "../../components/common/StatusChip";
import type { AssetItem } from "../../types/Asset";

type AssetTableProps = {
    assets: AssetItem[];
    count: number;
    page: number;
    rowsPerPage: number;
    onPageChange: (
        event: React.MouseEvent<HTMLButtonElement> | null,
        page: number
    ) => void;
    onRowsPerPageChange: (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void;
    onDelete?: (id: string) => void;
};

const AssetTable = ({
    assets,
    count,
    page,
    rowsPerPage,
    onPageChange,
    onRowsPerPageChange,
    onDelete
}: AssetTableProps) => {
    const navigate = useNavigate();
    return (
        <>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell padding="checkbox">
                                <Checkbox />
                            </TableCell>
                            <TableCell>ID</TableCell>
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
                                        <Checkbox />
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
                                            onClick={() => {
                                                onDelete?.(asset.id);
                                            }}
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
            />
        </>
    );
};

export default AssetTable;