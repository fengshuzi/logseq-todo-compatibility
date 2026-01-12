import { App, PluginSettingTab, Setting, ToggleComponent, TextComponent, Notice } from 'obsidian';
import type LogseqTodoPlugin from './main';

export interface LogseqTodoSettings {
	enableReadingMode: boolean;
	enableLivePreview: boolean;
	showStatusLabel: boolean;
	enableStrikethrough: boolean;
	interceptChecklistCommand: boolean;
	customColors: {
		todo: string;
		doing: string;
		later: string;
		now: string;
		done: string;
		canceled: string;
	};
}

export const DEFAULT_SETTINGS: LogseqTodoSettings = {
	enableReadingMode: true,
	enableLivePreview: true,
	showStatusLabel: true,
	enableStrikethrough: true,
	interceptChecklistCommand: false,
	customColors: {
		todo: '#808080',
		doing: '#ff9800',
		later: '#2196f3',
		now: '#f44336',
		done: '#4caf50',
		canceled: '#9e9e9e'
	}
};

export class LogseqTodoSettingTab extends PluginSettingTab {
	plugin: LogseqTodoPlugin;

	constructor(app: App, plugin: LogseqTodoPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;

		containerEl.empty();

		containerEl.createEl('h2', { text: 'Logseq TODO Compatibility Settings' });

		// 启用阅读模式渲染
		new Setting(containerEl)
			.setName('Enable reading mode rendering')
			.setDesc('Render Logseq TODO markers as checkboxes in reading mode')
			.addToggle((toggle: ToggleComponent) => toggle
				.setValue(this.plugin.settings.enableReadingMode)
				.onChange(async (value: boolean) => {
					this.plugin.settings.enableReadingMode = value;
					await this.plugin.saveSettings();
				}));

		// 启用实时预览模式渲染
		new Setting(containerEl)
			.setName('Enable live preview rendering')
			.setDesc('Render Logseq TODO markers as checkboxes in live preview mode (requires restart)')
			.addToggle((toggle: ToggleComponent) => toggle
				.setValue(this.plugin.settings.enableLivePreview)
				.onChange(async (value: boolean) => {
					this.plugin.settings.enableLivePreview = value;
					await this.plugin.saveSettings();
					// 提示需要重启
					new Notice('Please reload Obsidian for this change to take effect');
				}));

		// 显示状态标签
		new Setting(containerEl)
			.setName('Show status labels')
			.setDesc('Display status labels (DOING, LATER, NOW) next to checkboxes')
			.addToggle((toggle: ToggleComponent) => toggle
				.setValue(this.plugin.settings.showStatusLabel)
				.onChange(async (value: boolean) => {
					this.plugin.settings.showStatusLabel = value;
					await this.plugin.saveSettings();
				}));

		// 启用删除线
		new Setting(containerEl)
			.setName('Enable strikethrough for completed tasks')
			.setDesc('Add strikethrough style to DONE and CANCELED tasks')
			.addToggle((toggle: ToggleComponent) => toggle
				.setValue(this.plugin.settings.enableStrikethrough)
				.onChange(async (value: boolean) => {
					this.plugin.settings.enableStrikethrough = value;
					await this.plugin.saveSettings();
				}));

		// 拦截 Cmd+Enter 命令
		new Setting(containerEl)
			.setName('Use TODO instead of checkbox for Cmd+Enter')
			.setDesc('When enabled, adds a command that you can bind to Cmd+Enter to use TODO instead of [ ]. You need to manually set the hotkey in Settings → Hotkeys and disable the default "Toggle checklist status" command.')
			.addToggle((toggle: ToggleComponent) => toggle
				.setValue(this.plugin.settings.interceptChecklistCommand)
				.onChange(async (value: boolean) => {
					this.plugin.settings.interceptChecklistCommand = value;
					await this.plugin.saveSettings();
					new Notice('Please reload Obsidian and set the hotkey manually in Settings → Hotkeys');
				}));

		// 颜色设置
		containerEl.createEl('h3', { text: 'Status Colors' });

		const colorSettings = [
			{ key: 'todo', name: 'TODO', desc: 'Color for TODO status' },
			{ key: 'doing', name: 'DOING', desc: 'Color for DOING status' },
			{ key: 'later', name: 'LATER', desc: 'Color for LATER status' },
			{ key: 'now', name: 'NOW', desc: 'Color for NOW status' },
			{ key: 'done', name: 'DONE', desc: 'Color for DONE status' },
			{ key: 'canceled', name: 'CANCELED', desc: 'Color for CANCELED status' }
		];

		colorSettings.forEach(({ key, name, desc }) => {
			new Setting(containerEl)
				.setName(name)
				.setDesc(desc)
				.addText((text: TextComponent) => text
					.setPlaceholder('#000000')
					.setValue(this.plugin.settings.customColors[key as keyof typeof this.plugin.settings.customColors])
					.onChange(async (value: string) => {
						this.plugin.settings.customColors[key as keyof typeof this.plugin.settings.customColors] = value;
						await this.plugin.saveSettings();
						this.updateStyles();
					}));
		});

		// 使用说明
		containerEl.createEl('h3', { text: 'Usage' });
		const usageDiv = containerEl.createDiv();
		usageDiv.innerHTML = `
			<p>This plugin renders Logseq-style TODO markers as checkboxes in Obsidian.</p>
			<h4>Modes:</h4>
			<ul>
				<li><strong>Reading Mode</strong> - Renders checkboxes when viewing notes</li>
				<li><strong>Live Preview Mode</strong> - Renders checkboxes while editing (所见即所得)</li>
			</ul>
			<h4>Supported Statuses:</h4>
			<ul>
				<li><strong>TODO</strong> - Unchecked checkbox</li>
				<li><strong>DOING</strong> - Unchecked checkbox (orange)</li>
				<li><strong>LATER</strong> - Unchecked checkbox (blue)</li>
				<li><strong>NOW</strong> - Unchecked checkbox (red)</li>
				<li><strong>DONE</strong> - Checked checkbox (green)</li>
				<li><strong>CANCELED</strong> - Checked checkbox (gray)</li>
			</ul>
			<h4>Commands:</h4>
			<ul>
				<li><strong>Toggle Logseq TODO/DONE</strong> - Toggle between TODO and DONE</li>
				<li><strong>Insert Logseq TODO</strong> - Insert TODO at cursor</li>
				<li><strong>Insert Logseq TODO task</strong> - Insert TODO task (can replace Cmd+Enter)</li>
				<li><strong>Cycle Logseq TODO status</strong> - Cycle through all statuses</li>
			</ul>
			<h4>Keyboard Shortcuts:</h4>
			<p>You can customize keyboard shortcuts in Obsidian's Hotkeys settings. The "Insert Logseq TODO task" command is pre-configured with Cmd+Enter, but you may need to disable the default Obsidian checklist command first.</p>
			<h4>Example:</h4>
			<pre>TODO Buy groceries
DOING Write documentation
LATER Read book
NOW Fix bug
DONE Complete project
CANCELED Old task</pre>
		`;
	}

	updateStyles(): void {
		// 动态更新 CSS 变量
		const root = document.documentElement;
		Object.entries(this.plugin.settings.customColors).forEach(([key, value]) => {
			root.style.setProperty(`--logseq-${key}-color`, value);
		});
	}
}
