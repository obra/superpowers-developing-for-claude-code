---
name: working-with-claude-code
description: Use when working with Claude Code CLI, plugins, hooks, MCP servers, skills, configuration, or any Claude Code feature - provides comprehensive official documentation for all aspects of Claude Code
---

# Working with Claude Code

## Overview

This skill provides complete, authoritative documentation for Claude Code directly from docs.claude.com. Instead of guessing about configuration paths, API structures, or feature capabilities, read the official docs stored in this skill's references directory.

## When to Use

Use this skill when:
- Creating or configuring Claude Code plugins
- Setting up MCP servers
- Working with hooks (pre-commit, session-start, etc.)
- Writing or testing skills
- Configuring Claude Code settings
- Troubleshooting Claude Code issues
- Understanding CLI commands
- Setting up integrations (VS Code, JetBrains, etc.)
- Configuring networking, security, or enterprise features

## Quick Reference

| Task | Read This File |
|------|---------------|
| Create a plugin | `plugins.md` then `plugins-reference.md` |
| Set up MCP server | `mcp.md` |
| Configure hooks | `hooks.md` then `hooks-guide.md` |
| Write a skill | `skills.md` |
| CLI commands | `cli-reference.md` |
| Troubleshoot issues | `troubleshooting.md` |
| General setup | `setup.md` or `quickstart.md` |
| Configuration options | `settings.md` |

## Documentation Organization

All documentation is stored as individual markdown files in `references/`. Use the Read tool to access specific documentation:

<!-- tree-start -->
```
references/
├── amazon-bedrock.md        # Learn about configuring Claude Code through Amazon Bedrock, including setup, IAM configuration, and troubleshooting.
├── analytics.md             # View detailed usage insights and productivity metrics for your organization's Claude Code deployment.
├── azure-ai-foundry.md      # Learn about configuring Claude Code through Azure AI Foundry, including setup, configuration, and troubleshooting.
├── checkpointing.md         # Automatically track and rewind Claude's edits to quickly recover from unwanted changes.
├── chrome.md                # Connect Claude Code to your browser to test web apps, debug with console logs, and automate browser tasks.
├── claude-code-on-the-web.md# Run Claude Code tasks asynchronously on secure cloud infrastructure
├── cli-reference.md         # Complete reference for Claude Code command-line interface, including commands and flags.
├── common-workflows.md      # Learn about common workflows with Claude Code.
├── costs.md                 # Learn how to track and optimize token usage and costs when using Claude Code.
├── data-usage.md            # Learn about Anthropic's data usage policies for Claude
├── desktop.md               # Run Claude Code tasks locally or on secure cloud infrastructure with the Claude desktop app
├── devcontainer.md          # Learn about the Claude Code development container for teams that need consistent, secure environments.
├── github-actions.md        # Learn about integrating Claude Code into your development workflow with Claude Code GitHub Actions
├── gitlab-ci-cd.md          # Learn about integrating Claude Code into your development workflow with GitLab CI/CD
├── google-vertex-ai.md      # Learn about configuring Claude Code through Google Vertex AI, including setup, IAM configuration, and troubleshooting.
├── headless.md              # Run Claude Code programmatically without interactive UI
├── hooks-guide.md           # Learn how to customize and extend Claude Code's behavior by registering shell commands
├── hooks.md                 # This page provides reference documentation for implementing hooks in Claude Code.
├── iam.md                   # Learn how to configure user authentication, authorization, and access controls for Claude Code in your organization.
├── interactive-mode.md      # Complete reference for keyboard shortcuts, input modes, and interactive features in Claude Code sessions.
├── jetbrains.md             # Use Claude Code with JetBrains IDEs including IntelliJ, PyCharm, WebStorm, and more
├── legal-and-compliance.md  # Legal agreements, compliance certifications, and security information for Claude Code.
├── llm-gateway.md           # Learn how to configure Claude Code to work with LLM gateway solutions. Covers gateway requirements, authentication configuration, model selection, and provider-specific endpoint setup.
├── mcp.md                   # Learn how to connect Claude Code to your tools with the Model Context Protocol.
├── memory.md                # Learn how to manage Claude Code's memory across sessions with different memory locations and best practices.
├── microsoft-foundry.md     # Learn about configuring Claude Code through Microsoft Foundry, including setup, configuration, and troubleshooting.
├── migration-guide.md       # Guide for migrating the Claude Code TypeScript and Python SDKs to the Claude Agent SDK
├── model-config.md          # Learn about the Claude Code model configuration, including model aliases like `opusplan`
├── monitoring-usage.md      # Learn how to enable and configure OpenTelemetry for Claude Code.
├── network-config.md        # Configure Claude Code for enterprise environments with proxy servers, custom Certificate Authorities (CA), and mutual Transport Layer Security (mTLS) authentication.
├── output-styles.md         # Adapt Claude Code for uses beyond software engineering
├── overview.md              # Learn about Claude Code, Anthropic's agentic coding tool that lives in your terminal and helps you turn ideas into code faster than ever before.
├── plugin-marketplaces.md   # Create and manage plugin marketplaces to distribute Claude Code extensions across teams and communities.
├── plugins-reference.md     # Complete technical reference for Claude Code plugin system, including schemas, CLI commands, and component specifications.
├── plugins.md               # Extend Claude Code with custom commands, agents, hooks, Skills, and MCP servers through the plugin system.
├── quickstart.md            # Welcome to Claude Code!
├── sandboxing.md            # Learn how Claude Code's sandboxed bash tool provides filesystem and network isolation for safer, more autonomous agent execution.
├── security.md              # Learn about Claude Code's security safeguards and best practices for safe usage.
├── settings.md              # Configure Claude Code with global and project-level settings, and environment variables.
├── setup.md                 # Install, authenticate, and start using Claude Code on your development machine.
├── skills.md                # Create, manage, and share Skills to extend Claude's capabilities in Claude Code.
├── slack.md                 # Delegate coding tasks directly from your Slack workspace
├── slash-commands.md        # Control Claude's behavior during an interactive session with slash commands.
├── statusline.md            # Create a custom status line for Claude Code to display contextual information
├── sub-agents.md            # Create and use specialized AI subagents in Claude Code for task-specific workflows and improved context management.
├── terminal-config.md       # Claude Code works best when your terminal is properly configured. Follow these guidelines to optimize your experience.
├── third-party-integrations.md# Learn how Claude Code can integrate with various third-party services and infrastructure to meet enterprise deployment requirements.
├── troubleshooting.md       # Discover solutions to common issues with Claude Code installation and usage.
└── vs-code.md               # Install and configure the Claude Code extension for VS Code. Get AI coding assistance with inline diffs, @-mentions, plan review, and keyboard shortcuts.
```
<!-- tree-end -->

