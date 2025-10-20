---
name: developing-claude-code-plugins
description: Use when creating or modifying Claude Code plugins - provides streamlined workflows, patterns, and examples for plugin development including directory structure, manifests, skills, commands, hooks, and MCP servers
---

# Developing Claude Code Plugins

## Overview

This skill provides efficient workflows for creating Claude Code plugins. It synthesizes official documentation into actionable steps, provides working examples, and covers common patterns. Use this skill to streamline plugin development - it makes the correct path the fast path.

## When to Use

Use this skill when:
- Creating a new Claude Code plugin from scratch
- Adding components to an existing plugin (skills, commands, hooks, MCP servers)
- Setting up a development marketplace for testing
- Troubleshooting plugin structure issues
- Understanding where files should go in a plugin

**Note:** For deep dives into official documentation, use the `working-with-claude-code` skill to access comprehensive docs.

## Quick Reference

| Task | Section | Official Docs |
|------|---------|---------------|
| Create new plugin | Workflow → Create Plugin | `plugins.md` |
| Add a skill | Component Guides → Skills | `skills.md` |
| Add custom command | Component Guides → Commands | `slash-commands.md` |
| Add MCP server | Component Guides → MCP Servers | `mcp.md` |
| Add hooks | Component Guides → Hooks | `hooks.md`, `hooks-guide.md` |
| Test locally | Development Workflow | `plugin-marketplaces.md` |

## Plugin Development Workflow

### Phase 1: Planning

**Before writing code:**

1. **Define your plugin's purpose**
   - What problem does it solve?
   - What components will it need? (skills, commands, hooks, MCP servers)

2. **Review examples**
   - Look at `superpowers-developing-for-claude-code` (this plugin)
   - Check `superpowers-chrome` for MCP server examples
   - Browse installed plugins for patterns

3. **Read relevant docs** using `working-with-claude-code` skill:
   - Always start with `plugins.md` for overview
   - Read component-specific docs as needed

### Phase 2: Create Plugin Structure

**Directory layout** (all paths relative to plugin root):

```
my-plugin/
├── .claude-plugin/
│   ├── plugin.json          # REQUIRED - Plugin metadata
│   └── marketplace.json     # Optional - For local dev/distribution
├── skills/                  # Optional - Agent Skills
│   └── skill-name/
│       ├── SKILL.md         # Required for each skill
│       ├── scripts/         # Optional - Executable helpers
│       ├── references/      # Optional - Documentation
│       └── assets/          # Optional - Templates/files
├── commands/                # Optional - Custom slash commands
│   └── command-name.md
├── agents/                  # Optional - Specialized subagents
│   └── agent-name.md
├── hooks/                   # Optional - Event handlers
│   └── hooks.json
├── .mcp.json               # Optional - MCP server config
├── LICENSE
└── README.md
```

**CRITICAL RULES:**

1. **`.claude-plugin/` contains ONLY `plugin.json` (and optionally `marketplace.json`)**
   - ❌ Do NOT put skills, commands, or other components inside `.claude-plugin/`
   - ✅ Put them at the plugin root

2. **Use `${CLAUDE_PLUGIN_ROOT}` for all paths in config files**
   - ❌ Do NOT use hardcoded paths: `/Users/name/plugins/my-plugin/script.js`
   - ✅ Use variables: `${CLAUDE_PLUGIN_ROOT}/script.js`

3. **Use relative paths in `plugin.json`**
   - All paths must start with `./`
   - Paths are relative to plugin root

### Phase 3: Create Plugin Manifest

**Minimal `plugin.json`:**

```json
{
  "name": "my-plugin",
  "version": "1.0.0",
  "description": "Brief description of what the plugin does",
  "author": {
    "name": "Your Name"
  }
}
```

**Complete `plugin.json` with all options:**

```json
{
  "name": "my-plugin",
  "version": "1.0.0",
  "description": "Comprehensive plugin description",
  "author": {
    "name": "Your Name",
    "email": "you@example.com",
    "url": "https://github.com/you"
  },
  "homepage": "https://github.com/you/my-plugin",
  "repository": "https://github.com/you/my-plugin",
  "license": "MIT",
  "keywords": ["keyword1", "keyword2"],
  "mcpServers": {
    "server-name": {
      "command": "node",
      "args": ["${CLAUDE_PLUGIN_ROOT}/path/to/server.js"],
      "env": {
        "ENV_VAR": "value"
      }
    }
  }
}
```

### Phase 4: Add Components

**Use TodoWrite** to track component creation:

```markdown
- [ ] Create plugin structure
- [ ] Write plugin.json
- [ ] Add skill: skill-name
- [ ] Add command: /command-name
- [ ] Configure MCP server
- [ ] Create README
- [ ] Test installation
```

See "Component Guides" section below for each component type.

### Phase 5: Create Development Marketplace

