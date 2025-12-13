# Fix for working-with-claude-code Plugin Update Script

## Problem

The `update_docs.js` script in the `working-with-claude-code` skill fails with:
```
❌ Error: HTTP 401: Unauthorized
📥 Fetching llms.txt...
```

## Root Cause

1. Claude Code documentation moved from `docs.claude.com` to `code.claude.com`
2. The `llms.txt` endpoint at `docs.claude.com/llms.txt` now requires authentication (returns 401)
3. There is no equivalent public endpoint at the new domain

## Solution

The script needs to be updated to:
1. Use the new domain `code.claude.com` instead of `docs.claude.com`
2. Replace dynamic llms.txt fetching with a hardcoded list of documentation pages
3. Remove `migration-guide.md` which doesn't exist (404)

## Implementation

### Script Location
```
~/.claude/plugins/cache/superpowers-marketplace/superpowers-developing-for-claude-code/0.3.1/skills/working-with-claude-code/scripts/update_docs.js
```

### Changes Required

1. **Update constants** (lines 16-17):
```javascript
const DOCS_BASE_URL = 'https://code.claude.com/docs/en';
const REFERENCES_DIR = path.join(__dirname, '..', 'references');
```

2. **Replace with hardcoded list** (lines 20-86):
```javascript
const DOC_PAGES = [
  // Getting Started
  'overview.md',
  'quickstart.md',
  'common-workflows.md',
  'claude-code-on-the-web.md',

  // Build with Claude Code
  'sub-agents.md',
  'plugins.md',
  'skills.md',
  'output-styles.md',
  'hooks-guide.md',
  'headless.md',
  'github-actions.md',

  // CI/CD Integration
  'gitlab-ci-cd.md',

  // Advanced Integration
  'mcp.md',

  // Troubleshooting
  'troubleshooting.md',

  // Deployment
  'third-party-integrations.md',
  'amazon-bedrock.md',
  'google-vertex-ai.md',
  'network-config.md',
  'llm-gateway.md',
  'devcontainer.md',
  'sandboxing.md',

  // Administration
  'setup.md',
  'iam.md',
  'security.md',
  'data-usage.md',
  'monitoring-usage.md',
  'costs.md',
  'analytics.md',
  'plugin-marketplaces.md',

  // Configuration
  'settings.md',
  'vs-code.md',
  'jetbrains.md',
  'terminal-config.md',
  'model-config.md',
  'memory.md',

  // Reference
  'cli-reference.md',
  'interactive-mode.md',
  'slash-commands.md',
  'checkpointing.md',
  'hooks.md',
  'plugins-reference.md',
  'statusline.md',

  // Resources
  'legal-and-compliance.md'
];
```

3. **Update getClaudeCodeUrls function** (line 110-112):
```javascript
async function getClaudeCodeUrls() {
  return DOC_PAGES.map(page => `${DOCS_BASE_URL}/${page}`);
}
```

4. **Update console messages** (remove emojis for cleaner output):
```javascript
console.log('Claude Code Documentation Updater\n');
console.log(`Found ${urls.length} Claude Code documentation pages\n`);
console.log('Downloading documentation...');
console.log(`\nDocumentation update complete!`);
```

## Verification

After applying the fix, run:
```bash
cd ~/.claude/plugins/cache/superpowers-marketplace/superpowers-developing-for-claude-code/0.3.1/skills/working-with-claude-code
node scripts/update_docs.js
```

Expected output:
```
Claude Code Documentation Updater

Found 43 Claude Code documentation pages

Downloading documentation...
  Fetching overview.md...
  [... 42 more files ...]

Documentation update complete!
   43 files downloaded successfully

Documentation saved to: [path]/references
```

## Persistence Strategy

⚠️ **WARNING**: This fix will be **lost** when:
- The plugin updates to a new version
- The plugin cache is cleared
- You reinstall the plugin

### Recommended Approach

**Option 1: Contribute upstream** (Best)
- Open an issue/PR at: https://github.com/obra/superpowers-developing-for-claude-code
- Benefits: Permanent fix, helps everyone

**Option 2: Document in episodic-memory**
- This conversation is now indexed and searchable
- Search: `episodic-memory search "update docs script 401"`
- Will find this fix in future sessions

**Option 3: Keep this documentation**
- Commit this file to your repo
- Reference it when the fix needs to be reapplied
- Consider adding to your BEADS workflow

## History

- **First occurrence**: Dec 8, 2025, 6:27 PM (Session: 1ee8e950-09c9-4792-bb88-699c14da6408)
- **Second occurrence**: Dec 8, 2025, 6:49 PM (Session: 0c4ed174-0e5c-47d5-a7a1-2148a48b4ee0)
- Both sessions: Identical problem, identical solution

## Related Issues

- Claude Code documentation moved from docs.claude.com → code.claude.com (Nov 2025)
- llms.txt endpoint now requires authentication
- See: https://code.claude.com/docs/en/overview for current documentation

## Next Steps

1. ✅ Document the fix (this file)
2. ⬜ Open issue at https://github.com/obra/superpowers-developing-for-claude-code
3. ⬜ Contribute PR with the fix
4. ⬜ Consider creating a post-install hook if needed frequently
