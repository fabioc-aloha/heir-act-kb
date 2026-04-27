# Alex Knowledge Base

**Battle-tested skills for AI-assisted development**

This is a curated collection of hard-won knowledge — the gotchas, patterns, and solutions that take hours to discover but seconds to apply. Drop a skill into your `.github/` folder and your AI assistant learns it instantly.

---

## Quick Start

```bash
# Clone the knowledge base
git clone https://github.com/fabioc-aloha/heir-act-kb.git

# Copy a skill to your project
cp -r heir-act-kb/skills/security/shell-injection-prevention/ /your/project/.github/skills/

# Or copy a whole category
cp -r heir-act-kb/skills/azure/ /your/project/.github/skills/
```

Your AI assistant (Copilot, Claude, Cursor, etc.) now has access to the skill.

---

## What's Here

### [Skills](skills/) — Hard Knowledge (20 MVP skills)

Domain-specific knowledge that saves debugging time:

| Category | Count | What They Solve |
|----------|-------|-----------------|
| [Security](skills/security/) | 3 | XSS, shell injection, input validation |
| [Cross-Platform](skills/cross-platform/) | 4 | Path handling, line endings, shell quirks |
| [Azure](skills/azure/) | 2 | MSI identity, subscription context |
| [Cloud](skills/cloud/) | 1 | Azure SWA gotchas (12 issues) |
| [GitHub](skills/github/) | 2 | README override, Wiki structure |
| [Documentation](skills/documentation/) | 2 | Mermaid fragility, docs decay |
| [Windows/Node](skills/windows-node/) | 2 | Winget collisions, PAT expiration |
| [Quality](skills/quality/) | 1 | Universal audit pattern |
| [Visual](skills/visual/) | 1 | Image embedding limits |
| [VitePress](skills/vitepress/) | 1 | Iframe embed pattern |
| [Architecture](skills/architecture/) | 1 | Defaults-plus-overrides pattern |

[Browse the full catalog →](CATALOG.md)

### [Scaffolds](scaffolds/) — Project Starters

Pre-configured projects that actually deploy:

| Scaffold | Stack | What You Get |
|----------|-------|--------------|
| [vite-azure-swa](scaffolds/vite-azure-swa/) | Vite + Azure Static Web Apps | SPA with auth, CI/CD, correct config |

### [Patterns](patterns/) — Cross-Domain Solutions

Reusable patterns that apply everywhere:

| Pattern | Description |
|---------|-------------|
| [Champion-Challenger Cache](patterns/champion-challenger-cache.md) | Hash LLM inputs, skip API if unchanged |

---

## Quality Standard

Every skill in this repo has passed:

| Gate | Requirement |
|------|-------------|
| **Time savings** | Would save >30 min of debugging |
| **Non-obvious** | Not the first Google/Stack Overflow result |
| **Battle-tested** | Used in a real project |
| **Specific** | Solves a concrete problem |
| **Current** | Still relevant (not fixed in newer version) |

If you can find it with a simple search, it doesn't belong here.

---

## AI Assistant Auto-Discovery

This KB includes [`.github/copilot-instructions.md`](.github/copilot-instructions.md) — instructions that tell AI assistants how to browse and use skills automatically.

### For GitHub Copilot / VS Code

Clone this repo as a submodule or reference folder:

```bash
# In your project
git submodule add https://github.com/fabioc-aloha/heir-act-kb.git kb

# Or just clone alongside
git clone https://github.com/fabioc-aloha/heir-act-kb.git
```

When the AI sees the `.github/copilot-instructions.md`, it learns:
- **How to browse** — Check CATALOG.md for relevant skills
- **When to load** — Problem→Skill mapping table
- **Proactive suggestions** — Pattern recognition triggers

### For Other AI Assistants (Claude, ChatGPT, etc.)

Point the assistant at this repo:

```
I have access to a knowledge base at https://github.com/fabioc-aloha/heir-act-kb

When I mention a problem, check the CATALOG.md for relevant skills.
Load the SKILL.md file before giving advice.
```

Or paste the [copilot-instructions.md](.github/copilot-instructions.md) content into your system prompt.

### Problem→Skill Quick Reference

| Problem | Skill |
|---------|-------|
| Shell command fails silently | `terminal-backtick-hazard` |
| XSS / markdown rendering | `markdown-sanitization-chain` |
| Azure CLI returns empty | `azure-subscription-context` |
| Azure SWA issues | `azure-swa-gotchas` |
| Mermaid not rendering | `mermaid-mode-fragility` |
| String comparison fails Windows | `line-ending-parsing` |

[Full mapping in copilot-instructions.md →](.github/copilot-instructions.md)

---

## Contributing

Found a gotcha worth sharing? [See the contribution guide](CONTRIBUTING.md).

Skills must:

1. Solve a real problem you've hit
2. Save meaningful debugging time
3. Not be easily discoverable via search
4. Include verification steps

---

## License

MIT — use freely, contribute back.

---

## Origin

These skills are extracted from [Alex](https://github.com/fabioc-aloha/alex) — the cognitive architecture for AI-assisted development. The Knowledge Base shares the hard skills without the full brain infrastructure.
