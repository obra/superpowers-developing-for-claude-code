# Changelog

All notable changes to the superpowers-developing-for-claude-code plugin will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
