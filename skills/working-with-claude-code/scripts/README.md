# Documentation Automation Scripts

This directory contains automation scripts for maintaining the `working-with-claude-code` skill's reference documentation.

## Overview

These scripts work together to keep the skill's documentation synchronized with the official Claude Code documentation at [code.claude.com](https://code.claude.com):

1. **`update_docs.js`** - Downloads the latest documentation files
2. **`update_skill_tree.js`** - Updates the SKILL.md file tree to reflect current files

Both scripts are orchestrated by the GitHub Actions workflow `.github/workflows/update-docs.yml`, which runs daily at 2:00 AM UTC.

## Scripts

### update_docs.js

**Purpose:** Fetches the latest Claude Code documentation from the official docs site and saves it to the `references/` directory.

**How it works:**
1. Fetches `https://code.claude.com/docs/llms.txt`
2. Extracts all Claude Code documentation URLs (pattern: `https://code.claude.com/docs/en/*.md`)
3. Downloads each markdown file
4. Saves to `references/` directory with original filename

**Usage:**
```bash
# Run from skills/working-with-claude-code directory
node scripts/update_docs.js
```

**Output:**
- Downloaded `.md` files in `references/`
- Console output showing progress and summary

**Error handling:**
- Continues on individual file failures
- Reports failed downloads at the end
- Returns non-zero exit code if errors occur

**Technical details:**
- Uses Node.js built-in `https` module (no external dependencies)
- Adds 100ms delay between requests to be respectful to the server
- Uses UTF-8 encoding to properly handle special characters
- Deduplicates URLs before downloading

### update_skill_tree.js

**Purpose:** Scans the `references/` directory and regenerates the file tree section in `SKILL.md` with current files and their descriptions.

**How it works:**
1. Scans `references/` for all `.md` files
2. Extracts description from each file using priority order:
   - Blockquote pattern: `> Description text` (first line starting with `>`)
   - H1 heading: `# Heading Text` (first line starting with `#`)
   - Generic fallback: `"Documentation file"` (if neither found)
3. Generates formatted tree structure
4. Updates SKILL.md between `<!-- tree-start -->` and `<!-- tree-end -->` markers

**Usage:**
```bash
# Run from skills/working-with-claude-code directory
node scripts/update_skill_tree.js
```

**Output:**
- Modified `SKILL.md` with updated file tree
- Console output with status and file count
- Helpful tip to run `git diff SKILL.md` to see changes

**Tree format:**
```
references/
├── file1.md              # Description from file
├── file2.md              # Description from file
└── file3.md              # Description from file
```

**Error handling:**
- Exits with error if `references/` directory doesn't exist
- Exits with error if SKILL.md markers are missing
- Logs warnings for files without descriptions (uses fallback)
- Continues processing other files if one fails

**Technical details:**
- Uses Node.js built-in `fs` and `path` modules (no external dependencies)
- Pads filenames to 25 characters for alignment
- Preserves all SKILL.md content outside the markers
- Generates valid markdown code blocks

## GitHub Actions Workflow

The scripts are orchestrated by `.github/workflows/update-docs.yml`:

**Schedule:** Daily at 2:00 AM UTC (via cron: `0 2 * * *`)

**Manual trigger:** Available via workflow_dispatch

**Workflow steps:**
1. **Checkout repository** - Uses default GITHUB_TOKEN
2. **Setup Node.js** - Installs Node.js 18
3. **Run documentation updater** - Executes `update_docs.js`
4. **Check for changes** - Detects if any files were modified
5. **Update SKILL.md file tree** - Runs `update_skill_tree.js` (only if changes detected)
6. **Commit and push changes** - Commits with detailed message (only if changes detected)

**Commit message format:**
```
Update Claude Code documentation (automated)

Documentation updated by scheduled workflow on YYYY-MM-DD HH:MM:SS UTC

Updated files:
- file1.md
- file2.md
```

**Smart execution:**
- Only runs `update_skill_tree.js` if documentation changes were detected
- Only commits if changes exist
- Captures changed files before updating SKILL.md for accurate commit message

## Local Development

### Running the scripts locally

```bash
# Navigate to the skill directory
cd skills/working-with-claude-code

# Download latest documentation
node scripts/update_docs.js

# Update SKILL.md file tree
node scripts/update_skill_tree.js

# Review changes
git status
git diff references/
git diff SKILL.md
```

### Testing changes

**Test update_docs.js:**
```bash
# Run the script
node scripts/update_docs.js

# Verify files were downloaded
ls -la references/

# Check for any differences
git diff references/
```

