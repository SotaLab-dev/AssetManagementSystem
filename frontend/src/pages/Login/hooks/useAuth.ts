import { useNavigate } from "react-router-dom";
import Routes from "../../../constants/Routes";
import api from "../../../services/api/axios";

const useAuth = () => {
    const navigate = useNavigate();

    const handleLogin = async (
        userId: string,
        accountName: string,
        password: string
    ) => {
        try {
            if(!userId.trim() || !accountName.trim() || !password.trim()){
                return;
            }

            if (userId.length > 20) {
                return;
            }

            if (accountName.length > 20) {
                return;
            }

            if (password.length < 8 || password.length > 64) {
                return;
            }

            const request = {
                UserId: userId,
                AccountName: accountName,
                Password: password
            }
            const res = await api.post("/auth/login", request);
            if (res.status !== 200) {
                // TODO エラーメッセージの表示方法は要検討
                return;
            }

            navigate(Routes.dashboard);
        }
        catch (error) {
            console.log("API Error");
        }
    };
    return {
        handleLogin
    }
}

export default useAuth;