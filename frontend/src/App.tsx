import { Button, Container, Paper, Stack, Typography } from "@mui/material";

const App = () => {
    return (
        <Container
            maxWidth="lg"
            sx={{
                py: 4,
            }}
        >
            <Paper
                sx={{
                    p: 4,
                }}
            >
                <Stack spacing={3}>
                    <Typography variant="h4">
                        Asset Management System
                    </Typography>

                    <Typography color="text.secondary">
                        実務向け学習プロジェクト
                    </Typography>

                    <Button>
                        MUI Theme 適用確認
                    </Button>
                </Stack>
            </Paper>
        </Container>
    );
};

export default App;