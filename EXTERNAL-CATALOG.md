# External Catalog — What the Stores Offer

Abbreviated, **at-a-glance summary** of skills, agents, plugins, and MCP servers offered by the stores listed in [STORES.md](STORES.md).

> **Scope**: This is a *navigation aid*, not an inventory. For full, current contents always defer to each store's own repository or catalog.
> **Snapshot date**: 2026-04-28
> **For Alex_Skill_Mall's own skills**, see [CATALOG.md](CATALOG.md). This file deliberately excludes them to avoid duplication.

## How to use

1. Scan the table to find a store whose offerings match your need
2. Open the linked store entry in [STORES.md](STORES.md) for evaluation criteria, license, and install instructions
3. Browse the store's own catalog for current contents — the numbers below decay fast

---

## Quick Reference by Need

| You need... | Look at | Store category |
|---|---|---|
| Local file / git / fetch / memory MCP servers | `modelcontextprotocol/servers` | MCP — first-party |
| Any MCP server (broad discovery) | `punkpeye/awesome-mcp-servers` + glama.ai | MCP — registry |
| Anthropic-curated Claude Code plugins | `anthropics/claude-plugins-official` | First-party |
| Azure SDK skills (multi-language) | `microsoft/skills` | First-party |
| Microsoft RPI workflow (research-plan-implement) | `microsoft/hve-core` | First-party |
| Largest cross-platform skill collection | `affaan-m/everything-claude-code` | Cross-platform |
| Quality-graded agent + skill collection | `wshobson/agents` | Cross-platform |
| Subagent patterns (delegated sub-tasks) | `VoltAgent/awesome-claude-code-subagents` | Cross-platform |
| Multi-tool conversion (12 IDE/AI tools) | `alirezarezvani/claude-skills` | Cross-platform |
| Awesome-list curation of Claude Code | `hesreallyhim/awesome-claude-code` | Curated list |
| LLM-coding pitfalls (single CLAUDE.md) | `forrestchang/andrej-karpathy-skills` | Curated list |
| Golang skills | `samber/cc-skills-golang` | Domain |
| Android (Kotlin / Compose) | `new-silvermoon/awesome-android-agent-skills` | Domain |
| Rust | `leonardomso/rust-skills` | Domain |
| Embedded development | `zhinkgit/embeddedskills` | Domain |
| Game dev (Unity / Godot / Unreal) | `Donchitos/Claude-Code-Game-Studios` | Domain |
| Marketing (CRO / SEO / copy / analytics) | `coreyhaines31/marketingskills` | Domain |
| Platform engineering (Ubuntu / Canonical) | `canonical/copilot-collections` | Copilot |
| Modern web dev + MCP configs | `ikcode-dev/copilot-kit` | Copilot |
| Cross-IDE project rules | `aios-labs/projectrules` | Copilot |

---

## MCP Server Registries

### modelcontextprotocol/servers — Official Anthropic reference servers

**License**: MIT · **Authority**: First-party

| Server | Purpose |
|---|---|
| `filesystem` | Local file access with allowlisted directories |
| `fetch` | HTTP fetch with content-type handling |
| `git` | Git repository operations (read/inspect) |
| `memory` | Persistent memory across sessions |
| `sequential-thinking` | Structured step-by-step reasoning |
| `time` | Timezone and time utilities |
| `sqlite` | SQLite database query / inspection |

These set the conventions every other MCP server follows. **Start here** when wiring `.mcp.json`.

### punkpeye/awesome-mcp-servers — Canonical community registry

**License**: MIT (list itself; individual servers vary) · **Stars**: 85K+ · **Web directory**: glama.ai/mcp/servers

Categories (~30, abbreviated):

| Group | Examples of what's inside |
|---|---|
| **Aggregators** | Multi-server proxies, server-of-servers |
| **Browser Automation** | Playwright, Puppeteer, headless Chrome |
| **Cloud Platforms** | AWS, Azure, GCP, Cloudflare integrations |
| **Code Execution** | Sandboxed runtimes (Python, Node, Deno) |
| **Databases** | Postgres, MySQL, MongoDB, Redis, vector DBs |
| **Developer Tools** | GitHub, GitLab, Linear, Jira, Sentry |
| **File Systems** | Cloud storage (S3, GCS, OneDrive, Dropbox) |
| **Finance** | Market data, accounting, payment APIs |
| **Knowledge & Memory** | Vector stores, knowledge graphs, note systems |
| **Location Services** | Maps, geocoding, weather |
| **Monitoring** | Logs, metrics, observability platforms |
| **Search & Data Extraction** | Web search, scraping, document parsing |
| **Security** | Vulnerability scanning, secrets management |
| **Workplace** | Slack, Teams, calendar, email |
| **Art & Culture** | Image generation, museums, music |
| **Communication** | Voice, video, messaging |

