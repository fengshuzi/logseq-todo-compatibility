# Logseq TODO Examples

这个文件展示了插件支持的所有 Logseq TODO 格式。

## 基础用法

TODO 这是一个待办事项
DOING 这个任务正在进行中
LATER 这个可以稍后处理
NOW 这个很紧急！
DONE 这个已经完成了
CANCELED 这个被取消了

## 在列表中使用

### 无序列表

- TODO 买菜
- DOING 写代码
- LATER 看书
- NOW 修复 bug
- DONE 完成项目
- CANCELED 旧任务

### 有序列表

1. TODO 第一步
2. DOING 第二步
3. DONE 第三步

### 嵌套列表

- TODO 主任务
  - TODO 子任务 1
  - DOING 子任务 2
  - DONE 子任务 3

## 在标题中使用

### TODO 重要任务

这是任务的详细描述。

### DOING 正在进行的任务

这个任务正在处理中。

### DONE 已完成的任务

这个任务已经完成了。

## 混合使用

### 项目管理示例

#### TODO 项目规划阶段

- TODO 确定需求
- TODO 设计架构
- TODO 评估工作量

#### DOING 开发阶段

- DONE 搭建开发环境
- DOING 实现核心功能
- LATER 编写测试
- NOW 修复关键 bug

#### DONE 发布阶段

- DONE 代码审查
- DONE 部署到生产环境
- DONE 编写文档

## 实际场景

### 每日任务

TODO 回复邮件
TODO 参加团队会议
DOING 完成功能开发
NOW 解决线上问题
DONE 代码审查
DONE 更新文档

### 学习计划

TODO 学习 TypeScript 高级特性
DOING 阅读 Obsidian API 文档
LATER 研究插件架构
DONE 完成基础教程

### 购物清单

TODO 买牛奶
TODO 买面包
TODO 买水果
DONE 买蔬菜
CANCELED 买零食（决定不买了）

## 带有其他 Markdown 格式

### 带链接

TODO 阅读 [[Obsidian 文档]]
DOING 实现 [[插件功能]]
DONE 完成 [[项目设计]]

### 带标签

TODO 完成报告 #work #urgent
DOING 学习新技术 #learning
DONE 整理笔记 #personal

### 带代码

TODO 实现 `fetchData()` 函数
DOING 优化 `renderComponent()` 性能
DONE 修复 `handleClick()` bug

### 带强调

TODO **重要**：完成季度总结
DOING *正在进行*：代码重构
DONE ~~已完成~~：文档更新

## 状态转换示例

### 任务生命周期

1. TODO 新任务创建
2. DOING 开始处理任务
3. LATER 暂时搁置（优先级降低）
4. NOW 重新提升优先级
5. DONE 任务完成

### 或者

1. TODO 新任务
2. CANCELED 任务取消（不再需要）

## 颜色说明

在阅读模式下，不同状态会显示不同的颜色：

- TODO: 灰色（默认）
- DOING: 橙色（进行中）
- LATER: 蓝色（稍后处理）
- NOW: 红色（紧急）
- DONE: 绿色（已完成）
- CANCELED: 灰色（已取消）

## 快捷键使用

1. 将光标放在任意行
2. 使用命令面板 (Cmd/Ctrl + P)
3. 搜索 "Logseq" 相关命令：
   - Toggle Logseq TODO/DONE
   - Insert Logseq TODO
   - Cycle Logseq TODO status

## 注意事项

1. 状态关键词必须大写（TODO 而不是 todo）
2. 状态关键词后面必须有空格
3. 在阅读模式下才会显示为复选框
4. 点击复选框会在 TODO 和 DONE 之间切换
5. 使用 "Cycle" 命令可以循环切换所有状态

## 与 Logseq 的兼容性

这个插件完全兼容 Logseq 的 TODO 格式：

- ✅ 文件格式保持不变
- ✅ 可以在 Logseq 和 Obsidian 之间无缝切换
- ✅ 支持所有 Logseq 的任务状态
- ✅ 保持原始文本格式

## 测试清单

使用这个清单测试插件功能：

TODO 测试基础 TODO 渲染
TODO 测试点击切换功能
TODO 测试所有状态（DOING, LATER, NOW, DONE, CANCELED）
TODO 测试列表中的 TODO
TODO 测试标题中的 TODO
TODO 测试命令功能
TODO 测试设置面板
TODO 测试颜色自定义
TODO 测试移动端兼容性
