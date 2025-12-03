# Changelog

All notable changes to the superpowers-developing-for-claude-code plugin will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.3.1] - 2025-12-03

### Fixed
- Updated polyglot hook wrapper to use POSIX-compliant syntax
  - Changed `${BASH_SOURCE[0]:-$0}` to `$0` in run-hook.cmd example
  - Prevents "Bad substitution" errors on Ubuntu/Debian systems where /bin/sh is dash
  - Updated polyglot-hooks.md documentation with explanation of POSIX compliance requirement
  - Matches fix from superpowers v3.6.2

## [0.3.0] - 2025-12-02

### Added
- Cross-platform polyglot hook wrapper for Windows support
  - Added `run-hook.cmd` polyglot wrapper to full-featured-plugin example
  - Created comprehensive polyglot-hooks.md documentation in developing-claude-code-plugins/references/
  - Documents how to write hooks that work on Windows (CMD), macOS, and Linux
  - Explains polyglot script technique using bash heredoc and CMD labels

### Changed
- Updated full-featured-plugin example to use polyglot wrapper pattern
  - Moved hook scripts from scripts/ to hooks/ directory
  - Updated hooks.json to use run-hook.cmd wrapper
  - Updated README to reflect new structure and cross-platform support
- Enhanced plugin-structure.md with cross-platform hooks guidance
- Added polyglot-hooks.md to quick reference table in SKILL.md

## [0.2.1] - 2025-11-22

### Fixed
- Added comprehensive documentation to prevent "Duplicate hooks file detected" error
  - plugin-structure.md: Added prominent warning about hooks/hooks.json auto-loading with correct/incorrect examples
  - troubleshooting.md: Added dedicated troubleshooting section for duplicate hooks error with root cause and solution
  - Clarified that manifest.hooks field should only reference ADDITIONAL hook files, not the standard hooks/hooks.json
  - Validated with subagents to ensure guidance is clear and prevents the issue

## [0.2.0] - 2025-10-31

### Added
- Comprehensive release engineering guidance in Phase 6 of developing-claude-code-plugins skill
  - Detailed versioning, tagging, and distribution workflow
  - Three distribution patterns: direct GitHub, marketplace, and private/team
  - Release testing and maintenance steps

### Changed
- Expanded skill description to cover complete plugin lifecycle
- Updated workflow summary to include Release and Maintain phases
- Restructured Phase 6 with practical examples from real marketplace releases

## [0.1.0] - Initial Release

### Added
- developing-claude-code-plugins skill with comprehensive plugin development workflow
- Plugin structure reference documentation
- Common patterns guide
- Troubleshooting guide
- Example plugins (simple-greeter and full-featured)
- working-with-claude-code skill with 42+ official documentation files
- Self-update script for keeping documentation current
