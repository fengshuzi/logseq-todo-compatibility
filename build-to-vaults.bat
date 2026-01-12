@echo off
REM Logseq TODO Compatibility - 自动构建到 Obsidian Vaults (Windows)
REM 使用方法: build-to-vaults.bat

echo 🔨 开始构建 Logseq TODO Compatibility 插件...

REM 构建插件
call npm run build

if %errorlevel% neq 0 (
    echo ❌ 构建失败！
    exit /b %errorlevel%
)

echo ✅ 构建完成！

REM 定义目标目录（Windows 路径）
set "VAULT_PRO=%USERPROFILE%\Library\Mobile Documents\iCloud~md~obsidian\Documents\漂泊者及其影子\.obsidian-pro\plugins\logseq-todo-compatibility"
set "VAULT_MOBILE=%USERPROFILE%\Library\Mobile Documents\iCloud~md~obsidian\Documents\漂泊者及其影子\.obsidian-mobile\plugins\logseq-todo-compatibility"

REM 创建目录
echo 📦 准备目标目录...
if not exist "%VAULT_PRO%" mkdir "%VAULT_PRO%"
if not exist "%VAULT_MOBILE%" mkdir "%VAULT_MOBILE%"

REM 复制文件到 Pro 目录
echo 📦 复制到 Pro vault...
copy /Y main.js "%VAULT_PRO%\" >nul 2>&1 && echo   ✓ 已复制 main.js 到 Pro vault
copy /Y manifest.json "%VAULT_PRO%\" >nul 2>&1 && echo   ✓ 已复制 manifest.json 到 Pro vault
copy /Y styles.css "%VAULT_PRO%\" >nul 2>&1 && echo   ✓ 已复制 styles.css 到 Pro vault

REM 复制文件到 Mobile 目录
echo 📦 复制到 Mobile vault...
copy /Y main.js "%VAULT_MOBILE%\" >nul 2>&1 && echo   ✓ 已复制 main.js 到 Mobile vault
copy /Y manifest.json "%VAULT_MOBILE%\" >nul 2>&1 && echo   ✓ 已复制 manifest.json 到 Mobile vault
copy /Y styles.css "%VAULT_MOBILE%\" >nul 2>&1 && echo   ✓ 已复制 styles.css 到 Mobile vault

echo.
echo 🎉 完成！插件已部署到两个 vault
echo.
echo 💡 提示: 在 Obsidian 中重新加载插件以查看更改
pause
