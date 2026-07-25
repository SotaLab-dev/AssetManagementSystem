import { Paper, Typography } from "@mui/material";
import MainLayout from "../../layouts/MainLayout";

const Dashboard = () => {
    return (
        <MainLayout>
            <Paper sx={{ p: 3 }}>
                <Typography variant="h4">
                    Dashboard
                </Typography>

                <Typography color="text.secondary">
                    ダッシュボード画面
                </Typography>
            </Paper>
        </MainLayout>
    );
};

export default Dashboard;