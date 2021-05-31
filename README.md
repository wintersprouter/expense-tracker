# 家庭記帳本 expense-tracker

此專案提供使用者查詢、記錄、新增支出等。

### Demo

[Heroku](https://murmuring-basin-85746.herokuapp.com/)

| email             | password |
| ----------------- | -------- |
| user1@example.com | 12345678 |
| user2@example.com | 12345678 |

## Features - 功能描述

- 使用者可以註冊帳號登入。
- 使用者可以使用 facebook 帳號登入。
- 使用者可以瀏覽所有支出項目。
- 使用者可以以同時根據「類別」與「月份」來篩選支出；總金額的計算只會包括被篩選出來的支出總和。
- 使用者可以新增支出項目。
- 使用者可以編輯支出內容。
- 使用者一次可以刪除一筆支出項目。

## Installing - 專案安裝流程

1.開啟終端機(Terminal)，Clone 此專案至本機電腦。

```
git clone https://github.com/wintersprouter/expense-tracker
```

2.CD 進入存放此專案的資料夾

```
cd expense-tracker
```

3.安裝 npm 套件

```
輸入 npm install 指令
```

4.新增種子資料

```
輸入 npm run seed 指令
```

5.啟動伺服器，執行 app.js 檔案

```
輸入 npm run dev 指令
於任一瀏覽器輸入 http://localhost:3000
```

## Screen Photo - 專案畫面

![image](https://raw.githubusercontent.com/wintersprouter/expense-tracker/master/public/image/v2/%E5%AE%B6%E5%BA%AD%E8%A8%98%E5%B8%B3%E6%9C%AC%20-%20login%20page.png)
登入頁面

![image](https://raw.githubusercontent.com/wintersprouter/expense-tracker/master/public/image/v2/%E5%AE%B6%E5%BA%AD%E8%A8%98%E5%B8%B3%E6%9C%AC%20-%20register%20page.png)
註冊頁面

![image](https://raw.githubusercontent.com/wintersprouter/expense-tracker/master/public/image/v2/%E5%AE%B6%E5%BA%AD%E8%A8%98%E5%B8%B3%E6%9C%AC%20-%20home%20page.png)
首頁-所有支出總覽

![image](https://raw.githubusercontent.com/wintersprouter/expense-tracker/master/public/image/v2/%E5%AE%B6%E5%BA%AD%E8%A8%98%E5%B8%B3%E6%9C%AC%20-%20fliter%20category.png)
分類帳

![image](https://raw.githubusercontent.com/wintersprouter/expense-tracker/master/public/image/v2/%E5%AE%B6%E5%BA%AD%E8%A8%98%E5%B8%B3%E6%9C%AC%20-%20new%20record.png)
新增支出

![image](https://raw.githubusercontent.com/wintersprouter/expense-tracker/master/public/image/v2/%E5%AE%B6%E5%BA%AD%E8%A8%98%E5%B8%B3%E6%9C%AC%20-%20edit.png)
編輯支出

## Environment SetUp - 環境建置

- Visual Studio Code - 開發環境
- Node.js - JavaScript 執行環境
- Express: 4.17.1 - 應用程式架構
- Express-Handlebars: 5.2.0 - 模板引擎
- Express-session: 1.17.1
- Mongoose: 5.11.14 - 資料庫連線
- Body-parser: 1.19.0
- Method-override: 3.0.0
- Bcryptjs: 2.4.3
- Connect-flash: 0.1.1 - 快閃訊息
- Dotenv: 9.0.0 - 管理環境變數
- Faker: 5.5.3
- Passport: 0.4.1 - 使用者認證
- Passport-facebook: 3.0.0 - 使用者 facebook 登入驗證
- Passport-local: 1.0.0 - 使用者本地登入驗證
