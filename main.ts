import { Plugin, MarkdownPostProcessorContext, TFile, Editor } from 'obsidian';
import { LogseqTodoSettingTab, type LogseqTodoSettings, DEFAULT_SETTINGS } from './settings';
import { createLogseqTodoExtension } from './editor-extension';

// Logseq 支持的任务状态
type TodoStatus = 'TODO' | 'DOING' | 'LATER' | 'NOW' | 'DONE' | 'CANCELED';

const TODO_STATUSES: TodoStatus[] = ['TODO', 'DOING', 'LATER', 'NOW', 'DONE', 'CANCELED'];

export default class LogseqTodoPlugin extends Plugin {
	settings!: LogseqTodoSettings;

	async onload() {
		console.log('Loading Logseq TODO Compatibility Plugin');

		// 加载设置
		await this.loadSettings();

		// 注册 Markdown 后处理器（阅读模式）
		this.registerMarkdownPostProcessor(this.postProcessor.bind(this));

		// 注册编辑器扩展（实时预览模式）
		if (this.settings.enableLivePreview) {
			this.registerEditorExtension(createLogseqTodoExtension(this));
		}

		// 添加命令：切换 TODO 状态
		this.addCommand({
			id: 'toggle-logseq-todo',
			name: 'Toggle Logseq TODO/DONE',
			editorCallback: (editor: Editor) => {
				this.toggleTodoAtCursor(editor);
			}
		});

		// 添加命令：循环切换状态
		this.addCommand({
			id: 'cycle-logseq-todo-status',
			name: 'Cycle Logseq TODO status',
			editorCallback: (editor: Editor) => {
				this.cycleTodoStatus(editor);
			}
		});

		// 添加命令：插入 Logseq TODO 任务（用于 Cmd+Enter）
		this.addCommand({
			id: 'insert-logseq-todo-task',
			name: 'Insert Logseq TODO task',
			editorCallback: (editor: Editor) => {
				this.insertTodoTask(editor);
			}
		});

		// 添加设置选项卡
		this.addSettingTab(new LogseqTodoSettingTab(this.app, this));
	}

	onunload() {
		console.log('Unloading Logseq TODO Compatibility Plugin');
	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}

	/**
	 * Markdown 后处理器 - 在阅读模式中渲染 TODO 为复选框
	 */
	postProcessor(element: HTMLElement, context: MarkdownPostProcessorContext): void {
		if (!this.settings.enableReadingMode) return;

		// 处理列表项
		const listItems = element.querySelectorAll('li');
		listItems.forEach((li) => {
			if (li instanceof HTMLElement) {
				this.processListItem(li, context);
			}
		});

		// 处理标题
		const headings = element.querySelectorAll('h1, h2, h3, h4, h5, h6');
		headings.forEach((heading) => {
			if (heading instanceof HTMLElement) {
				this.processHeading(heading, context);
			}
		});

		// 处理段落
		const paragraphs = element.querySelectorAll('p');
		paragraphs.forEach((p) => {
			if (p instanceof HTMLElement) {
				this.processParagraph(p, context);
			}
		});
	}

	/**
	 * 处理列表项
	 */
	processListItem(li: HTMLElement, context: MarkdownPostProcessorContext): void {
		const text = li.textContent || '';
		const match = text.match(/^(TODO|DOING|LATER|NOW|DONE|CANCELED)\s+(.+)$/);

		if (match) {
			const [, status, content] = match;
			const checkbox = this.createCheckbox(status as TodoStatus, content, context, li);
			li.innerHTML = '';
			li.appendChild(checkbox);
			li.classList.add('logseq-todo-list-item');
		}
	}

	/**
	 * 处理标题
	 */
	processHeading(heading: HTMLElement, context: MarkdownPostProcessorContext): void {
		const text = heading.textContent || '';
		const match = text.match(/^(TODO|DOING|LATER|NOW|DONE|CANCELED)\s+(.+)$/);

		if (match) {
			const [, status, content] = match;
			const checkbox = this.createCheckbox(status as TodoStatus, content, context, heading);
			heading.innerHTML = '';
			heading.appendChild(checkbox);
			heading.classList.add('logseq-todo-heading');
		}
	}

	/**
	 * 处理段落
	 */
	processParagraph(p: HTMLElement, context: MarkdownPostProcessorContext): void {
		const text = p.textContent || '';
		const match = text.match(/^(TODO|DOING|LATER|NOW|DONE|CANCELED)\s+(.+)$/);

		if (match) {
			const [, status, content] = match;
			const checkbox = this.createCheckbox(status as TodoStatus, content, context, p);
			p.innerHTML = '';
			p.appendChild(checkbox);
			p.classList.add('logseq-todo-paragraph');
		}
	}

	/**
	 * 创建复选框元素
	 */
	createCheckbox(status: TodoStatus, content: string, context: MarkdownPostProcessorContext, originalElement: HTMLElement): HTMLElement {
		const container = document.createElement('div');
		container.className = 'logseq-todo-item';
		container.dataset.status = status;

		const checkbox = document.createElement('input');
		checkbox.type = 'checkbox';
		checkbox.className = 'task-list-item-checkbox logseq-checkbox';
		checkbox.checked = status === 'DONE' || status === 'CANCELED';

		// 添加状态类
		container.classList.add(`logseq-status-${status.toLowerCase()}`);

		// 点击事件：切换状态
		checkbox.addEventListener('click', async (e) => {
			e.preventDefault();
			await this.toggleTodoInFile(context, status, content);
		});

		const label = document.createElement('span');
		label.className = 'logseq-todo-content';
		label.textContent = content;

		// 如果启用了状态标签显示
		if (this.settings.showStatusLabel && status !== 'TODO' && status !== 'DONE') {
			const statusLabel = document.createElement('span');
			statusLabel.className = 'logseq-status-label';
			statusLabel.textContent = status;
			container.appendChild(statusLabel);
		}

		container.appendChild(checkbox);
		container.appendChild(label);

		return container;
	}

