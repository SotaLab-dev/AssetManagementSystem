import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
    palette: {
        mode: "light",

        primary: {
            main: "#1976D2",
        },

        secondary: {
            main: "#424242",
        },

        success: {
            main: "#2E7D32",
        },

        warning: {
            main: "#ED6C02",
        },

        error: {
            main: "#D32F2F",
        },

        background: {
            default: "#F5F7FA",
            paper: "#FFFFFF",
        },
    },

    typography: {
        fontFamily: [
            "Yu Gothic UI",
            "Meiryo",
            "sans-serif",
        ].join(","),

        h4: {
            fontWeight: 700,
        },

        h5: {
            fontWeight: 700,
        },

        h6: {
            fontWeight: 600,
        },

        button: {
            textTransform: "none",
            fontWeight: 600,
        },
    },

    shape: {
        borderRadius: 8,
    },

    components: {
        MuiButton: {
            defaultProps: {
                variant: "contained",
            },
        },

        MuiTextField: {
            defaultProps: {
                fullWidth: true,
                size: "small",
            },
        },

        MuiPaper: {
            defaultProps: {
                elevation: 2,
            },
        },
    },
});