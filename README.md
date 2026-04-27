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

### [Skills](skills/) — Hard Knowledge (56 skills)

Domain-specific knowledge that saves debugging time:

| Category | Count | What They Solve |
|----------|-------|-----------------|
| [Security](skills/security/) | 6 | XSS, injection, API hardening, path traversal |
| [Quality](skills/quality/) | 8 | Audit patterns, QA, testing, date arithmetic |
| [Documentation](skills/documentation/) | 6 | Mermaid, docs decay, count drift, version stamps |
| [Architecture](skills/architecture/) | 5 | Defaults-plus-overrides, pipelines, scoring |
| [Build](skills/build/) | 5 | Path rot, config separation, data-driven layouts |
| [Cross-Platform](skills/cross-platform/) | 5 | Path handling, regex, line endings, shell quirks |
| [Azure](skills/azure/) | 4 | MSI, subscription, Cost API, MSAL singleton |
| [VitePress](skills/vitepress/) | 3 | Iframe embed, clean URLs, SPA routing |
| [Academic](skills/academic/) | 2 | Editorial judgment, survey verification |
| [Data](skills/data/) | 2 | Temp-file analysis, TMDL linter |
| [GitHub](skills/github/) | 2 | README override, Wiki structure |
| [Visual](skills/visual/) | 2 | Image embedding, storage split |
| [Windows/Node](skills/windows-node/) | 2 | Winget collisions, PAT expiration |
| [Testing](skills/testing/) | 1 | Python mock patching location |
| [JavaScript](skills/javascript/) | 1 | Boolean string trap |
| [Cloud](skills/cloud/) | 1 | Azure SWA gotchas (12 issues) |
| [GitHub Actions](skills/github-actions/) | 1 | Version upgrades |

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

This KB includes [`.github/copilot-instructions.md`](.github/copilot-instructions.md) — instructions that tell AI assistants to consult the [CATALOG.md](CATALOG.md) when problems arise.

---

## KB Mall — External Skill Stores

When heir-act-kb doesn't have what you need, browse other stores:

**[STORES.md](STORES.md)** — LLM-friendly directory of 15+ skill stores

| Store | Stars | Focus |
|-------|-------|-------|
| [microsoft/skills](https://github.com/microsoft/skills) | 2.2K | Azure SDKs (132 skills, 5 languages) |
| [affaan-m/everything-claude-code](https://github.com/affaan-m/everything-claude-code) | 168K | Largest cross-platform (183 skills) |
| [anthropics/claude-plugins-official](https://github.com/anthropics/claude-plugins-official) | 18K | Official Claude Code plugins |
| [alirezarezvani/claude-skills](https://github.com/alirezarezvani/claude-skills) | 12K | 12-platform support (235 skills) |

Your AI can read STORES.md to research which store has your answer.

### For GitHub Copilot / VS Code

Clone this repo as a submodule or reference folder:

```bash
git submodule add https://github.com/fabioc-aloha/heir-act-kb.git kb
```

### For Other AI Assistants (Claude, ChatGPT, etc.)

```
I have access to a skill store at https://github.com/fabioc-aloha/heir-act-kb
Consult the CATALOG.md for available skills. Load the SKILL.md before giving advice.
```

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
