AssetManagementSystem ログ仕様（完全版）

ログレベル仕様

INFO

ユーザー操作や業務処理の“結果”を記録するログ。

ボタン押下（ユーザー操作）

画面遷移

DB保存完了

API呼び出し完了

起動通知

正常終了

ポイント：何が起きたかを人間が読んで理解できるレベルのログ。

WARN

処理は継続できるが、異常の可能性がある状態。

想定外の値だが処理続行可能

設定値が未定義 → デフォルト値で処理

外部APIが遅延している

リトライが発生した

キャッシュが破損 → 再生成して続行

ポイント：注意すべき状態だが、アプリは落ちていない。

ERROR

処理が失敗したとき。

DB保存失敗

API通信エラー

例外発生（catch で握った）

ユーザー操作の結果が失敗した

入力値が不正で処理続行不可

ポイント：ユーザーに影響がある失敗。

DEBUG の粒度

処理の“途中経過”や“内部状態”を記録するログ。 TRACE ほど細かくはないが、INFO より内部寄りの情報を出す。

DEBUG を出す具体例（粒度 B）

メソッド内の主要な変数値

条件分岐の結果

API のリクエスト内容

DB保存前のデータ内容

バリデーション結果

設定値の読み込み結果

主要な処理ステップの開始・終了

ポイント：処理の流れを追うためのログ。開発・検証で最も役立つ。

TRACE

最も詳細なログ。メソッド呼び出しレベル。

TRACE を出す具体例

メソッドの開始・終了

メソッドの引数

ループの1回ごとの処理

非同期処理の開始・終了

イベント発火

フロントからバックエンドへの値受け取り

バックエンドからフロントへの値返却

ポイント：処理のすべてを追跡するためのログ。本番では通常 OFF。

FATAL

アプリケーションが継続不能な致命的エラー。

起動不能

主要コンポーネントの初期化失敗

DB接続が完全に失われ復旧不能

設定ファイルが破損して読み込めない

例外が握れずアプリがクラッシュする

ポイント：アプリが止まるレベルの重大障害。

AUDIT

監査目的のログ。誰が・いつ・何をしたかを記録する。

ログイン / ログアウト

権限変更

データ削除

重要データの更新

管理者操作

設定変更

セキュリティ関連の操作

ポイント：後から人間が追跡できるようにするためのログ。INFO と違い、“誰が何をしたか” が必須。

INFO / DEBUG / TRACE の違い（簡易表）

レベル

目的

出す内容

INFO

結果

何が起きたか

DEBUG

状態

処理の途中で何が起きているか

TRACE

詳細

処理のすべてを追跡する

フロント側の操作ログについて

バックエンドはフロントの操作を自動では知れないため、API を使って通知する必要がある。

UI 操作ログ専用 API の例

POST /log/ui-event
{
  "eventType": "ButtonClick",
  "screen": "AssetList",
  "button": "Save",
  "timestamp": "2026-09-18T22:50:00"
}

バックエンド側で受け取って NLog に書き込む。

archiveNumbering="Date" の挙動

毎日ローテーションなら .1.log .2.log は通常発生しない

ただし同日に複数回ローテーションが起きると上書きされる

Date を使うなら archiveAboveSize を大きくする必要がある

NLog の各項目の意味

internalLogFile

NLog 自身の内部ログ（設定エラーなど）。通常は Off。

lineEnding

改行コード（Windows は CRLF）。Default で問題なし。

layout

ログ1行のフォーマット。

例：

${longdate} - ${level:uppercase=true} - [${callsite-file}:${callsite-linenumber}] - ${message}

archiveNumbering="Rolling"

ローテーション時に番号を付ける方式。

2026-09-18_log.log
2026-09-18_log.1.log
2026-09-18_log.2.log

maxArchiveFiles

保持する最大ログファイル数。10なら古いものから削除される。

NLog.config（最終版例）

<?xml version="1.0" encoding="utf-8" ?>
<nlog xmlns="http://www.nlog-project.org/schemas/NLog.xsd"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      autoReload="true"
      throwConfigExceptions="true"
      internalLogLevel="Off"
      internalLogFile="./logs/nlog_internal.log">

  <targets>
    <target name="logFile"
            xsi:type="File"
            encoding="UTF-8"
            lineEnding="Default"
            layout="${longdate} - ${level:uppercase=true} - [${callsite-file}:${callsite-linenumber}] - ${message}"
            fileName="${specialfolder:localappdata}/AssetManagementSystem/Logs/current_log.log"
            archiveFileName="${specialfolder:localappdata}/AssetManagementSystem/Logs/${shortdate}_log.log"
            archiveEvery="Day"
            archiveNumbering="Date"
            archiveAboveSize="100000000"
            maxArchiveFiles="10"/>
  </targets>

  <rules>
    <logger name="*" minlevel="Trace" writeTo="logFile" />
  </rules>
</nlog>


## 実装例

Program.csで以下の実装を追加する
```
using NLog;
using NLog.Web;

var logger = LogManager.Setup().LoadConfigurationFromFile("NLog.config").GetCurrentClassLogger();

try
{
    logger.Info("アプリケーション起動");

    var builder = WebApplication.CreateBuilder(args);

    builder.Logging.ClearProviders();
    builder.Services.AddSingleton<ILoggerFactory,LogLoggerFactory>();
    builder.Host.UseNLog();

    builder.Services.AddControllers();
    builder.Services.AddScoped<AssetService>();

    var app = builder.Build();

    app.MapControllers();
    app.Run();
}
catch (Exception ex)
{
    logger.Fatal(ex, "アプリケーションが起動できませんでした");
    throw;
}
finally
{
    LogManager.Shutdown();
}
```

②Servicesは以下で以下のクラスを追加
```
public class AssetService
{
    private readonly Logger logger;

    public AssetService()
    {
        logger = LogManager.GetCurrentClassLogger();
    }
}
```
③ログを出力したいか所で以下の設定を行う
infoの部分はその時のログレベルを設定
```
logger.Info($"Asset保存API呼び出し: id={dto.Id}");
```