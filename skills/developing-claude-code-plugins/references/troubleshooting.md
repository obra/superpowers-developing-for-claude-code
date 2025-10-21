# Troubleshooting Plugin Development

## Plugin Not Loading

### Symptom
Plugin doesn't appear in `/plugin list` or components aren't available.

### Debug Steps

1. **Check plugin.json syntax**
   ```bash
   # Validate JSON
   cat .claude-plugin/plugin.json | jq .
   ```
   If this errors, you have invalid JSON.

2. **Verify directory structure**
   ```bash
   # Ensure .claude-plugin/ exists at plugin root
   ls -la .claude-plugin/
   # Should show plugin.json (required)
   ```

3. **Check all paths**
   - Search for hardcoded paths: `grep -r "/Users/" .claude-plugin/`
   - Should use `${CLAUDE_PLUGIN_ROOT}` instead
   - Relative paths in plugin.json must start with `./`

4. **Restart Claude Code**
   - Changes only take effect after restart
   - Exit and relaunch the application

5. **Check installation**
   ```bash
   /plugin list
   # Your plugin should appear here
   ```

### Common Causes

| Problem | Solution |
|---------|----------|
| `.claude-plugin/` missing | Create directory with `plugin.json` |
| Invalid JSON in `plugin.json` | Validate with `jq` or JSON linter |
| Hardcoded paths | Replace with `${CLAUDE_PLUGIN_ROOT}` |
| Forgot to restart | Always restart after install/changes |

---

## Skill Not Triggering

### Symptom
Skill exists but Claude doesn't use it when expected.

### Debug Steps

1. **Check YAML frontmatter format**
   ```markdown
   ---
   name: skill-name
   description: Use when [clear trigger] - [what it does]
   ---
   ```
   - Must have `---` delimiters
   - Must include `name` and `description`
   - No tabs, only spaces for indentation

2. **Verify description clarity**
   - Description should clearly state WHEN to use skill
   - Use "Use when..." format
   - Be specific about triggering conditions

   ❌ Bad: `description: A helpful skill`

   ✅ Good: `description: Use when debugging test failures - systematic approach to finding root causes`

3. **Test explicitly**
   Ask for a task that exactly matches the description:
   ```
   "I need to debug a test failure"
   # Should trigger systematic-debugging skill
   ```

4. **Check skill location**
   - Must be in `skills/skill-name/SKILL.md`
   - NOT in `.claude-plugin/skills/`

### Common Causes

| Problem | Solution |
|---------|----------|
| Vague description | Make description specific and action-oriented |
| Skill in wrong location | Move to `skills/` at plugin root |
| Missing frontmatter | Add YAML with name and description |
| Malformed YAML | Check for tabs, missing dashes, etc. |

---

## Command Not Appearing

### Symptom
Custom slash command doesn't show up or can't be executed.

### Debug Steps

1. **Verify location**
   ```bash
   ls -la commands/
   # Should show command-name.md files
   ```
   Commands must be at `commands/` in plugin root, NOT in `.claude-plugin/`

2. **Check markdown format**
   ```markdown
   ---
   description: Brief description of what this command does
   ---

   # Command Instructions

   Content here...
   ```

3. **Restart Claude Code**
   Commands are loaded at startup.

4. **Test directly**
   ```
   /your-command-name
   ```

### Common Causes

| Problem | Solution |
|---------|----------|
| Commands in `.claude-plugin/` | Move to `commands/` at root |
| Missing description frontmatter | Add YAML with description |
| No restart after adding | Restart Claude Code |
| Wrong file extension | Must be `.md` not `.txt` |

---

## MCP Server Not Starting

### Symptom
MCP server tools not available, or server fails silently.

### Debug Steps

1. **Verify path variables**
   All paths in MCP config must use `${CLAUDE_PLUGIN_ROOT}`:
   ```json
   {
     "mcpServers": {
       "my-server": {
         "command": "node",
         "args": ["${CLAUDE_PLUGIN_ROOT}/server/index.js"]
       }
     }
   }
   ```

2. **Check executable permissions**
   ```bash
   chmod +x server/index.js
   # Or for shell scripts:
   chmod +x bin/server.sh
   ```

3. **Test server independently**
   ```bash
   # Run server outside Claude Code to check for errors
   node ${PLUGIN_ROOT}/server/index.js
   ```

4. **Check logs**
   ```bash
   claude --debug
   # Look for MCP server startup errors
   ```

5. **Verify command exists**
   ```bash
   which node  # Or whatever command you're using
   ```

### Common Causes

| Problem | Solution |
|---------|----------|
| Hardcoded paths | Use `${CLAUDE_PLUGIN_ROOT}` |
| Not executable | `chmod +x` on scripts |
| Command not in PATH | Use full path or ensure command available |
| Server crashes on startup | Test independently, check logs |
| Missing dependencies | `npm install` or equivalent |

