# Alex Skill Mall (Alex_Skill_Mall)

**Proposal: A Skill Store for Battle-Tested AI Development Knowledge**

---

## The Problem

LLMs know a lot, but they know it *shallowly*. Ask about "Azure Static Web Apps deployment" and you'll get generic documentation. Ask about the specific gotcha where `api_location:` in your workflow silently overrides a linked backend — that's not in the training data.

Hard-won knowledge lives in:
- Stack Overflow answers with 3 upvotes
- GitHub issues closed as "wontfix" with a workaround in the comments
- That one blog post from 2019 that's still the only correct answer
- Your own painful debugging sessions

Alex has accumulated this knowledge through real project work. The **Knowledge Base** makes it available as drop-in skills.

---

## What This Is

A curated repository of **hard skills** — domain knowledge that:

1. **Can't be easily searched** — The problem is knowing *what* to search for
2. **Isn't in LLM training data** — Or is there but buried in noise
3. **Has been battle-tested** — Used in real projects, debugged, refined
4. **Solves real problems** — Not theoretical patterns, actual gotchas

### What This Is NOT

- Generic best practices (use meaningful variable names!)
- Documentation summaries (read the Azure docs!)
- Shallow checklists (don't forget to test!)
- Anything you'd get from asking "how do I X" to any LLM

---

## How It Works

### For ACT Users

```bash
# Browse the catalog
gh repo clone fabioc-aloha/Alex_ACT_KB
cat CATALOG.md

# Copy a skill to your project
cp -r skills/azure-swa-gotchas/ /your/project/.github/skills/

# Or use a project scaffold
cp -r scaffolds/vite-azure-swa/ /your/new/project/
```

The skill becomes part of your `.github/` brain. ACT loads it like any other skill.

### For Contributors

1. Document a hard-won solution
2. Format as a skill (SKILL.md + optional instruction)
3. Submit PR with evidence (issue link, project reference)
4. Skill is reviewed for value density

---

## Repository Structure

```
Alex_ACT_KB/
├── README.md                    # Quick start
├── CATALOG.md                   # Browsable skill index with tags
├── CONTRIBUTING.md              # How to submit skills
│
├── skills/                      # Individual hard skills
│   ├── azure-swa-gotchas/
│   │   ├── SKILL.md            # The knowledge
│   │   └── azure-swa.instructions.md  # Optional auto-load
│   ├── mermaid-mode-fragility/
│   ├── github-wiki-flat-structure/
│   ├── vscode-cross-platform-paths/
│   └── ...
│
├── scaffolds/                   # Project starters
│   ├── vite-azure-swa/         # Vite + Azure Static Web Apps
│   ├── fastapi-container-apps/ # FastAPI + Azure Container Apps
│   ├── react-copilot-extension/ # React + Copilot SDK
│   └── ...
│
└── patterns/                    # Cross-domain patterns
    ├── atomic-file-writes.md
    ├── champion-challenger-cache.md
    └── ...
```

---

## Skill Categories

### Cloud Platform Gotchas

Hard-learned lessons from Azure, AWS, GCP that aren't in the docs.

| Skill | What It Solves |
|-------|----------------|
| `azure-swa-gotchas` | 12 specific SWA pitfalls (auth routes, embedded Functions, CLI failures) |
| `azure-identity-msi` | MSI = ServicePrincipal confusion, RBAC verification pattern |
| `azure-cost-management-api` | File-based body requirement, subscription context traps |
| `github-actions-deprecations` | Proactive version upgrades, Node 20→22 migration |

### Build & Tooling

When the build breaks in ways Stack Overflow doesn't cover.

| Skill | What It Solves |
|-------|----------------|
| `vite-public-rebuild` | Why committing to public/ doesn't serve the file |
| `node-winget-collision` | LTS and versioned packages share install dir |
| `mermaid-mode-fragility` | Timeline, gitGraph, gantt silent failures |
| `terminal-backtick-hazard` | Shell metacharacter interpretation across platforms |

### Documentation & Publishing

When docs rot and wikis break.

| Skill | What It Solves |
|-------|----------------|
| `github-wiki-flat` | All pages render at root, link rewriting required |
| `github-readme-override` | `.github/README.md` overrides root README |
| `docs-decay-velocity` | Hardcoded numbers rot fastest, automation patterns |
| `multi-surface-drift` | When counts appear in N files, they WILL diverge |

### Data & Analytics

Patterns from real data pipelines.

| Skill | What It Solves |
|-------|----------------|
| `tmdl-linter-false-positives` | VS Code TMDL linter limitations |
| `fabric-rest-patterns` | Workspace management, governance, medallion architecture |
| `temp-file-python-analysis` | Avoiding inline quoting issues across shells |

### Security & Auth

When authentication fails in production.

| Skill | What It Solves |
|-------|----------------|
| `entra-redirect-uris` | Custom domain + default hostname both required |
| `swa-x-frame-options` | Default DENY blocks iframes |
| `pat-expiration-silent` | Environment variable exists but is expired |
| `allowlist-over-blocklist` | Enumerate permitted values, reject everything else |

### Cross-Platform

When code works on Mac but breaks on Windows.

| Skill | What It Solves |
|-------|----------------|
| `cloud-storage-paths` | iCloud, OneDrive, Dropbox path variants |
| `line-ending-parsing` | Always use `/\r?\n/` for splitting |
| `vscode-user-paths` | Platform-specific config locations |

---

## Project Scaffolds

Pre-configured project starters that actually work.

### `vite-azure-swa`

Vite + Azure Static Web Apps with:
- Correct `staticwebapp.config.json` for SPA routing
- Auth routes properly ordered (anonymous before authenticated)
- Self-hosted CDN libraries (no CSP violations)
- AbortController for streaming endpoints
- GitHub Actions workflow that actually deploys

### `fastapi-container-apps`

FastAPI + Azure Container Apps with:
- Managed identity pre-configured
- Health check endpoints
- Structured logging for Azure Monitor
- Bicep IaC included

### `react-copilot-extension`

VS Code extension with Copilot Chat integration:
- Chat participant registered
- Tool contributions wired
- Extension manifest correct
- Test harness included

### `python-data-pipeline`

Azure Synapse notebook patterns:
- Medallion architecture (bronze/silver/gold)
- Delta Lake configuration
- Spark session best practices
- Error handling patterns

---

## Quality Gate

Every skill must pass:

| Criterion | Question |
|-----------|----------|
| **Value density** | Would this save someone >30 min of debugging? |
| **Non-obvious** | Is this NOT the first result on Google/Stack Overflow? |
| **Battle-tested** | Has this been used in a real project? |
| **Specific** | Does this solve a concrete problem, not a vague concern? |
| **Current** | Is this still relevant (not fixed in a newer version)? |

Skills that fail any criterion are rejected or moved to a "tips" section.

---

## Governance

### Curation

- Skills are reviewed for value density before merge
- Stale skills are marked with `@deprecated` and removal date
- High-value skills are promoted to ACT Edition core

### Versioning

- Skills include `@currency` date (last verified)
- Breaking changes to skill format bump major version
- Scaffolds track their dependency versions

### Attribution

- Skills credit the original discoverer
- Links to source issues/discussions where applicable
- No PII or client-specific content (per cross-project isolation rules)

---

## Relationship to ACT Edition

```
Alex_ACT_Edition (51 instructions)
    ↓ references
Alex_ACT_KB (skill store)
    ↓ users copy
Your Project (.github/skills/)
```

ACT Edition provides the **cognitive architecture** — how to think.
Knowledge Base provides the **domain knowledge** — what to know.

Users can use ACT without KB (general critical thinking).
Users can use KB without ACT (just the skills).
Together: disciplined reasoning + curated knowledge.

---

## MVP Scope

### Phase 1: Core Skills (20)

Extract and format the highest-value skills from `learned-patterns.instructions.md`:

1. Azure SWA gotchas (12 patterns → 1 skill)
2. Mermaid mode fragility
3. GitHub Wiki flat structure
4. Terminal backtick hazard
5. Cross-platform paths
6. Node winget collision
7. GitHub README override
8. Docs decay patterns
9. Atomic file writes
10. Champion-challenger cache
11. Entra redirect URIs
12. TMDL linter false positives
13. Line ending parsing
14. PAT expiration detection
15. Allowlist over blocklist
16. Temp file Python analysis
17. Self-contained escapes check
18. Config code drift detection
19. Release script artifact order
20. DryRun path simulation

### Phase 2: Scaffolds (4)

1. `vite-azure-swa` — Full SWA deployment
2. `fastapi-container-apps` — API backend
3. `react-copilot-extension` — VS Code extension
4. `python-data-pipeline` — Synapse notebooks

### Phase 3: Community

- Open for contributions
- PR template enforces quality gate
- Monthly curation review

---

## Success Metrics

| Metric | Target |
|--------|--------|
| Skills with >30 min time savings | 100% |
| Skills used in >1 project | 80% |
| Scaffold successful first-deploy rate | 90% |
| Community contributions accepted | 10+ in first 6 months |

---

## Next Steps

1. [ ] Create `fabioc-aloha/Alex_ACT_KB` repo
2. [ ] Extract Phase 1 skills from learned-patterns
3. [ ] Create CATALOG.md with tags and search
4. [ ] Build first scaffold (vite-azure-swa)
5. [ ] Document contribution workflow
6. [ ] Announce in ACT Edition README

---

*"Knowledge that took hours to discover should take seconds to find."*
