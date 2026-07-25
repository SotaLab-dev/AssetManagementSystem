// React
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// 外部ライブラリ
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";

// アプリ内
import App from "./App";
import { theme } from "./theme";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </StrictMode>,
)
