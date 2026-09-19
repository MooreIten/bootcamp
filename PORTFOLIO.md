# 待辦清單 Web App

這是在 GitHub Copilot 實戰工作坊中完成的待辦清單 Web App。專案從基本的待辦管理開始，逐步加入深色模式、篩選與批次清除功能，並透過 GitHub issue 與 Pull Request 流程持續改善使用體驗。

## 線上展示

[GitHub Pages](https://<你的帳號>.github.io/<你的repo名稱>/)

> 請將上方網址中的 `<你的帳號>` 與 `<你的repo名稱>` 替換成實際的 GitHub Pages 網址。

## 功能

- 新增待辦事項，輸入空白內容時不會建立項目。
- 勾選待辦事項並標記為已完成，完成項目會顯示刪除線並淡化。
- 刪除單筆待辦事項。
- 顯示整體未完成項目數量。
- 提供「全部」、「未完成」、「已完成」三種篩選模式。
- 篩選結果為空時顯示對應提示，說明項目仍存在但被篩選條件隱藏。
- 支援淺色與深色模式切換。
- 未手動選擇主題時，會依照作業系統的 `prefers-color-scheme` 設定顯示。
- 記住使用者選擇的主題，重新整理後仍會保留。
- 一次清除所有已完成項目，操作前會顯示確認對話框。
- 沒有已完成項目時，清除按鈕會停用。
- 待辦資料保存於 `localStorage`，重新整理後資料仍會保留。
- 支援手機螢幕與響應式版面。

## 技術

- 使用純 HTML、CSS 與原生 JavaScript。
- 不使用任何前端框架或外部套件。
- 不引用外部 CDN，可直接離線開啟。
- 使用 CSS 變數管理介面配色與深色模式。
- 使用瀏覽器 `localStorage` 保存待辦事項與主題偏好。

## 開發方式

- 使用 GitHub Copilot Agent Mode，依照需求建立初始的 HTML、CSS 與 JavaScript 檔案，並執行語法檢查與瀏覽器驗證。
- 使用 Microsoft Learn MCP 查詢 `prefers-color-scheme` 與深色模式色彩對比等官方建議，再檢查專案的樣式設計。
- 使用 GitHub MCP 讀取 repository 的 issue，根據 issue #3 與 issue #4 的需求進行修正，並建立對應的 Pull Request。
- 使用 `.github/prompts/fix-issue.prompt.md` 定義依 issue 編號處理問題、驗證修正並建立 Pull Request 的 agentic workflow 流程。

## 我學到什麼

- 如何用 Agent Mode 將一段完整需求轉換成可操作的前端專案。
- 如何透過 `localStorage` 保存使用者資料與介面偏好。
- 如何設計深色模式、系統主題偵測與基本的色彩對比檢查流程。
- 如何使用 MCP 連接 Microsoft Learn 與 GitHub，取得官方文件與 issue 脈絡。
- 如何用分支、commit 與 Pull Request 管理功能修正，並以實際瀏覽器操作驗證結果。
