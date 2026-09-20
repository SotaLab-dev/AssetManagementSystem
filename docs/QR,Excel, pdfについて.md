QRコードの仕様について
フロント：

iPhoneで読み取り可能な形式とは？
実現したい機能
・httpサーバーに配置したファイルをiPhoneで取得
・ファイルの形式はcsv
・内容は備品一覧の内容（画面に表示していない備考や管理番号も含む）

Excel
ファイル名：日付_AssetList.xlsx
出力フォルダー：ユーザーが選択（2回目以降の選択フォルダーをデフォルトで表示する。そこからユーザーが変更するなら変更可能とする）
デフォルト出力フォルダー：ユーザーのDownloadフォルダー（初回選択時のフォルダー）
【内容】
・内容は備品一覧の内容（画面に表示していない備考や管理番号も含む）


PDF
ファイル名：日付_AssetList.pdf
出力フォルダー：ユーザーが選択（2回目以降の選択フォルダーをデフォルトで表示する。そこからユーザーが変更するなら変更可能とする）
デフォルト出力フォルダー：ユーザーのDownloadフォルダー（初回選択時のフォルダー）
【内容】
・内容は備品一覧の内容（画面に表示していない備考や管理番号も含む）

追加仕様
・更新日時、作成日時を管理する
・テーブルの列をカスタム可能（列移動や表示列の変更など）
・インポート機能の追加
・エクスポート機能（出力ファイルを選択できるのがベスト）
・ユーザー登録可能
・

了解したよ、sota。  
あなたがここまで積み上げてきた仕様を **そのまま md としてコピペできる形**でまとめる。  
「短くまとめる」のではなく、**構造化しつつ内容はすべて詳細に記述する**方針で作成する。

以下は **仕様書としてそのまま使える Markdown**。

---

# AssetManagementSystem  
## 署名付きURL・セッション管理・FileSystemAccess API・インポート／エクスポート仕様書  
（2026-09-20 時点）

---

# 1. QRコードダウンロード機能の仕様

## 1.1 目的
QRコードを用いて、iPhone などのモバイル端末から  
**短命・使い捨て・セッション単位の署名付きURL**を利用して  
CSV / Excel / PDF を安全にダウンロードできるようにする。

---

# 2. 署名付きURLの仕様

## 2.1 署名付きURLの目的
- URLを盗まれても悪用されないようにする  
- 有効期限を短くし、攻撃リスクを最小化する  
- 1回アクセスで即無効化する  
- セッション単位で利用を制限する  
- Cookie が送られないケース（SameSite=Strict）でも安全に認証できるようにする  

---

## 2.2 署名付きURLの構造

### 2.2.1 payload（署名対象 JSON）
署名付きURLに含める JSON は以下の通り。

```json
{
  "sid": "<session-id>",
  "nonce": "<random-string>",
  "exp": "<ISO8601 timestamp>",
  "scope": "download:<csv|excel|pdf>",
  "file": "<filename>"
}
```

### 2.2.2 各項目の説明

#### sid（セッションID）
- このトークンがどのセッションに紐づいているかを示す  
- SameSite=Strict により Cookie が送られないケースでもセッション判定可能  
- DB側のセッションテーブルと照合するために使用

#### nonce（使い捨てランダム値）
- 1回アクセスで即無効化するためのキー  
- DBに保存し、使用後は `used=true` に更新  
- 再利用を完全に防止する

#### exp（有効期限）
- トークンの有効期限（5分）  
- exp < 現在時刻 の場合は無効  
- 短命トークンにより攻撃リスクを最小化

#### scope（権限の範囲）
- トークンの用途を限定する  
- 例：`download:assetlist`, `download:pdf`  
- トークンを他のAPIに悪用されるのを防ぐ

#### file（対象ファイル）
- このトークンがダウンロード可能なファイル名  
- scope と組み合わせて用途限定トークンにする

---

## 2.3 URL の最終形式（例）

```
https://example.com/download?
payload=eyJzaWQiOiJzZXNzaW9uLTEyMzQ1Iiwibm9uY2UiOiJyYW5kb20teHl6LTk4NyIsImV4cCI6IjIwMjYtMDktMjBUMjM6MjU6MDArMDk6MDAiLCJzY29wZSI6ImRvd25sb2FkOmFzc2V0bGlzdCIsImZpbGUiOiJhc3NldGxpc3QuY3N2In0=
&sig=abcdef1234567890
```

- payload は Base64URL エンコード  
- sig は HMAC-SHA256 などで署名  

---

# 3. トークン検証フロー（サーバー側）

1. payload を Base64URL デコード  
2. HMAC署名を検証（改ざん防止）  
3. exp が現在時刻より後か確認  
4. sid が有効なセッションか確認（DB）  
5. nonce が未使用か確認（DB）  
6. scope が正しいか確認  
7. file が正しいか確認  
8. ダウンロード処理を実行  
9. nonce を `used=true` に更新（1回で無効化）

---

# 4. セッション管理

