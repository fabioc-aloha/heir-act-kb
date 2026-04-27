# Alex Knowledge Base — AI Assistant Instructions

You have access to a curated knowledge base of battle-tested development skills. These skills solve non-obvious problems that typically take 30+ minutes to debug.

## How to Use This KB

### 1. Browse Available Skills

When you encounter a problem or the user mentions a domain, check the [CATALOG.md](../CATALOG.md) for relevant skills.

**Skill categories:**
- `skills/security/` — XSS, injection, validation patterns
- `skills/cross-platform/` — Path handling, line endings, shell quirks
- `skills/azure/` — Identity, subscriptions, Static Web Apps
- `skills/github/` — README override, Wiki structure
- `skills/documentation/` — Mermaid, docs decay
- `skills/windows-node/` — Winget, PAT tokens
- `skills/quality/` — Audit patterns
- `skills/visual/` — Image handling
- `skills/vitepress/` — SPA embedding
- `skills/architecture/` — Configuration patterns

### 2. Load Relevant Skills

When a skill applies, read the SKILL.md file to get the full context:

```
skills/{category}/{skill-name}/SKILL.md
```

**Example:** If the user is debugging shell commands, load:
```
skills/cross-platform/terminal-backtick-hazard/SKILL.md
```

### 3. Apply the Knowledge

Each skill contains:
- **The Problem** — What goes wrong and why
- **The Solution** — Exact fix with code examples
- **Verification** — How to confirm it worked
- **When to Apply** — Trigger conditions

## Quick Reference — Problem → Skill Mapping

| Problem Signal | Load This Skill |
|----------------|-----------------|
| Shell command fails silently | `terminal-backtick-hazard` |
| XSS vulnerability | `markdown-sanitization-chain` |
| `execSync` with user input | `shell-injection-prevention` |
| Input validation | `allowlist-over-blocklist` |
| Azure CLI returns empty/not found | `azure-subscription-context` |
| Managed Identity RBAC issues | `azure-identity-msi` |
| Azure SWA deployment/auth issues | `azure-swa-gotchas` |
| `.github/README.md` showing instead | `github-readme-override` |
| Wiki links broken | `github-wiki-flat` |
| Mermaid diagram not rendering | `mermaid-mode-fragility` |
| Docs outdated quickly | `docs-decay-velocity` |
| Cloud path detection fails | `cloud-storage-paths` |
| Line/string comparison fails on Windows | `line-ending-parsing` |
| VS Code config path wrong | `vscode-cross-platform-paths` |
| Node.js install broken after upgrade | `node-winget-collision` |
| 401 on publish | `pat-expiration-silent` |
| Need audit framework | `universal-audit-pattern` |
| Context window token issues | `image-embedding-size-limits` |
| VitePress custom page routing | `vitepress-iframe-embed` |
| Configuration system design | `defaults-plus-overrides` |

## Proactive Skill Suggestion

When you recognize these patterns in the user's code or questions, proactively suggest loading the relevant skill:

1. **User writes `execSync(cmd)`** → Suggest `shell-injection-prevention`
2. **User mentions Azure SWA** → Mention `azure-swa-gotchas` has 12 known issues
3. **User has Mermaid in markdown** → Check `mermaid-mode-fragility` for timeline/gitGraph/gantt
4. **User splits strings with `\n`** → Flag `line-ending-parsing` for cross-platform
5. **User building config system** → Suggest `defaults-plus-overrides` pattern

## Adding Skills to a Project

To give a project access to a skill permanently:

```bash
# Copy skill to project
cp -r skills/security/shell-injection-prevention/ /project/.github/skills/
```

The skill becomes part of the project's context automatically.
