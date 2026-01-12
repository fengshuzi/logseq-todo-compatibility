# 部署指南

本插件提供了多种自动部署到 Obsidian vaults 的方式。

## 目标 Vaults

插件会自动部署到以下两个目录：

1. **Pro Vault**: `~/.../漂泊者及其影子/.obsidian-pro/plugins/logseq-todo-compatibility`
2. **Mobile Vault**: `~/.../漂泊者及其影子/.obsidian-mobile/plugins/logseq-todo-compatibility`

## 使用方法

### 方法 1: npm 命令（推荐）

#### 一次性构建并部署

```bash
npm run deploy
```

这会：
1. 运行 TypeScript 类型检查
2. 构建生产版本
3. 自动复制到两个 vault 目录

#### 开发模式（自动监听）

```bash
npm run watch
```

这会：
1. 启动 esbuild watch 模式（自动重新编译）
2. 监听文件变化
3. 自动部署到两个 vault

### 方法 2: Shell 脚本（macOS/Linux）

#### 一次性构建并部署

```bash
./build-to-vaults.sh
```

#### 开发模式（推荐）

```bash
./dev-watch.sh
```

这个脚本会：
- 启动 esbuild watch 模式
- 使用 `fswatch` 监听文件变化
- 自动部署到两个 vault
- 显示实时更新状态

**注意**: 需要安装 `fswatch`：

```bash
brew install fswatch
```

### 方法 3: Windows 批处理脚本

```cmd
build-to-vaults.bat
```

### 方法 4: 手动部署

```bash
# 只部署，不构建
node deploy.mjs
```

## 工作流程

### 日常开发

1. **启动开发模式**:
   ```bash
   npm run watch
   # 或
   ./dev-watch.sh
   ```

2. **编辑代码**: 修改 `main.ts`、`settings.ts` 或 `styles.css`

3. **自动部署**: 保存文件后自动编译并部署

4. **在 Obsidian 中测试**:
   - 打开命令面板 (Cmd/Ctrl + P)
   - 搜索 "Reload app without saving"
   - 或者禁用再启用插件

### 发布前

1. **完整构建**:
   ```bash
   npm run build
   ```

2. **测试**:
   ```bash
   npm run deploy
   ```

3. **在两个 vault 中测试**

4. **提交代码**

## 部署的文件

每次部署会复制以下文件：

- `main.js` - 编译后的插件代码
- `manifest.json` - 插件元数据
- `styles.css` - 样式文件

## 故障排除

### 目录不存在

如果目标目录不存在，脚本会自动创建。

### 权限问题

如果遇到权限问题：

```bash
chmod +x build-to-vaults.sh dev-watch.sh
```

### iCloud 同步问题

如果文件在 iCloud Drive 中：
- 确保 iCloud 已完全同步
- 检查目录路径是否正确
- 可能需要等待几秒钟让 iCloud 同步

### fswatch 未安装

macOS 上安装：
```bash
brew install fswatch
```

Linux 上安装：
```bash
# Ubuntu/Debian
sudo apt-get install fswatch

# Fedora
sudo dnf install fswatch
```

### 文件未更新

1. 检查 Obsidian 是否正在运行
2. 在 Obsidian 中重新加载插件
3. 检查控制台是否有错误
4. 确认文件确实被复制了：
   ```bash
   ls -la "/Users/lizhifeng/Library/Mobile Documents/iCloud~md~obsidian/Documents/漂泊者及其影子/.obsidian-pro/plugins/logseq-todo-compatibility/"
   ```

## 自定义部署目录

如果你的 vault 在不同位置，编辑以下文件：

- `deploy.mjs` - 修改 `VAULTS` 数组
- `build-to-vaults.sh` - 修改 `VAULT_PRO` 和 `VAULT_MOBILE` 变量
- `watch-deploy.mjs` - 修改 `VAULTS` 数组
- `dev-watch.sh` - 修改 `VAULT_PRO` 和 `VAULT_MOBILE` 变量

## 最佳实践

1. **开发时使用 watch 模式**: `npm run watch` 或 `./dev-watch.sh`
2. **发布前完整构建**: `npm run build`
3. **定期测试两个 vault**: 确保在不同环境下都能正常工作
4. **提交前清理**: 确保 `main.js` 是最新的生产版本

## 快速参考

| 命令 | 用途 | 何时使用 |
|------|------|----------|
| `npm run dev` | 开发模式（仅编译） | 本地开发 |
| `npm run build` | 生产构建 | 发布前 |
| `npm run deploy` | 构建并部署 | 快速测试 |
| `npm run watch` | 自动监听部署 | 日常开发 |
| `./dev-watch.sh` | Shell 监听部署 | 日常开发（推荐） |
| `./build-to-vaults.sh` | Shell 一次性部署 | 快速部署 |

## 提示

- 💡 使用 `npm run watch` 可以边开发边测试
- 💡 修改 CSS 后刷新 Obsidian 即可看到效果
- 💡 修改 TypeScript 后需要重新加载插件
- 💡 在 Obsidian 开发者工具中查看控制台日志
