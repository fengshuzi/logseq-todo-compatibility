# 功能特性详解

## 1. 渲染模式

### 阅读模式
在阅读模式下，Logseq 风格的 TODO 标记会被渲染为复选框。

**示例：**
```markdown
TODO 买菜
DOING 写代码
DONE 完成任务
```

**显示为：**
- ☐ 买菜
- ☐ 写代码（橙色）
- ☑ 完成任务（绿色，删除线）

### 实时预览模式（所见即所得）
在编辑时也能看到复选框，真正的所见即所得体验。

**特点：**
- 编辑时实时渲染
- 点击复选框直接切换状态
- 保持源码格式不变
- 支持列表嵌套

## 2. 支持的任务状态

| 状态 | 显示 | 颜色 | 含义 | 快捷切换 |
|------|------|------|------|----------|
| TODO | ☐ | 灰色 | 待办 | → DOING |
| DOING | ☐ | 橙色 | 进行中 | → LATER |
| LATER | ☐ | 蓝色 | 稍后处理 | → NOW |
| NOW | ☐ | 红色 | 紧急 | → DONE |
| DONE | ☑ | 绿色 | 已完成 | → CANCELED |
| CANCELED | ☑ | 灰色 | 已取消 | → TODO |

## 3. 命令系统

### Toggle Logseq TODO/DONE
快速在 TODO 和 DONE 之间切换。

**使用场景：**
- 快速标记任务完成
- 重新激活已完成的任务

**行为：**
- 如果是 TODO → 变为 DONE
- 如果是 DONE → 变为 TODO
- 如果不是任务行 → 添加 TODO 前缀

### Insert Logseq TODO
在当前位置插入 TODO。

**使用场景：**
- 快速创建新任务
- 将普通文本转换为任务

**行为：**
- 保持当前缩进
- 在行首添加 TODO

### Insert Logseq TODO task（重点功能）
插入 Logseq 风格的 TODO 任务，可以替代 Obsidian 原生的 `Cmd+Enter` 复选框。

**使用场景：**
- 创建新的任务列表项
- 替代 `- [ ]` 格式

**行为：**
```markdown
# 场景 1: 空行
按 Cmd+Enter
→ - TODO |

# 场景 2: 已有列表项
- 现有内容
按 Cmd+Enter
→ - 现有内容
  - TODO |

# 场景 3: 空列表项
- 
按 Cmd+Enter
→ - TODO |
```

**设置快捷键：**
1. Settings → Hotkeys
2. 搜索 "Insert Logseq TODO task"
3. 设置为 `Cmd+Enter`
4. 如果冲突，先删除原有的 "Toggle checklist status" 绑定

### Cycle Logseq TODO status
循环切换所有状态。

**使用场景：**
- 需要精确控制任务状态
- 使用所有 6 种状态

**循环顺序：**
TODO → DOING → LATER → NOW → DONE → CANCELED → TODO

## 4. 交互方式

### 点击复选框
在阅读模式和实时预览模式下，点击复选框会在 TODO 和 DONE 之间切换。

**特点：**
- 即时生效
- 自动保存
- 保持格式

### 右键菜单（计划中）
未来版本将支持右键菜单快速切换状态。

## 5. 格式支持

### 列表格式
```markdown
- TODO 任务 1
* TODO 任务 2
+ TODO 任务 3
1. TODO 任务 4
2. TODO 任务 5
```

### 嵌套列表
```markdown
- TODO 主任务
  - TODO 子任务 1
  - DOING 子任务 2
    - TODO 子子任务
```

### 标题中的任务
```markdown
## TODO 重要任务
### DOING 进行中的任务
```

### 段落中的任务
```markdown
TODO 这是一个独立的任务段落
```

## 6. 自定义设置

### 颜色自定义
每个状态都可以自定义颜色：

```css
--logseq-todo-color: #808080
--logseq-doing-color: #ff9800
--logseq-later-color: #2196f3
--logseq-now-color: #f44336
--logseq-done-color: #4caf50
--logseq-canceled-color: #9e9e9e
```

### 显示选项
- **状态标签**：显示 DOING、LATER、NOW 标签
- **删除线**：完成的任务显示删除线
- **渲染模式**：选择在哪些模式下渲染

### Cmd+Enter 行为
- **默认**：使用 Obsidian 原生的 `- [ ]`
- **启用插件**：使用 Logseq 的 `TODO`

## 7. 与 Logseq 的兼容性

### 完全兼容
- ✅ 所有 Logseq 任务状态
- ✅ 文件格式保持不变
- ✅ 可以在两个应用间无缝切换

### 迁移建议
如果你从 Logseq 迁移到 Obsidian：
1. 安装本插件
2. 启用所有渲染模式
3. 设置 Cmd+Enter 为 TODO 格式
4. 自定义颜色（可选）

## 8. 性能优化

### 渲染优化
- 只渲染可见区域
- 增量更新
- 缓存装饰器

### 文件操作
- 批量更新
- 防抖处理
- 异步保存

## 9. 已知限制

### 当前版本
- 不支持 Logseq 的 SCHEDULED 和 DEADLINE
- 不支持优先级标记 [#A] [#B] [#C]
- 不支持任务统计视图

### 计划功能
- [ ] 任务统计面板
- [ ] 批量操作
- [ ] 过滤和搜索
- [ ] 优先级支持
- [ ] 日期支持

## 10. 最佳实践

### 推荐工作流

1. **创建任务**
   - 使用 `Cmd+Enter` 快速创建
   - 或输入 `TODO` 后空格

2. **管理状态**
   - 点击复选框标记完成
   - 使用 Cycle 命令精确控制

3. **组织任务**
   - 使用列表嵌套
   - 使用标题分组

4. **查看任务**
   - 阅读模式：清晰的复选框视图
   - 实时预览：边编辑边查看
   - 源码模式：保持原始格式

### 快捷键建议

```
Cmd+Enter     → Insert Logseq TODO task
Cmd+Shift+T   → Toggle Logseq TODO/DONE
Cmd+Shift+C   → Cycle Logseq TODO status
```

### 文件组织

```markdown
# 项目名称

## TODO 待办事项
- TODO 任务 1
- TODO 任务 2

## DOING 进行中
- DOING 任务 3
- DOING 任务 4

## DONE 已完成
- DONE 任务 5
- DONE 任务 6
```

## 11. 故障排除

### 复选框不显示
1. 检查是否启用了渲染模式
2. 确认在正确的视图模式（阅读/实时预览）
3. 检查语法是否正确（状态后要有空格）

### Cmd+Enter 不工作
1. 检查快捷键设置
2. 确认没有冲突
3. 重新加载 Obsidian

### 状态切换失败
1. 检查文件是否可写
2. 查看控制台错误
3. 尝试手动编辑

## 12. 技术细节

### 架构
- **阅读模式**：MarkdownPostProcessor
- **实时预览**：CodeMirror 6 Extension
- **状态管理**：Obsidian Settings API

### 依赖
- Obsidian API
- CodeMirror 6
- TypeScript

### 性能指标
- 渲染延迟：< 16ms
- 内存占用：< 5MB
- 文件操作：异步非阻塞
