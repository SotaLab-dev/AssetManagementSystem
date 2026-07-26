import {
    Card,
    CardContent,
    Grid,
    List,
    ListItem,
    ListItemText,
    Paper,
    Stack,
    Typography,
} from "@mui/material";

import {
    dashboardSummary,
    notices,
    recentAssets,
} from "../../mocks/dashboard";

const Dashboard = () => {
    return (
        <Stack spacing={4}>
            <Typography variant="h4">
                ダッシュボード
            </Typography>

            <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 3 }}>
                    <Card>
                        <CardContent>
                            <Typography color="text.secondary">
                                備品数
                            </Typography>

                            <Typography variant="h4">
                                {dashboardSummary.assetCount}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid size={{ xs: 12, md: 3 }}>
                    <Card>
                        <CardContent>
                            <Typography color="text.secondary">
                                ユーザー数
                            </Typography>

                            <Typography variant="h4">
                                {dashboardSummary.userCount}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid size={{ xs: 12, md: 3 }}>
                    <Card>
                        <CardContent>
                            <Typography color="text.secondary">
                                貸出中
                            </Typography>

                            <Typography variant="h4">
                                {dashboardSummary.lendingCount}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid size={{ xs: 12, md: 3 }}>
                    <Card>
                        <CardContent>
                            <Typography color="text.secondary">
                                故障中
                            </Typography>

                            <Typography variant="h4">
                                {dashboardSummary.brokenCount}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Paper sx={{ p: 2 }}>
                        <Typography
                            variant="h6"
                            gutterBottom
                        >
                            最近登録された備品
                        </Typography>

                        <List>
                            {recentAssets.map((asset) => (
                                <ListItem key={asset.id}>
                                    <ListItemText
                                        primary={asset.assetName}
                                        secondary={asset.category}
                                    />
                                </ListItem>
                            ))}
                        </List>
                    </Paper>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                    <Paper sx={{ p: 2 }}>
                        <Typography
                            variant="h6"
                            gutterBottom
                        >
                            お知らせ
                        </Typography>

                        <List>
                            {notices.map((notice) => (
                                <ListItem key={notice.id}>
                                    <ListItemText
                                        primary={notice.title}
                                    />
                                </ListItem>
                            ))}
                        </List>
                    </Paper>
                </Grid>
            </Grid>
        </Stack>
    );
};

export default Dashboard;