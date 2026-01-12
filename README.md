# Logseq TODO Compatibility for Obsidian

An Obsidian plugin that renders Logseq-style TODO/DONE markers as checkboxes, enabling seamless compatibility between Logseq and Obsidian.

## Features

- ✅ Render Logseq TODO markers as interactive checkboxes
- 📝 **Live Preview Mode Support** - Works in editing mode (所见即所得)
- 📖 **Reading Mode Support** - Works in reading mode
- 🎨 Support for all Logseq task statuses (TODO, DOING, LATER, NOW, DONE, CANCELED)
- 🖱️ Click checkboxes to toggle between TODO and DONE
- ⌨️ Keyboard shortcuts for quick task management
- 🎨 Customizable colors for different statuses
- 📱 Works on desktop and mobile

## Supported Statuses

| Logseq Status | Display | Color |
|--------------|---------|-------|
| `TODO` | ☐ Unchecked | Gray |
| `DOING` | ☐ Unchecked | Orange |
| `LATER` | ☐ Unchecked | Blue |
| `NOW` | ☐ Unchecked | Red |
| `DONE` | ☑ Checked | Green |
| `CANCELED` | ☑ Checked | Gray |

## Usage

### Basic Syntax

Simply write Logseq-style TODO markers in your notes:

```markdown
TODO Buy groceries
DOING Write documentation
LATER Read book
NOW Fix critical bug
DONE Complete project
CANCELED Old task
```

In reading mode, these will be rendered as checkboxes.

### Commands

The plugin provides three commands (accessible via Command Palette):

1. **Toggle Logseq TODO/DONE** - Toggle current line between TODO and DONE
2. **Insert Logseq TODO** - Insert TODO at cursor position
3. **Cycle Logseq TODO status** - Cycle through all statuses (TODO → DOING → LATER → NOW → DONE → CANCELED → TODO)

### Keyboard Shortcuts

You can assign custom keyboard shortcuts to these commands in Obsidian's Hotkeys settings.

## Installation

### From Obsidian Community Plugins (Coming Soon)

1. Open Settings → Community Plugins
2. Search for "Logseq TODO Compatibility"
3. Click Install
4. Enable the plugin

### Manual Installation

1. Download the latest release from GitHub
2. Extract the files to your vault's `.obsidian/plugins/logseq-todo-compatibility/` folder
3. Reload Obsidian
4. Enable the plugin in Settings → Community Plugins

### Development Installation

```bash
cd /path/to/your/vault/.obsidian/plugins/
git clone https://github.com/yourusername/logseq-todo-compatibility.git
cd logseq-todo-compatibility
npm install
npm run dev
```

## Settings

### General Settings

- **Enable reading mode rendering** - Toggle checkbox rendering in reading mode
- **Enable live preview rendering** - Toggle checkbox rendering in live preview mode (所见即所得)
- **Show status labels** - Display status labels (DOING, LATER, NOW) next to checkboxes
- **Enable strikethrough for completed tasks** - Add strikethrough to DONE/CANCELED tasks

### Color Customization

Customize the accent color for each status type to match your theme or preferences.

## Compatibility

- **Obsidian Version**: 0.15.0 or higher
- **Platform**: Desktop and Mobile
- **File Format**: Works with standard Markdown files

## Why This Plugin?

If you use both Logseq and Obsidian, you might have notes with Logseq-style TODO markers. This plugin makes those notes look and work great in Obsidian without requiring any file modifications.

### Benefits

- 📝 Keep your notes in Logseq format
- 🔄 Seamless switching between Logseq and Obsidian
- 👀 Better visual representation in Obsidian
- ✏️ Edit tasks directly in Obsidian

## Examples

### In Your Markdown File

```markdown
# Project Tasks

TODO Set up development environment
DOING Implement core features
LATER Write tests
NOW Fix critical bug
DONE Initial setup
CANCELED Old approach
```

### How It Renders

In reading mode, you'll see:

- ☐ Set up development environment
- ☐ **DOING** Implement core features (orange)
- ☐ **LATER** Write tests (blue)
- ☐ **NOW** Fix critical bug (red)
- ☑ ~~Initial setup~~ (green)
- ☑ ~~Old approach~~ (gray)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - see LICENSE file for details

## Support

If you find this plugin helpful, consider:
- ⭐ Starring the repository
- 🐛 Reporting bugs
- 💡 Suggesting features
- ☕ Buying me a coffee

## Changelog

### 1.0.0 (Initial Release)

- Basic TODO/DONE rendering
- Support for all Logseq statuses
- **Live Preview mode support** (所见即所得)
- Reading mode support
- Click to toggle functionality
- Keyboard commands
- Customizable colors
- Settings panel

## Credits

Inspired by Logseq's task management system and the Obsidian community's need for better cross-app compatibility.