## 4.1 DBありを採用する理由
- nonce の使用済み管理が容易  
- セッションとトークンを同じストアで扱える  
- ログ・監査に強い  
- SameSite=Strict と相性が良い  
- 状態管理が Redis より DB に向いている  

## 4.2 セッション情報
- sid（セッションID）  
- 有効期限  
- ユーザー情報  
- Cookie は HttpOnly + SameSite=Strict  

---

# 5. FileSystemAccess API の仕様

## 5.1 目的
- ユーザーが選択したフォルダーに直接ファイルを書き込む  
- ブラウザのダウンロードフォルダーに依存しない  
- 実フォルダーを扱う

## 5.2 必要なチェック
- フォルダーが存在するか  
- 権限が有効か（ブラウザが権限を失効させていないか）

## 5.3 不要なチェック
- ネットワークドライブの接続状態  
  → 複数ユーザーで共有する想定がないため不要

---

# 6. インポート機能の仕様

## 6.1 対応形式
- CSV（UTF-8 BOM / CRLF）  
- Excel（ローカル時刻は日付型で入れる）

## 6.2 バリデーション
- id の重複チェック  
- 必須項目チェック  
- 不正値チェック  
- 1つでも問題があればインポート失敗  
- 失敗理由はログ出力（画面には簡易メッセージのみ）

## 6.3 大容量対応
- レコード上限：1万件  
- タイムアウト：30分  
- chunk 処理でメモリ削減  
- 非同期処理（202 Accepted）  
- 進捗確認APIを用意  
- UIはローディングダイアログで進捗表示

---

# 7. エクスポート機能の仕様

## 7.1 出力形式
- CSV（UTF-8 BOM / CRLF）  
- Excel（列幅自動調整 / 日付型）  
- PDF（MeiryoUI / ページ分割あり）

## 7.2 出力フォルダー
- FileSystemAccess API を使用  
- ユーザーが選択  
- 2回目以降は前回選択フォルダーをデフォルト表示  
- フォルダー存在確認のみ実施

## 7.3 権限
- 誰でも出力可能  
- ロール管理は不要  
- 管理番号・備考も含む（機密情報ではない）

---

# 8. ログ仕様

## 8.1 出力内容
- インポート失敗時のみログ出力  
- 成功時はログ不要  
- QRコードアクセスログは不要  

## 8.2 保存期間
- 要検討（ユーザー変更可 or 固定）

## 8.3 JSON破損時の扱い
- JSONが破損している場合はその情報を適用しない  
- 初期値で動作する

---

# 9. 保存先・設定ファイル

## 9.1 保存場所
```
C:\Users\<ユーザー名>\AppData\Local\AssetManagementSystem\
```

## 9.2 保存形式
- 全て JSON  
- 非機密情報のみ保存  
- 認証情報は保存しない（Cookieで管理）

---

# 10. セキュリティ仕様

## 10.1 Cookie
- HttpOnly  
- Secure  
- SameSite=Strict  

### SameSite=Strict の影響
- 外部サイトからのリンクで Cookie が送られない  
- QRコード経由のアクセスでは Cookie が送られない可能性  
- 署名付きURLに sid を含めることで問題を解消

---

## 10.2 セキュリティヘッダー

### Content-Security-Policy（CSP）
```
Content-Security-Policy: default-src 'self'; script-src 'self'
```
- 外部スクリプト読み込み禁止  
- XSS対策として最強レベル

### X-Frame-Options
```
X-Frame-Options: DENY
```
- クリックジャッキング防止

### X-Content-Type-Options
```
X-Content-Type-Options: nosniff
```
- ブラウザの勝手な MIME 推測を禁止  
- 不正な JS 実行を防止

### Referrer-Policy
```
Referrer-Policy: no-referrer
```
- 外部サイトに元URLを送らない  
- 機密情報漏洩防止

---

# 11. API レート制限（今後検討）
- DoS攻撃防止  
- 短命トークンは攻撃対象になりやすいため、レート制限は有効  
- 実装は後日検討

---

# 12. PDFライブラリ
- 今後調査  
- MeiryoUI 埋め込み必須  
- ページ分割対応必須

---

# 13. ファイル名仕様
```
YYYYMMDD_AssetList.xlsx
YYYYMMDD_AssetList.pdf
YYYYMMDD_AssetList.csv
```

---

# 14. 署名付きURLの payload テンプレート（最終版）

```json
{
  "sid": "<session-id>",
  "nonce": "<random-string>",
  "exp": "<ISO8601 timestamp>",
  "scope": "download:<csv|excel|pdf>",
  "file": "<filename>"
}
```

---

# 15. 今後の検討項目
- レート制限  
- ログ保存期間  
- PDFライブラリ選定  
- セッションテーブル設計  
- nonce テーブル設計  

---

以上が、あなたが積み上げてきた仕様を **そのまま md として使える形で完全にまとめたもの**だよ。  
必要なら、この md をさらに「章ごとにファイル分割」したり「図を追加」したりもできる。