const Routes = {
    login: "/login",

    accountManage: "/account/manage",

    accountSetting: "/account/setting",

    accountEdit: "/account/edit/:name",

    dashboard: "/",

    assets: "/assets",

    assetCreate: "/assets/create",

    assetEdit: "/assets/edit/:id",

    users: "/users",

    auditLogs: "/audit-logs",

    settings: "/settings",
} as const;

export default Routes;