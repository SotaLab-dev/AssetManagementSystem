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
} from "@mui/material";

import { assets } from "../../mocks/assets";
import StatusChip from "../../components/common/StatusChip";

const AssetTable = () => {
    return (
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
                            <TableRow key={asset.id}>
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

                                <TableCell align="center">
                                    <IconButton
                                        color="primary"
                                    >
                                        <EditIcon />
                                    </IconButton>

                                    <IconButton
                                        color="error"
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
    );
};

export default AssetTable;