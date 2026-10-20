import { Card } from "@mui/material";
import AppButton from "../../ui/AppButton";
import useAuth from "../../../pages/Login/hooks/useAuth";
import { useConfirmDialog } from "../ConfirmDialog/ConfirmDialog";
import { useNavigate } from "react-router-dom";
import RoutePath from "../../../constants/Routes"

const InfoList = () => {
    const navigate = useNavigate();

    const {
        handleLogout
    } = useAuth();

    const { showConfirm } = useConfirmDialog();

    const onClickLogout = () => {

        showConfirm({
            title: "ログアウト確認",
            message: "ログアウトしますがよろしいですか？",
            onOk: () => {
                // ログアウト処理
                handleLogout();
            }
        });
    };

    const AccountNavigate = () => {
        navigate(RoutePath.accountManage)
    }

    return (
            <Card
                sx={{
                    width: "100%",
                    maxWidth: 600,
                    padding: 3,
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                }}
            >
                <AppButton
                    onClick={AccountNavigate}
                >
                        アカウント管理
                </AppButton>
                <AppButton
                    onClick={onClickLogout}>
                        ログアウト
                </AppButton>
            </Card >
    )
}
export default InfoList;