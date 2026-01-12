#!/bin/bash

# Logseq TODO Compatibility - 开发模式（自动监听并部署）
# 使用方法: ./dev-watch.sh

set -e

echo "🚀 启动开发模式..."
echo "📝 监听文件变化并自动部署到 vaults"
echo "按 Ctrl+C 停止"
echo ""

# 定义目标目录
VAULT_PRO="/Users/lizhifeng/Library/Mobile Documents/iCloud~md~obsidian/Documents/漂泊者及其影子/.obsidian-pro/plugins/logseq-todo-compatibility"
VAULT_MOBILE="/Users/lizhifeng/Library/Mobile Documents/iCloud~md~obsidian/Documents/漂泊者及其影子/.obsidian-mobile/plugins/logseq-todo-compatibility"

# 创建目标目录
mkdir -p "$VAULT_PRO"
mkdir -p "$VAULT_MOBILE"

# 需要复制的文件
FILES_TO_COPY=("main.js" "manifest.json" "styles.css")

# 复制文件函数
copy_files() {
    for file in "${FILES_TO_COPY[@]}"; do
        if [ -f "$file" ]; then
            cp "$file" "$VAULT_PRO/" 2>/dev/null && echo "  ✓ 已更新 $file 到 Pro vault"
            cp "$file" "$VAULT_MOBILE/" 2>/dev/null && echo "  ✓ 已更新 $file 到 Mobile vault"
        fi
    done
}

# 初始构建
echo "🔨 初始构建..."
npm run build
copy_files
echo "✅ 初始部署完成！"
echo ""

# 启动 esbuild watch 模式（后台运行）
npm run dev &
ESBUILD_PID=$!

# 监听文件变化
echo "👀 开始监听文件变化..."
fswatch -o main.js manifest.json styles.css 2>/dev/null | while read change; do
    echo ""
    echo "📦 检测到文件变化，正在部署..."
    copy_files
    echo "✅ 部署完成！$(date '+%H:%M:%S')"
done &
FSWATCH_PID=$!

# 捕获退出信号
trap "echo ''; echo '🛑 停止开发模式...'; kill $ESBUILD_PID $FSWATCH_PID 2>/dev/null; exit" INT TERM

# 保持脚本运行
wait
