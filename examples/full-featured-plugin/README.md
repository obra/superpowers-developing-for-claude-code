# Full-Featured Plugin Example

This is a complete example demonstrating all Claude Code plugin component types working together.

## What This Demonstrates

- **Skills** - Process workflows and domain knowledge (`skills/workflow/`)
- **Commands** - Custom slash commands (`commands/hello.md`)
- **Hooks** - Event-driven automation (`hooks/hooks.json`)
- **MCP Servers** - Tool integration via Model Context Protocol (`mcp/server.js`)

## Installation (for testing)

```bash
# Add the development marketplace
/plugin marketplace add /path/to/superpowers-developing-for-claude-code/examples/full-featured-plugin

# Install the plugin
/plugin install full-featured-example@full-featured-dev

# Restart Claude Code to load the plugin
```

## Usage

Once installed:

1. **Try the command**: `/hello` - See welcome message
2. **SessionStart hook**: Notice the message when starting a new session
3. **Skill usage**: Ask Claude about workflows (triggers example-workflow skill)
4. **PostToolUse hook**: Watch for hook messages after Write/Edit operations

## Structure

```
full-featured-plugin/
├── .claude-plugin/
│   ├── plugin.json           # Plugin metadata + MCP server config
│   └── marketplace.json      # Development marketplace
├── skills/
│   └── workflow/
│       └── SKILL.md          # Example skill
├── commands/
│   └── hello.md              # Custom /hello command
├── hooks/
│   ├── hooks.json            # Hook configurations
│   ├── run-hook.cmd          # Cross-platform polyglot wrapper
│   ├── session-init.sh       # SessionStart hook handler
│   └── post-write.sh         # PostToolUse hook handler
├── mcp/
│   └── server.js             # MCP server (placeholder example)
└── README.md                 # This file
```

## Learning from This Example

- **plugin.json** shows how to configure MCP servers within plugin metadata
- **marketplace.json** shows local development marketplace setup
- **SKILL.md** demonstrates proper skill structure with frontmatter
- **hooks.json** shows how to register hooks with matchers
- **run-hook.cmd** is a polyglot wrapper that makes hooks work on Windows, macOS, and Linux
- **Scripts** show how to use `${CLAUDE_PLUGIN_ROOT}` for portable paths
- **All components** work together as a cohesive plugin

## Real-World Usage

This is a teaching example. For production plugins:
- Implement actual MCP server tools using `@modelcontextprotocol/sdk`
- Add meaningful skills that provide real value
- Create hooks that enforce conventions or automate workflows
- Write commands that streamline common tasks
- Add comprehensive README with installation and usage docs

## References

See the `developing-claude-code-plugins` skill for complete plugin development guidance.