**For local testing, create `marketplace.json` in `.claude-plugin/`:**

```json
{
  "name": "my-plugin-dev",
  "description": "Development marketplace for my plugin",
  "owner": {
    "name": "Your Name"
  },
  "plugins": [
    {
      "name": "my-plugin",
      "description": "Plugin description",
      "version": "1.0.0",
      "source": "./",
      "author": {
        "name": "Your Name"
      }
    }
  ]
}
```

**Why?** This lets you test your plugin locally before distribution.

### Phase 6: Test and Iterate

1. **Install for testing:**
   ```bash
   /plugin marketplace add /path/to/my-plugin
   /plugin install my-plugin@my-plugin-dev
   ```

2. **Restart Claude Code** to load the plugin

3. **Test each component:**
   - Skills: Try tasks that match skill descriptions
   - Commands: Run `/your-command`
   - MCP servers: Check tools are available
   - Hooks: Trigger relevant events

4. **Iterate:**
   ```bash
   /plugin uninstall my-plugin@my-plugin-dev
   # Make changes
   /plugin install my-plugin@my-plugin-dev
   # Restart Claude Code
   ```

## Component Guides

### Adding a Skill

**Location:** `skills/skill-name/SKILL.md`

**Minimal SKILL.md:**

```markdown
---
name: skill-name
description: Use when [triggering conditions] - [what it does]
---

# Skill Name

## Overview

What this skill does in 1-2 sentences.

## When to Use

- Specific scenario 1
- Specific scenario 2

## Workflow

1. Step one
2. Step two
3. Step three
```

**With bundled resources:**

```
skills/skill-name/
├── SKILL.md
├── scripts/           # Executable helpers
│   └── helper.js
├── references/        # Documentation to load
│   └── reference.md
└── assets/           # Files for output
    └── template.txt
```

**Reference official docs:** Read `skills.md` via `working-with-claude-code` skill for complete details.

### Adding a Custom Command

**Location:** `commands/command-name.md`

**Format:**

```markdown
---
description: Brief description of what this command does
---

# Command Instructions

Tell Claude what to do when this command is invoked.
Be specific and clear about the expected behavior.
```

**Example:**

```markdown
---
description: Greet the user and show available features
---

# Hello Command

Greet the user warmly and list the key features of this plugin:
1. Feature one
2. Feature two
3. Feature three

Ask how you can help them today.
```

**Usage:** Users run `/command-name` to invoke.

**Reference official docs:** Read `slash-commands.md` via `working-with-claude-code` skill.

### Adding an MCP Server

**Option 1: In plugin.json**

```json
{
  "name": "my-plugin",
  "mcpServers": {
    "server-name": {
      "command": "node",
      "args": ["${CLAUDE_PLUGIN_ROOT}/server/index.js"],
      "env": {
        "API_KEY": "${PLUGIN_ENV_API_KEY}"
      }
    }
  }
}
```

**Option 2: Separate .mcp.json file**

```json
{
  "mcpServers": {
    "server-name": {
      "command": "${CLAUDE_PLUGIN_ROOT}/bin/server",
      "args": ["--config", "${CLAUDE_PLUGIN_ROOT}/config.json"]
    }
  }
}
```

**Critical:** Always use `${CLAUDE_PLUGIN_ROOT}` for paths.

**Reference official docs:** Read `mcp.md` via `working-with-claude-code` skill.

### Adding Hooks

**Location:** `hooks/hooks.json`

**Format:**

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write|Edit",
        "hooks": [
          {
            "type": "command",
            "command": "${CLAUDE_PLUGIN_ROOT}/scripts/format.sh"
          }
        ]
      }
    ],
    "SessionStart": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "${CLAUDE_PLUGIN_ROOT}/scripts/init.sh"
          }
        ]
      }
    ]
  }
}
```

**Available hook events:**
- `PreToolUse`, `PostToolUse`
- `UserPromptSubmit`
- `SessionStart`, `SessionEnd`
- `Stop`, `SubagentStop`
- `PreCompact`
- `Notification`

**Reference official docs:** Read `hooks.md` and `hooks-guide.md` via `working-with-claude-code` skill.

### Adding Agents

**Location:** `agents/agent-name.md`

**Format:**

```markdown
---
description: What this agent specializes in
capabilities: ["capability1", "capability2"]
---

# Agent Name

Detailed description of when to invoke this specialized agent.

## Expertise

