# 家庭記帳本 expense-tracker
此專案提供使用者查詢、記錄、新增支出等。
## Features - 功能描述
* 使用者可以瀏覽所有支出項目。
* 使用者可以瀏覽所有支出的總金額。
* 使用者可以瀏覽不同類別的支出金額。
* 使用者可以瀏覽不同類別的支出項目。
* 使用者可以新增支出項目。
* 使用者可以編輯支出內容。
* 使用者可以一次可以刪除一筆支出項目。

## Installing - 專案安裝流程
1.開啟終端機(Terminal)，Clone 此專案至本機電腦。
```
git clone https://github.com/Chia-HuiHsueh/expense-tracker
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
輸入npm run seed 指令
```
5.啟動伺服器，執行 app.js 檔案
```
輸入npm run dev指令
於任一瀏覽器輸入 http://localhost:3000 
```
## Screen Photo - 專案畫面
![image](https://raw.githubusercontent.com/Chia-HuiHsueh/expense-tracker/master/public/image/index.png)
首頁-所有支出總覽
![image](https://raw.githubusercontent.com/Chia-HuiHsueh/expense-tracker/master/public/image/create.png)
新增支出
![image](https://raw.githubusercontent.com/Chia-HuiHsueh/expense-tracker/master/public/image/edit.png)
編輯支出
![image](https://raw.githubusercontent.com/Chia-HuiHsueh/expense-tracker/master/public/image/category-food.png)
分類帳
## Environment SetUp - 環境建置
* Visual Studio Code - 開發環境
* Node.js - JavaScript 執行環境
* Express:^4.17.1 - 應用程式架構
* Express-Handlebars:^5.2.0 - 模板引擎
* mongoose: ^5.11.14"-資料庫連線
* body-parser: ^1.19.0",
* method-override": ^3.0.0
