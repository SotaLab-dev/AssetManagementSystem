import { Stack } from "@mui/material";

import AssetSearch from "./AssetSearch";
import AssetTable from "./AssetTable";
import AssetToolbar from "./AssetToolbar";

const Asset = () => {
    const handleCreate = () => {
        console.log("新規登録");
    };

    return (
    <Stack spacing={3}>
        <AssetToolbar
            onCreate={handleCreate}
        />

        <AssetSearch />

        <AssetTable />
    </Stack>
    );
};

export default Asset;