import { editorLivePreviewField } from 'obsidian';
import { EditorView, Decoration, DecorationSet, WidgetType, ViewPlugin, ViewUpdate } from '@codemirror/view';
import { RangeSetBuilder, EditorState } from '@codemirror/state';
import type LogseqTodoPlugin from './main';

// Logseq 支持的任务状态
type TodoStatus = 'TODO' | 'DOING' | 'LATER' | 'NOW' | 'DONE' | 'CANCELED';

const TODO_REGEX = /^(\s*(?:[-*+]|\d+\.)\s+)?(TODO|DOING|LATER|NOW|DONE|CANCELED)\s+(.+)$/;

/**
 * 复选框 Widget - 替换 TODO 关键词
 */
class TodoCheckboxWidget extends WidgetType {
	constructor(
		private status: TodoStatus,
		private plugin: LogseqTodoPlugin,
		private from: number,
		private to: number
	) {
		super();
	}

	toDOM(view: EditorView): HTMLElement {
		const checkbox = document.createElement('input');
		checkbox.type = 'checkbox';
		checkbox.className = 'task-list-item-checkbox logseq-live-checkbox';
		checkbox.checked = this.status === 'DONE' || this.status === 'CANCELED';
		checkbox.dataset.status = this.status;

		// 点击事件
		checkbox.addEventListener('mousedown', (e) => {
			e.preventDefault();
			e.stopPropagation();
			
			const newStatus = this.status === 'DONE' ? 'TODO' : 'DONE';
			
			view.dispatch({
				changes: {
					from: this.from,
					to: this.to,
					insert: newStatus
				}
			});
		});

		return checkbox;
	}

	ignoreEvent(): boolean {
		return true;
	}
}

/**
 * 状态标签 Widget
 */
class TodoStatusWidget extends WidgetType {
	constructor(private status: TodoStatus) {
		super();
	}

	toDOM(): HTMLElement {
		const label = document.createElement('span');
		label.className = `logseq-status-badge logseq-status-${this.status.toLowerCase()}`;
		label.textContent = this.status;
		return label;
	}

	ignoreEvent(): boolean {
		return true;
	}
}

/**
 * 创建装饰器
 */
function createDecorations(view: EditorView, plugin: LogseqTodoPlugin): DecorationSet {
	const builder = new RangeSetBuilder<Decoration>();
	
	// 只在 Live Preview 模式下工作
	if (!view.state.field(editorLivePreviewField)) {
		return builder.finish();
	}

	for (const { from, to } of view.visibleRanges) {
		for (let pos = from; pos <= to;) {
			const line = view.state.doc.lineAt(pos);
			const lineText = line.text;
			const match = lineText.match(TODO_REGEX);

			if (match) {
				const [, listMarker, status, content] = match;
				const listMarkerLen = listMarker ? listMarker.length : 0;
				const statusStart = line.from + listMarkerLen;
				const statusEnd = statusStart + status.length;

				// 替换状态关键词为复选框
				builder.add(
					statusStart,
					statusEnd,
					Decoration.replace({
						widget: new TodoCheckboxWidget(
							status as TodoStatus,
							plugin,
							statusStart,
							statusEnd
						)
					})
				);

				// 如果启用了状态标签且不是 TODO/DONE，添加标签
				if (plugin.settings.showStatusLabel && status !== 'TODO' && status !== 'DONE') {
					builder.add(
						statusEnd,
						statusEnd,
						Decoration.widget({
							widget: new TodoStatusWidget(status as TodoStatus),
							side: 1
						})
					);
				}

				// 如果是完成状态，添加删除线样式
				if ((status === 'DONE' || status === 'CANCELED') && plugin.settings.enableStrikethrough) {
					const contentStart = statusEnd + 1; // +1 for space
					builder.add(
						contentStart,
						line.to,
						Decoration.mark({
							class: 'logseq-todo-completed'
						})
					);
				}
			}

			pos = line.to + 1;
		}
	}

	return builder.finish();
}

/**
 * ViewPlugin 用于管理装饰器
 */
export function createLogseqTodoViewPlugin(plugin: LogseqTodoPlugin) {
	return ViewPlugin.fromClass(
		class {
			decorations: DecorationSet;

			constructor(view: EditorView) {
				this.decorations = createDecorations(view, plugin);
			}

			update(update: ViewUpdate): void {
				if (update.docChanged || update.viewportChanged || update.selectionSet) {
					this.decorations = createDecorations(update.view, plugin);
				}
			}
		},
		{
			decorations: (v) => v.decorations
		}
	);
}

/**
 * 创建编辑器扩展
 */
export function createLogseqTodoExtension(plugin: LogseqTodoPlugin) {
	return [
		createLogseqTodoViewPlugin(plugin),
		// 添加基础样式
		EditorView.baseTheme({
			'.logseq-live-checkbox': {
				cursor: 'pointer',
				margin: '0 0.3em 0 0',
				verticalAlign: 'middle'
			},
			'.logseq-status-badge': {
				display: 'inline-block',
				padding: '0.1em 0.4em',
				marginLeft: '0.3em',
				fontSize: '0.7em',
				fontWeight: '600',
				borderRadius: '3px',
				textTransform: 'uppercase',
				letterSpacing: '0.5px',
				verticalAlign: 'middle'
			},
			'.logseq-status-doing': {
				backgroundColor: 'var(--logseq-doing-color, #ff9800)',
				color: 'white'
			},
			'.logseq-status-later': {
				backgroundColor: 'var(--logseq-later-color, #2196f3)',
				color: 'white'
			},
			'.logseq-status-now': {
				backgroundColor: 'var(--logseq-now-color, #f44336)',
				color: 'white'
			},
			'.logseq-todo-completed': {
				// 不添加删除线
				opacity: '0.8'
			}
		})
	];
}
