import { Stack } from "@mui/material";

import AssetSearch from "./AssetSearch";
import AssetTable from "./AssetTable";
import AssetToolbar from "./AssetToolbar";

const Asset = () => {
    return (
    <Stack spacing={3}>
        <AssetToolbar />

        <AssetSearch />

        <AssetTable />
    </Stack>
    );
};

export default Asset;