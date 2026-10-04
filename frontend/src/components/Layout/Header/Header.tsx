import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { DRAWER_WIDTH, HEADER_HEIGHT } from "../../../constants/Layout";
import { AppMode } from "../../../types/AppMode";
import { Logout } from "@mui/icons-material";
import { useConfirmDialog } from "../../common/ConfirmDialog/ConfirmDialog";
import { useNavigate } from "react-router-dom";
import Routes from "../../../constants/Routes";
import api from "../../../services/api/axios";

type HeaderProps = {
    mode: AppMode;
    sidebarOpen?: boolean
    onMenuClick?: () => void;
};

const Header = ({ mode, sidebarOpen, onMenuClick }: HeaderProps) => {
    const sidebarWidth = mode === AppMode.MAIN && sidebarOpen ? DRAWER_WIDTH : 0;
    const navigate = useNavigate();
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

    const handleLogout = async() => {
        const res = await api.post("/auth/logout");
        if (res.status !== 200) {
            // TODO エラーメッセージの表示方法は要検討
            return;
        }
        navigate(Routes.login);
    };

    return (
        <AppBar
            position="fixed"
            sx={{
                left: sidebarWidth,
                height: HEADER_HEIGHT,
                justifyContent: "center",
                width: `calc(100% - ${sidebarWidth}px)`,
                transition: "left 0.2s, width 0.2s"
            }}>

            {mode === AppMode.MAIN && (
                <Toolbar>
                    {!sidebarOpen && (
                        <IconButton
                            onClick={onMenuClick}
                            aria-label="サイドバーを開閉"
                        >
                            <MenuIcon />
                        </IconButton>
                    )}

                    <Typography variant="h6">
                        Asset Management System
                    </Typography>
                    <IconButton
                        onClick={onClickLogout}
                        aria-label="ログアウト"
                    >
                        <Logout />
                    </IconButton>
                </Toolbar>
            )}
            {mode === AppMode.LOGIN && (
                <Toolbar>
                    <Typography variant="h6">
                        Asset Management System
                    </Typography>
                </Toolbar>
            )}
        </AppBar>
    );
};

export default Header;