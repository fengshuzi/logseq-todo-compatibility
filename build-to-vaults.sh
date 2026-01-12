#!/bin/bash

# Logseq TODO Compatibility - 自动构建到 Obsidian Vaults
# 使用方法: ./build-to-vaults.sh

set -e

echo "🔨 开始构建 Logseq TODO Compatibility 插件..."

# 构建插件
npm run build

echo "✅ 构建完成！"

# 定义基础路径
BASE_PATH="/Users/lizhifeng/Library/Mobile Documents/iCloud~md~obsidian/Documents/漂泊者及其影子"

# 定义目标 vault 配置目录
VAULTS=(
  ".obsidian-mobile"
  ".obsidian-pro"
  ".obsidian-ipad"
  ".obsidian-2017"
)

# 需要复制的文件
FILES_TO_COPY=("main.js" "manifest.json" "styles.css")

# 复制到各个 vault
for vault in "${VAULTS[@]}"; do
  TARGET_DIR="$BASE_PATH/$vault/plugins/logseq-todo-compatibility"
  
  echo "📦 复制到 $vault..."
  mkdir -p "$TARGET_DIR"
  
  for file in "${FILES_TO_COPY[@]}"; do
    if [ -f "$file" ]; then
      cp "$file" "$TARGET_DIR/"
      echo "  ✓ 已复制 $file 到 $vault"
    else
      echo "  ⚠️  警告: $file 不存在"
    fi
  done
done

echo ""
echo "🎉 完成！插件已部署到所有 vault："
for vault in "${VAULTS[@]}"; do
  echo "  📁 $vault: $BASE_PATH/$vault/plugins/logseq-todo-compatibility"
done
echo ""
echo "💡 提示: 在 Obsidian 中重新加载插件以查看更改"
