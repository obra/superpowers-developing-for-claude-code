# Auto-Sync SKILL.md File Tree Design

**Date:** 2025-01-12
**Status:** Approved for implementation

## Problem

The file tree in `skills/working-with-claude-code/SKILL.md` (lines 43-86) lists documentation files with descriptions. When the automated workflow downloads updated documentation, the file tree becomes stale. New files appear in `references/` but not in SKILL.md. Removed files stay listed. Changed descriptions go unnoticed.

Manual updates are error-prone and easy to forget.

## Solution

Automate the file tree sync. When the documentation update workflow detects changes in `references/`, run a script that regenerates the file tree in SKILL.md from the actual files.

## Design

### Components

**1. New Script: `scripts/update_skill_tree.js`**

Scans `references/` and updates SKILL.md's file tree section.

**Extraction logic:**
- Read each `.md` file in `references/`
- Extract description from blockquote pattern: `> Description text`
- Fall back to H1 heading if blockquote missing: `# Heading Text`
- Use "Documentation file" if neither exists

**Tree generation:**
```
references/
├── file1.md              # Extracted description
├── file2.md              # Extracted description
└── file3.md              # Extracted description
```

**SKILL.md update:**
- Find content between `<!-- tree-start -->` and `<!-- tree-end -->` markers
- Replace with newly generated tree
- Preserve all other content

**2. SKILL.md Modifications**

Add HTML comment markers around the file tree section:

```markdown
## Documentation Organization

<!-- tree-start -->
```
references/
├── overview.md              # Claude Code introduction
...
```
<!-- tree-end -->
```

The script replaces content between these markers. Markers remain stable when other sections change.

**3. Workflow Integration**

Modify `.github/workflows/update-docs.yml`:

```yaml
- name: Run documentation updater
  run: node scripts/update_docs.js

- name: Check for changes
  id: check_changes
  run: |
    if [[ -n $(git status -s) ]]; then
      echo "changes=true" >> $GITHUB_OUTPUT
      git diff --name-only references/ > /tmp/changed_files.txt
    fi

- name: Update SKILL.md file tree
  if: steps.check_changes.outputs.changes == 'true'
  run: node scripts/update_skill_tree.js

- name: Commit and push changes
  if: steps.check_changes.outputs.changes == 'true'
  run: |
    git add references/ SKILL.md
    git commit -m "..."
    git push
```

The workflow orchestrates the logic. The script focuses on one task: update SKILL.md from references/.

### Error Handling

**Missing description patterns:**
- Use fallback sequence: blockquote → heading → generic text
- Log warning to console
- Continue processing other files

**Missing markers in SKILL.md:**
- Exit with error
- Display clear message: "Cannot find tree markers in SKILL.md"
- Workflow fails without committing

**Empty references/ directory:**
- Generate empty tree structure
- Update SKILL.md normally

### Testing Strategy

**Before integration:**
1. Run script standalone: `node scripts/update_skill_tree.js`
2. Verify SKILL.md changes: `git diff SKILL.md`
3. Test edge cases:
   - Add new file to references/
   - Remove existing file
   - Change blockquote description
   - Create file without blockquote (uses heading)
   - Create file without heading (uses generic text)

**Validation:**
- Verify references/ directory exists
- Verify SKILL.md contains both markers
- Verify generated tree is valid markdown

## Implementation Steps

1. Add HTML comment markers to SKILL.md
2. Create `scripts/update_skill_tree.js`:
   - File scanning logic
   - Description extraction
   - Tree generation
   - SKILL.md update
3. Update `.github/workflows/update-docs.yml`:
   - Add update_skill_tree.js step
   - Update commit step to include SKILL.md
4. Test locally with various scenarios
5. Commit and push
6. Verify workflow runs correctly on schedule

## Benefits

- File tree stays synchronized automatically
- No manual updates required
- Descriptions pulled from authoritative source (the files themselves)
- Clear, consistent formatting
- Fails safely if something goes wrong

## Trade-offs

**Chosen approach: Workflow orchestration**
- Workflow detects changes
- Workflow decides when to run script
- Script focuses on single task

**Rejected approach: Script checks git**
- Script would need git logic
- Less separation of concerns
- Harder to test standalone

The workflow already detects changes for commits. Adding the tree update step fits naturally into that flow.
