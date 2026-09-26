import type { AccountInfo } from "../types/User";

export const mockAccountList: AccountInfo[] = [
  {
    name: "admin_user",
    password: "Admin#123",
    mailAddress: "admin@example.com",
    remarks: "システム管理者"
  },
  {
    name: "guest01",
    password: "guest_pass",
    mailAddress: "guest01@example.com",
    remarks: "ゲストアカウント"
  },
  {
    name: "sota_dev",
    password: "DevPass2026",
    mailAddress: "sota.dev@example.com",
    remarks: "開発環境用アカウント"
  }
];