- Specific domain knowledge
- Specialized techniques
- When to use vs other agents
```

**Reference official docs:** Read `sub-agents.md` via `working-with-claude-code` skill.

## Common Patterns

### Pattern: Simple Plugin with One Skill

**Use when:** Creating a focused plugin with documentation/reference material

**Example:** superpowers-developing-for-claude-code

```
my-plugin/
├── .claude-plugin/
│   ├── plugin.json
│   └── marketplace.json
├── skills/
│   └── working-with-claude-code/
│       ├── SKILL.md
│       ├── scripts/update_docs.js
│       └── references/          # 42 doc files
└── README.md
```

### Pattern: MCP Plugin with Skill

**Use when:** Providing both a tool integration (MCP) and guidance on using it (skill)

**Example:** superpowers-chrome

```
my-plugin/
├── .claude-plugin/
│   └── plugin.json              # Includes mcpServers config
├── skills/
│   └── browsing/
│       └── SKILL.md
├── mcp/
│   └── dist/
│       └── index.js             # MCP server implementation
└── README.md
```

### Pattern: Command Collection

**Use when:** Providing multiple custom slash commands

```
my-plugin/
├── .claude-plugin/
│   └── plugin.json
├── commands/
│   ├── status.md
│   ├── logs.md
│   └── deploy.md
└── README.md
```

## Common Pitfalls

| Mistake | Problem | Solution |
|---------|---------|----------|
| Putting skills in `.claude-plugin/skills/` | Plugin won't find them | Move to `skills/` at root |
| Hardcoding paths | Plugin breaks on other systems | Use `${CLAUDE_PLUGIN_ROOT}` |
| Absolute paths in `plugin.json` | Plugin breaks on other systems | Use relative paths starting with `./` |
| Missing YAML frontmatter in SKILL.md | Skill won't load | Add `name` and `description` in frontmatter |
| Forgetting to restart Claude Code | Changes don't take effect | Always restart after install/uninstall |
| Not making scripts executable | Scripts fail to run | `chmod +x script.sh` |
| Skipping README | Users don't understand plugin | Document installation and usage |

## Working Example: This Plugin

**This plugin (superpowers-developing-for-claude-code) is a working example you can reference:**

```bash
# View the structure
ls -la /path/to/superpowers-developing-for-claude-code

# Key files to examine:
.claude-plugin/plugin.json       # Minimal plugin manifest
.claude-plugin/marketplace.json  # Development marketplace setup
skills/working-with-claude-code/ # Complete skill with references and script
README.md                        # Documentation example
```

**Read these files to see:**
- Proper directory structure
- Complete plugin and marketplace manifests
- A skill with bundled resources (scripts/ and references/)
- Professional README

## Debugging Tips

### Plugin Not Loading

1. Check `plugin.json` syntax with a JSON validator
2. Ensure `.claude-plugin/` exists with `plugin.json` inside
3. Verify all paths use `${CLAUDE_PLUGIN_ROOT}` or relative `./` paths
4. Restart Claude Code after changes

### Skill Not Triggering

1. Check YAML frontmatter format in SKILL.md
2. Ensure `description` field clearly describes when to use it
3. Make description match actual use cases (use "Use when..." format)
4. Test by explicitly asking for tasks that match description

### Command Not Appearing

1. Ensure `commands/` is at plugin root, NOT in `.claude-plugin/`
2. Check markdown format with YAML frontmatter
3. Restart Claude Code
4. Try `/command-name` explicitly

### MCP Server Not Starting

1. Verify `${CLAUDE_PLUGIN_ROOT}` in all paths
2. Check command is executable: `chmod +x server-script`
3. Test server independently outside Claude Code
4. Check logs with `claude --debug`

## Best Practices

1. **Start simple:** Begin with just `plugin.json` and one component
2. **Test frequently:** Install, test, uninstall, modify, repeat
3. **Use examples:** Reference working plugins as templates
4. **Read official docs:** Use `working-with-claude-code` skill for deep dives
5. **Document everything:** Write clear README with installation instructions
6. **Use TodoWrite:** Track progress systematically
7. **Version properly:** Use semantic versioning (major.minor.patch)
8. **Consider portability:** Always use `${CLAUDE_PLUGIN_ROOT}`

## Cross-References

- **Official docs:** Use `working-with-claude-code` skill to access:
  - `plugins.md` - Plugin development overview
  - `plugins-reference.md` - Complete API reference
  - `skills.md` - Skill authoring guide
  - `slash-commands.md` - Command format details
  - `hooks.md`, `hooks-guide.md` - Hook system
  - `mcp.md` - MCP server integration
  - `plugin-marketplaces.md` - Distribution

- **Example plugins:**
  - superpowers-developing-for-claude-code (this plugin)
  - superpowers-chrome (MCP example)
  - Check `~/.claude/plugins/` for installed plugins

## Workflow Summary

```
1. Plan → Define purpose, list components
2. Create → Make directories, write plugin.json
3. Add → Build each component (skills, commands, etc.)
4. Test → Install via dev marketplace
5. Iterate → Uninstall, modify, reinstall
6. Document → Write README
7. Distribute → Share via marketplace or repository
```

**Remember:** The correct path is the fast path. Use official docs, follow patterns, test frequently.
