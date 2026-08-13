import { useState } from "react";

export const useAssetPagination = () => {
    const [page, setPage] = useState<number>(0);
    const [rowsPerPage, setRowsPerPage] = useState<number>(10);

    const handleChangePage = (
        _event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,

    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const getPaginatedAssets = <T,>(assets: T[]): T[] => {
        return assets.slice(
            page * rowsPerPage,
            page * rowsPerPage + rowsPerPage,
        );
    };


    return {
        page,
        setPage,
        rowsPerPage,
        handleChangePage,
        handleChangeRowsPerPage,
        getPaginatedAssets
    }

}