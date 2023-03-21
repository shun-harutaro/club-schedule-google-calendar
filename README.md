# club-schedule-google-calendar
## Usage
1. Google Cloud プロジェクトを[作成](https://developers.google.com/workspace/guides/create-project?hl=ja)
2. [APIの有効化](https://console.cloud.google.com/flows/enableapi?apiid=calendar-json.googleapis.com&hl=ja)
    - 1.で作ったプロジェクトで`Google Calendar API`を有効にする
3. デスクトップ アプリケーションの認証情報を承認する
    - OAuthクライアントIDを作成し、ダウンロードしたJSONファイルを`credentials.json`として保存しリポジトリ配下に配置
    - 右のリンクを参照（https://developers.google.com/calendar/api/quickstart/nodejs?hl=ja#authorize_credentials_for_a_desktop_application）
4. リポジトリ配下に使いたい予定表のエクセルファイルを配置
5. .env ファイルを作成し、カレンダーID・エクセルファイルの名前を記述
```
touch .env
echo "calendarid = [xxxx@group.calendar.google.com]" >> .env
echo "file name = [xxxx.xlsm] >> .env
```
6. 実行する
```
npm install
node main.js
```
7. 任意のGoogleアカウントでログイン
    - カレンダーへのアクセス権限を付与
## Structure
- convertJson.js
    - exelファイルを読み込み各日付ごとのJSONファイルに変換する
- setParam.js
    - APIに適した形式に整えたオブジェクトを返す
- auth.js
    - credential.jsonの情報を元に認証クライアントを取得する
- main.js
    - 実行するファイル。上記3ファイルをライブラリとして読み込みAPIにPOSTする

## Reference
[Node.js クイックスタート | Google Calendar | Google Developers](https://developers.google.com/calendar/api/quickstart/nodejs?hl=ja)
[イベントを作成する | Google Calendar | Google Developers](https://developers.google.com/calendar/api/guides/create-events?hl=ja)