**Caveat**: Volume is high, quality varies — score individual servers (active maintenance, license, security review) before adoption.

---

## Skill / Agent / Plugin Stores

### First-party

| Store | Skills | Agents | Plugins | Other | Notable |
|---|---:|---:|---:|---|---|
| `anthropics/claude-plugins-official` | ✓ | ✓ | many | commands | Anthropic-reviewed quality bar |
| `github/copilot-plugins` | ✓ | — | — | hooks (planned) | Early stage; MCP support coming |
| `microsoft/skills` | **132** | 5 | 2 | MCP configs, 1158-test harness | Python 41 / .NET 29 / TS 25 / Java 26 / Rust 7 |
| `microsoft/hve-core` | 11 | 49 | — | 102 instructions, 63 prompts | Research-Plan-Implement workflow |

### Cross-platform collections

| Store | Skills | Agents | Plugins | Platforms |
|---|---:|---:|---:|---|
| `affaan-m/everything-claude-code` | **183** | 48 | — | Claude, Codex, Cursor, OpenCode, Gemini |
| `wshobson/agents` | 150 | **184** | 78 | Claude (primary), portable; ships PluginEval framework |
| `VoltAgent/awesome-claude-code-subagents` | — | **131+** subagents (10 categories) | — | Claude Code; sister repos for skills/Codex/OpenClaw |
| `alirezarezvani/claude-skills` | **235** (9 domains) | — | — | 12 tools (Claude/Codex/Gemini/Cursor/Aider/Windsurf/...) |
| `mk-knight23/AGENTS-COLLECTION` | 748 | 784 | — | 11 platforms; 141 prompts |

### Curated lists (awesome-style)

| Store | Contents | Focus |
|---|---|---|
| `hesreallyhim/awesome-claude-code` | Skills, hooks, slash-commands, orchestrators, plugins | Quality-curated index |
| `forrestchang/andrej-karpathy-skills` | Single CLAUDE.md (Karpathy's LLM coding observations) | Avoiding common LLM coding pitfalls |

### Domain-specific

| Store | Domain | Headline contents |
|---|---|---|
| `samber/cc-skills-golang` | Golang | Idiomatic Go agentic skills |
| `new-silvermoon/awesome-android-agent-skills` | Android | Kotlin, Jetpack Compose patterns |
| `leonardomso/rust-skills` | Rust | 179 rules / patterns |
| `zhinkgit/embeddedskills` | Embedded | Debugging, low-level dev |
| `Donchitos/Claude-Code-Game-Studios` | Game dev | 49 agents + 72 workflow skills (Unity/Godot/Unreal) |
| `coreyhaines31/marketingskills` | Marketing | CRO, copywriting, SEO, analytics, growth |

### Copilot-specific

| Store | Owner | Focus |
|---|---|---|
| `canonical/copilot-collections` | Canonical (Ubuntu) | Platform engineering |
| `ikcode-dev/copilot-kit` | Community | Modern web dev; prompts + instructions + chat modes + MCP configs |
| `aios-labs/projectrules` | Community | Cross-IDE project rules (Copilot / Cursor / Windsurf) |

---

## Decay & Maintenance

External catalogs decay fast. Maintenance posture:

| Layer | Decay rate | What to verify |
|---|---|---|
| Store list (STORES.md entries) | Slow — repos rarely vanish | License, archived status, last commit date |
| Per-store counts (this file) | Medium — counts shift monthly | Spot-check headline numbers quarterly |
| MCP category contents (punkpeye) | Fast — daily additions | Treat as "browse the registry", never copy |

**Update rule**: When a STORES.md entry changes, update the matching row here. When this file disagrees with a store's own README, the store wins — fix this file.

---

## What This File Is Not

- **Not a skill catalog** — for that, see each store's own catalog (linked from STORES.md)
- **Not a quality endorsement** — store-evaluation runs per [.github/skills/store-evaluation/SKILL.md](.github/skills/store-evaluation/SKILL.md)
- **Not exhaustive** — abbreviated headline contents only
- **Not a duplicate of CATALOG.md** — CATALOG.md is *Alex_Skill_Mall's own* skills; this file is *external* offerings only
