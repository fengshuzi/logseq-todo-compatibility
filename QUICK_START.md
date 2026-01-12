# Quick Start Guide

## 开发环境设置

### 1. 安装依赖

```bash
cd logseq-todo-compatibility
npm install
```

### 2. 开发模式

```bash
npm run dev
```

这会启动 esbuild 的 watch 模式，自动编译你的更改。

### 3. 在 Obsidian 中测试

#### 方法 A: 符号链接（推荐）

```bash
# macOS/Linux
ln -s /path/to/logseq/logseq-todo-compatibility /path/to/your/vault/.obsidian/plugins/logseq-todo-compatibility

# Windows (需要管理员权限)
mklink /D "C:\path\to\vault\.obsidian\plugins\logseq-todo-compatibility" "C:\path\to\logseq\logseq-todo-compatibility"
```

#### 方法 B: 直接复制

将 `logseq-todo-compatibility` 文件夹复制到你的 Obsidian vault 的 `.obsidian/plugins/` 目录下。

### 4. 在 Obsidian 中启用插件

1. 打开 Obsidian
2. 进入 Settings → Community Plugins
3. 关闭 Safe Mode（如果还没关闭）
4. 点击 "Reload plugins"
5. 找到 "Logseq TODO Compatibility" 并启用

## 构建生产版本

```bash
npm run build
```

这会生成优化后的 `main.js` 文件。

## 测试插件

### 创建测试文件

在你的 vault 中创建一个测试文件 `test-todos.md`：

```markdown
# Test Logseq TODOs

TODO This is a regular todo
DOING This task is in progress
LATER This can wait
NOW This is urgent!
DONE This is completed
CANCELED This was cancelled

## In Lists

- TODO Buy groceries
- DOING Write code
- DONE Finish project

## In Headings

### TODO Important Task
### DONE Completed Task
```

### 验证功能

1. **阅读模式**: 切换到阅读模式，应该看到复选框
2. **点击切换**: 点击复选框应该在 TODO/DONE 之间切换
3. **命令**: 打开命令面板 (Cmd/Ctrl + P)，搜索 "Logseq"
4. **设置**: 在插件设置中调整颜色和选项

## 常见问题

### 插件没有出现

- 确保已运行 `npm run dev` 或 `npm run build`
- 检查 `.obsidian/plugins/logseq-todo-compatibility/` 目录是否包含 `main.js`、`manifest.json` 和 `styles.css`
- 在 Obsidian 中重新加载插件

### 复选框没有显示

- 确保在插件设置中启用了 "Enable reading mode rendering"
- 切换到阅读模式（不是编辑模式）
- 检查浏览器控制台是否有错误（Cmd/Ctrl + Shift + I）

### 点击复选框没有反应

- 检查文件是否可写
- 查看控制台是否有错误信息
- 确保 TODO 语法正确（状态后面要有空格）

## 开发技巧

### 调试

在代码中添加 `console.log()` 语句，然后：

1. 打开 Obsidian 开发者工具：Cmd/Ctrl + Shift + I
2. 查看 Console 标签
3. 重新加载插件或触发相关功能

### 热重载

使用 `npm run dev` 时，每次保存文件都会自动重新编译。但你需要在 Obsidian 中手动重新加载插件：

- 打开命令面板 (Cmd/Ctrl + P)
- 搜索 "Reload app without saving"
- 或者禁用再启用插件

### 查看生成的代码

编译后的代码在 `main.js` 中，包含 source map 方便调试。

## 发布流程

### 1. 更新版本号

```bash
npm version patch  # 或 minor, major
```

这会自动更新 `package.json`、`manifest.json` 和 `versions.json`。

### 2. 构建生产版本

```bash
npm run build
```

### 3. 创建 GitHub Release

1. 提交所有更改
2. 推送到 GitHub
3. 创建新的 Release，标签为 `v1.0.0`
4. 上传 `main.js`、`manifest.json` 和 `styles.css`

### 4. 提交到 Obsidian 社区插件

按照 [Obsidian 插件发布指南](https://docs.obsidian.md/Plugins/Releasing/Submit+your+plugin) 操作。

## 项目结构

```
logseq-todo-compatibility/
├── main.ts              # 插件主文件
├── settings.ts          # 设置面板
├── styles.css           # 样式文件
├── manifest.json        # 插件元数据
├── package.json         # npm 配置
├── tsconfig.json        # TypeScript 配置
├── esbuild.config.mjs   # 构建配置
├── version-bump.mjs     # 版本管理脚本
└── README.md            # 文档
```

## 下一步

- 添加更多功能（如统计、过滤等）
- 改进实时预览模式支持
- 添加单元测试
- 优化性能
- 收集用户反馈

## 资源

- [Obsidian API 文档](https://docs.obsidian.md/Plugins/Getting+started/Build+a+plugin)
- [Obsidian 插件示例](https://github.com/obsidianmd/obsidian-sample-plugin)
- [TypeScript 文档](https://www.typescriptlang.org/docs/)
