import Chip from "@mui/material/Chip";

type StatusChipProps = {
    status: "利用中" | "貸出中" | "故障中";
};

const StatusChip = ({ status }: StatusChipProps) => {
    switch (status) {
        case "利用中":
            return <Chip label={status} color="success" size="small" />;

        case "貸出中":
            return <Chip label={status} color="primary" size="small" />;

        case "故障中":
            return <Chip label={status} color="error" size="small" />;
    }
};

export default StatusChip;