---

## Hooks Not Firing

### Symptom
Hook scripts exist but don't execute when events occur.

### Debug Steps

1. **Check hooks.json location**
   Must be at `hooks/hooks.json` in plugin root.

2. **Verify JSON format**
   ```bash
   cat hooks/hooks.json | jq .
   ```

3. **Check matcher syntax**
   ```json
   {
     "hooks": {
       "PostToolUse": [
         {
           "matcher": "Write|Edit",  // Regex - matches Write OR Edit
           "hooks": [...]
         }
       ]
     }
   }
   ```

4. **Verify script paths**
   ```json
   {
     "type": "command",
     "command": "${CLAUDE_PLUGIN_ROOT}/scripts/format.sh"
   }
   ```

5. **Check script permissions**
   ```bash
   chmod +x scripts/format.sh
   ```

6. **Test script directly**
   ```bash
   # Run the hook script manually
   ./scripts/format.sh
   ```

### Common Causes

| Problem | Solution |
|---------|----------|
| Wrong hooks.json location | Move to `hooks/` at plugin root |
| Script not executable | `chmod +x` on all scripts |
| Invalid matcher regex | Test regex syntax |
| Script fails silently | Add error handling, test independently |
| Hardcoded paths | Use `${CLAUDE_PLUGIN_ROOT}` |

---

## Development Workflow Issues

### Can't Install Plugin Locally

**Problem:** `/plugin install my-plugin@my-dev` fails

**Solutions:**
1. Check marketplace.json exists in `.claude-plugin/`
2. Verify marketplace is added:
   ```bash
   /plugin marketplace add /full/path/to/plugin
   /plugin marketplace list  # Should show your marketplace
   ```
3. Check marketplace.json format:
   ```json
   {
     "name": "my-dev",
     "plugins": [{
       "name": "my-plugin",
       "source": "./"  // Points to plugin root
     }]
   }
   ```

### Changes Not Taking Effect

**Problem:** Modified plugin but changes don't appear

**Solutions:**
1. Uninstall → modify → reinstall → restart:
   ```bash
   /plugin uninstall my-plugin@my-dev
   # Make your changes
   /plugin install my-plugin@my-dev
   # Restart Claude Code
   ```
2. For hook/MCP changes, restart is mandatory
3. For skill/command content changes, sometimes works without restart (but safer to restart)

---

## Common Pitfalls Summary

| Mistake | Why It Fails | How to Fix |
|---------|-------------|------------|
| Skills in `.claude-plugin/skills/` | Claude looks in `skills/` at root | Move to plugin root |
| Hardcoded absolute paths | Breaks on other systems | Use `${CLAUDE_PLUGIN_ROOT}` |
| Forgot to restart | Changes load at startup | Always restart after changes |
| Script not executable | Shell can't run it | `chmod +x script.sh` |
| Invalid JSON | Parser fails silently | Validate with `jq` or linter |
| Vague skill description | Claude doesn't know when to use it | Be specific about triggers |
| Missing YAML frontmatter | Metadata not parsed | Add `---` delimiters and fields |
| Testing without uninstall | Old version still cached | Uninstall before reinstalling |

---

## Debugging Workflow

When something isn't working:

1. **Validate all JSON files**
   ```bash
   jq . .claude-plugin/plugin.json
   jq . .claude-plugin/marketplace.json
   jq . hooks/hooks.json
   ```

2. **Check all paths use variables**
   ```bash
   grep -r "Users/" .
   # Should return nothing in config files
   ```

3. **Verify permissions**
   ```bash
   find . -name "*.sh" -o -name "*.js" | xargs ls -l
   # Check executable bit (x) is set
   ```

4. **Test components independently**
   - Run MCP servers directly
   - Execute hook scripts manually
   - Validate YAML frontmatter with a parser

5. **Clean reinstall**
   ```bash
   /plugin uninstall my-plugin@my-dev
   /plugin marketplace remove /path/to/plugin
   # Fix issues
   /plugin marketplace add /path/to/plugin
   /plugin install my-plugin@my-dev
   # Restart Claude Code
   ```

6. **Check logs**
   ```bash
   claude --debug
   # Look for error messages during startup
   ```

---

## Getting Help

If you're still stuck:

1. **Read official docs** via `working-with-claude-code` skill
2. **Check example plugins** in this repo and `~/.claude/plugins/`
3. **Simplify** - Remove components until it works, then add back one at a time
4. **Report issues** at https://github.com/anthropics/claude-code/issues

**Pro tip:** When asking for help, include:
- Your plugin.json
- Directory structure (`tree -L 3 -a`)
- Exact error messages
- What you've already tried
