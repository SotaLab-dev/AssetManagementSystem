import type { AccountInfo } from "../types/User";

export const mockAccountList: AccountInfo[] = [
  {
    accountId: "",
    userId: "user-001",
    accountName: "admin_user",
    password: "Admin#123",
    mailAddress: "admin@example.com",
    remarks: "システム管理者"
  },
  {
    accountId: "",
    userId: "user-002",
    accountName: "guest01",
    password: "guest_pass",
    mailAddress: "guest01@example.com",
    remarks: "ゲストアカウント"
  },
  {
    accountId: "",
    userId: "user-003",
    accountName: "sota_dev",
    password: "DevPass2026",
    mailAddress: "sota.dev@example.com",
    remarks: "開発環境用アカウント"
  }
];
