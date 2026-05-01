# Alex Skill Mall

**Battle-tested skills for AI-assisted development**

This is a curated collection of hard-won knowledge — the gotchas, patterns, and solutions that take hours to discover but seconds to apply. Drop a skill into your `.github/` folder and your AI assistant learns it instantly.

---

## Quick Start

```bash
# Clone the skill mall
git clone https://github.com/fabioc-aloha/Alex_Skill_Mall.git

# Copy a skill to your project
cp -r Alex_Skill_Mall/skills/security/shell-injection-prevention/ /your/project/.github/skills/

# Or copy a whole category
cp -r Alex_Skill_Mall/skills/azure/ /your/project/.github/skills/
```

Your AI assistant (Copilot, Claude, Cursor, etc.) now has access to the skill.

---

## What's Here

### [Skills](skills/) — Hard Knowledge (235 skills)

Domain-specific knowledge that saves debugging time:

| Category | Count | What They Solve |
| --- | --- | --- |
| [Critical Thinking](skills/critical-thinking/) | 15 | ACT pass, hypothesis debugging, root cause, problem framing |
| [Quality](skills/quality/) | 17 | Code review, testing strategies, audit patterns, refactoring |
| [Documentation](skills/documentation/) | 16 | Mermaid, docs decay, count drift, version stamps |
| [AI / LLM](skills/ai-llm/) | 15 | MCP servers, agents, RAG, prompt engineering, evals |
| [Azure](skills/azure/) | 15 | Graph API, Fabric, OpenAI, deployment, Entra, MSAL |
| [Media](skills/media/) | 14 | Banners, SVG, image processing, presentations |
| [Domain](skills/domain/) | 12 | Localization, healthcare, business analysis |
| [Security](skills/security/) | 11 | XSS, injection, API hardening, secrets, threat modeling |
| [Converters](skills/converters/) | 11 | Word, PDF, EPUB, LaTeX, PPTX, HTML, email, plain text |
| [Data](skills/data/) | 10 | KQL, database design, TMDL, Python analysis |
| [Architecture](skills/architecture/) | 10 | Defaults-plus-overrides, pipelines, scoring, patterns |
| [Process](skills/process/) | 8 | Release preflight, git workflow, scope management, risk |
| [Build](skills/build/) | 5 | Path rot, config separation, data-driven layouts |
| [Cross-Platform](skills/cross-platform/) | 5 | Path handling, regex, line endings, shell quirks |
| [Communication](skills/communication/) | 5 | Executive storytelling, stakeholder mgmt, status reports |
| [Publishing](skills/publishing/) | 4 | KDP, book publishing, editorial workflows |
| [Productivity](skills/productivity/) | 4 | Workflow optimization, automation patterns |
| [People](skills/people/) | 4 | Team dynamics, mentoring, collaboration |
| [Frontend](skills/frontend/) | 3 | React, CSS, responsive patterns |
| [VitePress](skills/vitepress/) | 3 | Iframe embed, clean URLs, SPA routing |
| [VS Code](skills/vscode/) | 3 | Extension patterns, config validation, environment |
| [Operations](skills/operations/) | 3 | Postmortem, observability, monitoring |
| [Design](skills/design/) | 2 | UI/UX patterns, design systems |
| [GitHub](skills/github/) | 2 | README override, Wiki structure |
| [Infrastructure](skills/infrastructure/) | 2 | IaC, Bicep AVM |
| [Privacy](skills/privacy/) | 2 | Responsible AI, data protection |
| [Visual](skills/visual/) | 2 | Image embedding, storage split |
| [Windows/Node](skills/windows-node/) | 2 | Winget collisions, PAT expiration |
| [Academic](skills/academic/) | 7 | Editorial judgment, survey verification, research |
| [Testing](skills/testing/) | 1 | Python mock patching location |
| [JavaScript](skills/javascript/) | 1 | Boolean string trap |
| [Cloud](skills/cloud/) | 1 | Azure SWA gotchas (12 issues) |
| [GitHub Actions](skills/github-actions/) | 1 | Version upgrades |
| [Performance](skills/performance/) | 1 | CPU, memory, network profiling |

[Browse the full catalog →](CATALOG.md)

Need something not in this Mall? Run `/feedback` in your heir to request it. The Supervisor evaluates external stores and promotes skills here.

### [Scaffolds](scaffolds/) — Project Starters

Pre-configured projects that actually deploy:

| Scaffold | Stack | What You Get |
| --- | --- | --- |
| [vite-azure-swa](scaffolds/vite-azure-swa/) | Vite + Azure Static Web Apps | SPA with auth, CI/CD, correct config |

### [Patterns](patterns/) — Cross-Domain Solutions

Reusable patterns that apply everywhere:

| Pattern | Description |
| --- | --- |
| [Champion-Challenger Cache](patterns/champion-challenger-cache.md) | Hash LLM inputs, skip API if unchanged |

### [Configs](configs/) — Drop-In Tool Configurations

Portable config files your tooling consumes directly (VS Code settings, themes, linter rules):

| Config | What It Does |
| --- | --- |
| [markdown-light](configs/markdown-light/) | GitHub-flavored markdown preview theme for VS Code |

---

## Quality Standard

Every skill in this repo has passed:

| Gate | Requirement |
| --- | --- |
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

## Using the Mall

### From a VS Code heir

1. Run `/find-skill <keyword>` to search
2. Run `/install-from-mall` for guided install with project-needs assessment
3. Skills install into `.github/skills/local/` (survives Edition upgrades)

### Clone for local access

```bash
git clone https://github.com/fabioc-aloha/Alex_Skill_Mall.git ~/Alex_Skill_Mall
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
