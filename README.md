# Superpowers: Developing for Claude Code

A Claude Code plugin providing skills and comprehensive documentation for building plugins, skills, MCP servers, and other Claude Code extensions.

## Features

### Skills

#### working-with-claude-code
Complete, authoritative documentation for Claude Code directly from docs.claude.com.

- **42 documentation files** covering all Claude Code features
- **Self-update script** to fetch latest docs
- **Quick reference table** for common tasks
- **Progressive disclosure** - load only what you need

Topics covered:
- Plugin development
- Skill creation
- MCP server integration
- Hooks configuration
- CLI commands
- Integrations (VS Code, JetBrains, GitHub Actions, etc.)
- Configuration, security, networking
- Troubleshooting

## Installation

### Development Mode

1. Add the development marketplace:
```bash
claude
/plugin marketplace add /path/to/superpowers-developing-for-claude-code
```

2. Install the plugin:
```bash
/plugin install superpowers-developing-for-claude-code@superpowers-developing-for-claude-code-dev
```

3. Restart Claude Code

## Usage

The skills are automatically available to Claude when working on tasks that match their descriptions.

### Updating Documentation

To fetch the latest Claude Code documentation:

```bash
node ~/.claude/plugins/plugin:superpowers-developing-for-claude-code@superpowers-developing-for-claude-code-dev/skills/working-with-claude-code/scripts/update_docs.js
```

Or ask Claude to update it:
```
Update the Claude Code documentation in the working-with-claude-code skill
```

## Development

### Structure

```
superpowers-developing-for-claude-code/
├── .claude-plugin/
│   ├── plugin.json           # Plugin metadata
│   └── marketplace.json      # Dev marketplace config
├── skills/
│   └── working-with-claude-code/
│       ├── SKILL.md          # Skill documentation
│       ├── scripts/
│       │   └── update_docs.js
│       └── references/       # 42 documentation files
└── README.md
```

### Adding More Skills

Future skills to consider:
- `extending-claude-code` - Workflows for building extensions
- `testing-claude-code-plugins` - Testing strategies
- `distributing-plugins` - Publishing and marketplace guidelines

## License

MIT License - See LICENSE file

## Author

Jesse Vincent <jesse@fsck.com>

## Repository

https://github.com/obra/superpowers-developing-for-claude-code
