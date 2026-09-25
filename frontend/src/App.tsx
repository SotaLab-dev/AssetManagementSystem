import { BrowserRouter } from "react-router-dom";
import AppRouter from "./routes/AppRouter";
import { DialogProvider } from "./contexts/DialogProvider";

const App = () => {
    return (
        <BrowserRouter>
            <DialogProvider>
                <AppRouter />
            </DialogProvider>
        </BrowserRouter>
    );
};

export default App;