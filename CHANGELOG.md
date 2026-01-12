# Changelog

All notable changes to this project will be documented in this file.

## [1.0.0] - 2024-12-26

### Added
- Initial release
- Render Logseq TODO markers as checkboxes
- **Live Preview mode support** - Works in editing mode (所见即所得)
- Reading mode support
- Support for all Logseq task statuses:
  - TODO (gray)
  - DOING (orange)
  - LATER (blue)
  - NOW (red)
  - DONE (green)
  - CANCELED (gray)
- Click to toggle between TODO and DONE
- Three keyboard commands:
  - Toggle Logseq TODO/DONE
  - Insert Logseq TODO
  - Cycle Logseq TODO status
- Customizable colors for each status
- Settings panel with options:
  - Enable/disable reading mode rendering
  - Enable/disable live preview rendering
  - Show/hide status labels
  - Enable/disable strikethrough for completed tasks
- Automatic deployment scripts for development
- Comprehensive documentation

### Technical Details
- Built with TypeScript
- Uses CodeMirror 6 for live preview mode
- Uses MarkdownPostProcessor for reading mode
- Fully typed with strict TypeScript settings
- Supports both desktop and mobile

## Future Plans

### Planned Features
- [ ] Statistics view (show TODO counts)
- [ ] Filter by status
- [ ] Bulk operations
- [ ] Custom keyboard shortcuts
- [ ] Integration with Obsidian Tasks plugin
- [ ] Export/import settings
- [ ] Theme integration

### Known Issues
- None reported yet

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - see LICENSE file for details