	/**
	 * 在文件中切换 TODO 状态
	 */
	async toggleTodoInFile(context: MarkdownPostProcessorContext, currentStatus: TodoStatus, content: string): Promise<void> {
		const file = this.app.vault.getAbstractFileByPath(context.sourcePath);
		if (!file || !(file instanceof TFile)) return;

		const fileContent = await this.app.vault.read(file);
		const newStatus = currentStatus === 'DONE' ? 'TODO' : 'DONE';

		// 转义特殊字符用于正则表达式
		const escapedContent = content.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
		
		// 替换状态（精确匹配整行）
		const regex = new RegExp(`^(\\s*)${currentStatus}\\s+${escapedContent}`, 'gm');
		const newContent = fileContent.replace(regex, `$1${newStatus} ${content}`);

		if (newContent !== fileContent) {
			await this.app.vault.modify(file, newContent);
		}
	}

	/**
	 * 在光标位置切换 TODO 状态
	 */
	toggleTodoAtCursor(editor: Editor): void {
		const cursor = editor.getCursor();
		const line = editor.getLine(cursor.line);

		const todoMatch = line.match(/^(\s*)(TODO|DOING|LATER|NOW|DONE|CANCELED)\s+(.+)$/);

		if (todoMatch) {
			const [, indent, status, content] = todoMatch;
			const newStatus = status === 'DONE' ? 'TODO' : 'DONE';
			editor.setLine(cursor.line, `${indent}${newStatus} ${content}`);
		} else {
			// 如果不是 TODO 行，添加 TODO
			const indent = line.match(/^(\s*)/)?.[1] || '';
			const trimmedLine = line.trim();
			if (trimmedLine) {
				editor.setLine(cursor.line, `${indent}TODO ${trimmedLine}`);
			} else {
				editor.setLine(cursor.line, `${indent}TODO `);
			}
		}
	}

	/**
	 * 循环切换 TODO 状态
	 */
	cycleTodoStatus(editor: Editor): void {
		const cursor = editor.getCursor();
		const line = editor.getLine(cursor.line);

		const todoMatch = line.match(/^(\s*)(TODO|DOING|LATER|NOW|DONE|CANCELED)\s+(.+)$/);

		if (todoMatch) {
			const [, indent, status, content] = todoMatch;
			const currentIndex = TODO_STATUSES.indexOf(status as TodoStatus);
			const nextIndex = (currentIndex + 1) % TODO_STATUSES.length;
			const newStatus = TODO_STATUSES[nextIndex];
			editor.setLine(cursor.line, `${indent}${newStatus} ${content}`);
		} else {
			// 如果不是 TODO 行，添加 TODO
			const indent = line.match(/^(\s*)/)?.[1] || '';
			const trimmedLine = line.trim();
			if (trimmedLine) {
				editor.setLine(cursor.line, `${indent}TODO ${trimmedLine}`);
			}
		}
	}

	/**
	 * 插入 Logseq TODO 任务（替代 Cmd+Enter 的 checkbox）
	 * 简单的切换逻辑：
	 * - 如果是 "- 任务" → 变成 "- TODO 任务"
	 * - 如果是 "- TODO 任务" → 变成 "- 任务"
	 */
	insertTodoTask(editor: Editor): void {
		const cursor = editor.getCursor();
		const line = editor.getLine(cursor.line);
		
		// 获取当前行的缩进
		const indent = line.match(/^(\s*)/)?.[1] || '';
		
		// 1. 检查是否是原生 markdown 复选框 (- [ ] 或 - [x])
		const checkboxMatch = line.match(/^(\s*)([-*+]|\d+\.)\s+\[([ xX])\]\s+(.*)$/);
		if (checkboxMatch) {
			// 将原生复选框转换为 TODO 格式
			const [, currentIndent, marker, , content] = checkboxMatch;
			const newLine = `${currentIndent}${marker} TODO ${content}`;
			editor.setLine(cursor.line, newLine);
			return;
		}
		
		// 2. 检查是否已经有 TODO 状态（任何状态）
		const todoMatch = line.match(/^(\s*)([-*+]|\d+\.)\s+(TODO|DOING|LATER|NOW|DONE|CANCELED)\s+(.*)$/);
		if (todoMatch) {
			// 已经有 TODO，移除它
			const [, currentIndent, marker, , content] = todoMatch;
			const newLine = `${currentIndent}${marker} ${content}`;
			editor.setLine(cursor.line, newLine);
			return;
		}
		
		// 3. 检查是否是普通列表项
		const listMatch = line.match(/^(\s*)([-*+]|\d+\.)\s+(.*)$/);
		if (listMatch) {
			const [, currentIndent, marker, content] = listMatch;
			
			if (content.trim()) {
				// 有内容，添加 TODO
				const newLine = `${currentIndent}${marker} TODO ${content}`;
				editor.setLine(cursor.line, newLine);
			} else {
				// 空列表项，添加 TODO
				const newLine = `${currentIndent}${marker} TODO `;
				editor.setLine(cursor.line, newLine);
			}
		} else {
			// 4. 不是列表项
			if (line.trim()) {
				// 有内容，转换为 TODO 列表
				const content = line.trim();
				const newLine = `${indent}- TODO ${content}`;
				editor.setLine(cursor.line, newLine);
			} else {
				// 空行，创建新的 TODO 列表项
				const newLine = `${indent}- TODO `;
				editor.setLine(cursor.line, newLine);
			}
		}
	}
}
