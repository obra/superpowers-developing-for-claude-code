# Common Plugin Patterns

## Pattern: Simple Plugin with One Skill

**Use when:** Creating a focused plugin with documentation/reference material

**Structure:**
```
my-plugin/
├── .claude-plugin/
│   ├── plugin.json
│   └── marketplace.json
├── skills/
│   └── my-skill/
│       ├── SKILL.md
│       ├── scripts/           # Optional - Executable helpers
│       └── references/        # Optional - Documentation files
└── README.md
```

**Real example:** `superpowers-developing-for-claude-code`
- Single skill with comprehensive documentation
- Scripts for self-updating
- 40+ reference files
- No MCP servers, commands, or hooks

**When to use:**
- Teaching Claude about a specific topic/domain
- Providing process workflows (TDD, debugging, code review)
- Bundling documentation for easy reference
- Creating reusable knowledge bases

---

## Pattern: MCP Plugin with Skill

**Use when:** Providing both a tool integration (MCP) and guidance on using it (skill)

**Structure:**
```
my-plugin/
├── .claude-plugin/
│   └── plugin.json              # Includes mcpServers config
├── skills/
│   └── using-the-tools/
│       └── SKILL.md             # How to use the MCP tools
├── mcp/
│   └── dist/
│       └── index.js             # MCP server implementation
└── README.md
```

**Real example:** `superpowers-chrome`
- MCP server provides browser control tools
- Skill teaches Claude how to use those tools effectively
- Skill includes patterns, examples, workflows

**When to use:**
- Adding new tools/capabilities to Claude
- Integrating external APIs or services
- Tools need guidance on when/how to use them
- Want Claude to use tools idiomatically, not just technically

**Key insight:** MCP provides *capability*, skill provides *judgment*. The MCP server exposes `click()`, the skill teaches "await elements before clicking them".

---

## Pattern: Command Collection

**Use when:** Providing multiple custom slash commands for common tasks

**Structure:**
```
my-plugin/
├── .claude-plugin/
│   └── plugin.json
├── commands/
│   ├── status.md
│   ├── logs.md
│   ├── deploy.md
│   └── rollback.md
└── README.md
```

**When to use:**
- Project-specific workflows (deploy, test, build)
- Common task shortcuts
- Standardized responses (greetings, status reports)
- Quick context injection

**Example use cases:**
- `/deploy-staging` - Step-by-step deployment workflow
- `/incident-report` - Template for incident documentation
- `/code-review` - Checklist for reviewing PRs
- `/security-check` - Security audit workflow

---

## Pattern: Hook-Enhanced Workflow

**Use when:** Automating actions in response to Claude's behavior

**Structure:**
```
my-plugin/
├── .claude-plugin/
│   └── plugin.json
├── hooks/
│   └── hooks.json
├── scripts/
│   ├── format-code.sh
│   ├── run-linter.sh
│   └── update-docs.sh
└── README.md
```

**Common hooks:**
- `PostToolUse[Write|Edit]` → Auto-format code
- `SessionStart` → Load project context
- `UserPromptSubmit` → Enforce conventions
- `PreCompact` → Save conversation summaries

**When to use:**
- Enforcing code style automatically
- Injecting project-specific context
- Running validations or checks
- Maintaining project conventions

**Warning:** Hooks that block operations can disrupt workflow. Use sparingly and make failure messages clear.

---

## Pattern: Full-Featured Plugin

**Use when:** Building a comprehensive plugin with multiple integration points

**Structure:**
```
my-plugin/
├── .claude-plugin/
│   └── plugin.json
├── skills/
│   ├── main-workflow/
│   └── advanced-techniques/
├── commands/
│   ├── start.md
│   └── help.md
├── hooks/
│   └── hooks.json
├── agents/
│   └── specialist.md
├── mcp/
│   └── dist/
│       └── server.js
└── README.md
```

**Real example:** See `examples/full-featured-plugin/` in this repo

**When to use:**
- Complete domain coverage (e.g., "the definitive AWS plugin")
- Multiple related workflows
- Tools + guidance + automation all needed
- Building a "platform" plugin

**Caution:** Start simple, add complexity only when justified. Most plugins don't need all components.

---

## Pattern: Skill with Bundled Resources

**Use when:** A skill needs reference material, scripts, or templates

**Structure:**
```
skills/my-skill/
├── SKILL.md                    # Main skill instructions
├── scripts/
│   ├── helper.py              # Executable utilities
│   └── generator.js
├── references/
│   ├── api-docs.md            # Documentation to load
│   ├── examples.md
│   └── cheatsheet.md
└── assets/
    ├── template.txt           # Files for output
    └── config-example.json
```

**How resources are used:**
- SKILL.md tells Claude to "read references/api-docs.md for complete API reference"
- Scripts can be executed via Bash tool
- Assets can be copied/modified for output
- References are loaded into context when skill is invoked

**When to use:**
- Skill needs detailed technical reference
- Want to separate workflow (SKILL.md) from reference (docs)
- Need executable helpers
- Providing templates or examples

---

## Choosing the Right Pattern

| Your Goal | Use This Pattern |
|-----------|------------------|
| Teach Claude a process/workflow | Simple Plugin with One Skill |
| Add new tools + guidance | MCP Plugin with Skill |
| Provide project shortcuts | Command Collection |
| Enforce conventions automatically | Hook-Enhanced Workflow |
| Comprehensive domain coverage | Full-Featured Plugin |
| Skill needs reference docs | Skill with Bundled Resources |

## Combining Patterns

Patterns are composable:

**Example: "superpowers" plugin**
- Multiple skills (brainstorming, TDD, debugging) ← Skill collection
- Each skill has references/ ← Bundled resources
- Could add hooks for enforcement ← Add hooks pattern
- Could add MCP for new tools ← Add MCP pattern

**Start simple, grow intentionally.** Add components when you have a clear reason, not because they exist.