## Workflow

### For Specific Questions

1. Identify the relevant documentation file from the list above
2. Use Read tool to load: `@references/filename.md`
3. Find the answer in the official documentation
4. Apply the solution

**Example:**
```
User: "How do I create a Claude Code plugin?"
→ Read @references/plugins.md
→ Follow the official plugin creation steps
```

### For Broad Topics

When exploring a topic, start with the overview document, then drill into specific files:

- **Extending Claude Code**: Start with `plugins.md`, `skills.md`, or `mcp.md`
- **Configuration**: Start with `settings.md` or `setup.md`
- **Integrations**: Check relevant integration file (vs-code.md, github-actions.md, etc.)
- **Troubleshooting**: Start with `troubleshooting.md`

### For Uncertain Topics

Use Grep tool to search across all documentation:

```bash
pattern: "search term"
path: ~/.claude/skills/working-with-claude-code/references/
```

## Updating Documentation

The skill includes `scripts/update_docs.js` to fetch the latest documentation from docs.claude.com.

Run when:
- Documentation seems outdated
- New Claude Code features are released
- Official docs have been updated

```bash
node ~/.claude/skills/working-with-claude-code/scripts/update_docs.js
```

The script:
1. Fetches llms.txt from code.claude.com/docs/llms.txt
2. Extracts all Claude Code documentation URLs
3. Downloads each page to `references/`
4. Reports success/failures

## Common Patterns

### Plugin Development

Read `plugins.md` for overview, then `plugins-reference.md` for API details.

### MCP Server Setup

Read `mcp.md` for configuration format and examples.

### Hook Configuration

Read `hooks.md` for overview, then `hooks-guide.md` for implementation details.

### Skill Creation

Read `skills.md` for the complete skill authoring guide.

## What This Skill Does NOT Do

- This skill provides **documentation access**, not procedural guidance
- For workflows on **how to build** plugins/skills, use the `extending-claude-code` skill (when available)
- This skill is a **reference library**, not a tutorial

## Red Flags

If you find yourself:
- Guessing about configuration file locations → Read `settings.md`
- Speculating about API structures → Read relevant reference doc
- Unsure about hook names → Read `hooks.md`
- Making assumptions about features → Search the docs first

**Always consult the official documentation before guessing.**
