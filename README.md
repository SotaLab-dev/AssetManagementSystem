# Asset Management System

React + ASP.NET Core + .NET 10 を利用した備品管理システムです。

## 概要

備品の登録・編集・削除・検索・ページング・一括操作などを行うための業務向けWebアプリケーションです。

現在はフロントエンドの主要機能を実装しており、今後バックエンド・データベースとの連携を実装します。

## 主な機能

### 備品一覧

- 備品一覧表示
- 備品名・カテゴリ・状態による検索
- 検索条件のリセット
- ページング
- 備品の選択
- 単一削除
- 一括削除
- 一括状態変更

### 備品管理

- 備品の新規登録
- 備品の編集
- 登録・編集時の入力バリデーション
- キャンセルによる備品一覧への遷移

## 使用技術

### Frontend

- React
- TypeScript
- MUI
- React Router
- Vite

### Backend

- ASP.NET Core
- .NET 10
- Entity Framework Core
- NLog

### Database

- SQL Server

## プロジェクト構成

```text
AssetManagementSystem/
├─ frontend/    # React / TypeScript / MUI
└─ backend/     # ASP.NET Core / .NET 10
```

詳細なディレクトリ構成は、各プロジェクトの実装状況に応じて更新します。

## 開発環境

### Frontend

Node.js / npm が必要です。

```bash
cd frontend
npm install
npm run dev
```

本番ビルドの確認：

```bash
npm run build
```

### Backend

.NET 10 SDK が必要です。

> TODO: バックエンドの起動手順をAPI・DB構成確定後に追記する。

## 設計書

システム全体の基本仕様については、以下を参照してください。

- [備品管理システム_基本設計書.md](./備品管理システム_基本設計書.md)

## 開発状況

| 領域 | 状況 |
|---|---|
| フロントエンドUI | 実装中・主要機能実装済み |
| 備品登録・編集 | 実装済み |
| 備品削除・一括削除 | 実装済み |
| 検索・ページング | 実装済み |
| 一括状態変更 | 実装済み |
| 入力バリデーション | 実装済み |
| 共通UI・レイアウト調整 | 実装済み |
| バックエンドAPI | TODO |
| データベース連携 | TODO |
| 認証・認可 | TODO |

## 今後の予定

- ASP.NET Core APIの設計・実装
- Entity Framework Coreによるデータアクセス実装
- SQL Serverとの接続
- フロントエンドとAPIの連携
- 認証・認可の実装
- API連携後のエラーハンドリング・ローディング処理の整備