**Test update_skill_tree.js:**
```bash
# Add or modify a file in references/
echo "> Test description" > references/test.md

# Run the script
node scripts/update_skill_tree.js

# Check the generated tree
git diff SKILL.md

# Clean up
rm references/test.md
git checkout SKILL.md
```

**Test edge cases:**
1. **New file without description:**
   ```bash
   echo "# Just a heading\nContent here" > references/test.md
   node scripts/update_skill_tree.js
   ```

2. **Empty references directory:**
   ```bash
   mkdir -p test-empty/references
   mkdir -p test-empty/scripts
   # Copy scripts and SKILL.md with markers
   # Run script - should generate empty tree
   ```

3. **Missing SKILL.md markers:**
   ```bash
   # Temporarily remove markers from SKILL.md
   # Run script - should fail with clear error
   ```

## Maintenance

### Adding new documentation sources

To track additional documentation pages, update the pattern in `update_docs.js`:

```javascript
const CLAUDE_CODE_PATTERN = /https:\/\/code\.claude\.com\/docs\/en\/[^\s)]+\.md/g;
```

Or modify the `getClaudeCodeUrls()` function to include additional sources.

### Changing description extraction

To modify how descriptions are extracted from files, edit the `extractDescription()` function in `update_skill_tree.js`:

```javascript
function extractDescription(filepath) {
  // Current priority:
  // 1. Blockquote (> Description)
  // 2. H1 heading (# Heading)
  // 3. Generic fallback
}
```

### Updating SKILL.md markers

If you need to change where the file tree appears in SKILL.md:

1. Ensure both markers exist:
   ```markdown
   <!-- tree-start -->
   ...tree content...
   <!-- tree-end -->
   ```

2. The script replaces everything between the markers
3. Markers can appear anywhere in SKILL.md

## Troubleshooting

### "Cannot find tree markers in SKILL.md"

**Cause:** SKILL.md is missing `<!-- tree-start -->` or `<!-- tree-end -->` markers

**Fix:**
```bash
# Add markers to SKILL.md around the file tree section
<!-- tree-start -->
```
references/
...existing tree...
```
<!-- tree-end -->
```

### "References directory not found"

**Cause:** Script is being run from wrong directory

**Fix:**
```bash
cd skills/working-with-claude-code
node scripts/update_skill_tree.js
```

### "HTTP error fetching documentation"

**Cause:** Network issue or documentation URL changed

**Fix:**
- Check internet connection
- Verify `https://code.claude.com/docs/llms.txt` is accessible
- Check if documentation URL format has changed

### Workflow not committing changes

**Cause:** No changes detected or git configuration issue

**Debug:**
```bash
# Check workflow logs in GitHub Actions
# Look for "Changes detected" message
# Verify GITHUB_TOKEN has write permissions
```

## Design Decisions

### Why two separate scripts?

**Separation of concerns:**
- `update_docs.js` - Single responsibility: fetch documentation
- `update_skill_tree.js` - Single responsibility: update SKILL.md

**Benefits:**
- Each script can be run independently
- Easier to test in isolation
- Workflow orchestrates the logic
- Simpler debugging

### Why Node.js instead of bash/Python?

**Rationale:**
- No external dependencies (uses built-in modules)
- Cross-platform compatibility (Windows, macOS, Linux)
- JavaScript is familiar to most developers
- JSON parsing is native
- GitHub Actions has Node.js pre-installed

### Why HTML comments as markers?

**Rationale:**
- Invisible in rendered markdown
- Don't affect skill functionality
- Stable anchor points for text replacement
- Clear intent (start/end markers)
- Standard HTML syntax

## Related Documentation

- **Design document:** `docs/plans/2025-01-12-auto-sync-skill-file-tree-design.md`
- **Workflow file:** `.github/workflows/update-docs.yml`
- **SKILL.md:** `../SKILL.md` (parent directory)
- **References:** `../references/` (documentation files)

## Future Enhancements

Potential improvements for consideration:

1. **Parallel downloads** - Use Promise.all() for faster fetching
2. **Incremental updates** - Only download files that changed (using ETags or Last-Modified)
3. **Validation** - Verify downloaded markdown is valid
4. **Notifications** - Send alerts on workflow failures
5. **Diff reporting** - Include content diffs in commit messages
6. **Caching** - Cache llms.txt to reduce requests
7. **Retry logic** - Automatically retry failed downloads
8. **Testing** - Add unit tests for both scripts

## License

Part of the superpowers-developing-for-claude-code plugin.
