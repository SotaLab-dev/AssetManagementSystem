import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import type { AssetSearchCondition } from "../../types/Asset";

import { Stack } from "@mui/material";

import AssetSearch from "./AssetSearch";
import AssetTable from "./AssetTable";
import AssetToolbar from "./AssetToolbar";
import { type AssetLayoutContext } from "../../types/Asset";

const Asset = () => {
    const [page, setPage] = useState<number>(0);
    const [rowsPerPage, setRowsPerPage] = useState<number>(10);

    const {
        assets,
        setAssets,
        searchCondition,
        setSearchCondition,
        appliedSearchCondition,
        setAppliedSearchCondition,
    } = useOutletContext<AssetLayoutContext>();


    const handleDelete = (id: string) => {
        const confirmed = window.confirm(
            "この備品を本当に削除しますか？"
        );
        if (!confirmed) {
            return;
        }

        setAssets((prev) => prev.filter((asset) => asset.id !== id)
        );
    };

    const handleSearch = () => {
        setAppliedSearchCondition(searchCondition);
        setPage(0);
    };

    const handleReset = () => {
        const emptyCondition: AssetSearchCondition = {
            assetName: "",
            category: "",
            status: "",
        };
        setSearchCondition(emptyCondition);
        setAppliedSearchCondition(emptyCondition);
        setPage(0);
    }

    const filteredAssets = assets.filter((asset) => {
        const matchesAssetName =
            appliedSearchCondition.assetName === "" ||
            asset.assetName
                .toLowerCase()
                .includes(
                    appliedSearchCondition.assetName.toLowerCase()
                );
        const matchesCategory =
            appliedSearchCondition.category === "" ||
            asset.category === appliedSearchCondition.category;

        const matchesStatus =
            appliedSearchCondition.status === "" ||
            asset.status === appliedSearchCondition.status;

        return (
            matchesAssetName &&
            matchesCategory &&
            matchesStatus
        )
    })

    const paginatedAssets = filteredAssets.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage,
    );

    const handleChangePage = (
        _event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event : React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,

    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    }


    return (
        <Stack spacing={3}>
            <AssetToolbar />

            <AssetSearch
                onSearch={handleSearch}
                onReset={handleReset}
            />

            <AssetTable
                assets={paginatedAssets}
                onDelete={handleDelete}
                count={filteredAssets.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Stack>
    );
};

export default Asset;