import { Paper, Typography } from "@mui/material";

const Dashboard = () => {
    return (
        <Paper
            sx={{
                p: 3,
            }}
        >
            <Typography variant="h4">
                Dashboard
            </Typography>

            <Typography color="text.secondary">
                ダッシュボード画面
            </Typography>
        </Paper>
    );
};

export default Dashboard;