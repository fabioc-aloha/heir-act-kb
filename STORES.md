# Skill Store Directory

LLM-friendly catalog of skill stores for GitHub Copilot and Claude Code. Use this to research external skills when Alex_Skill_Mall doesn't cover your need.

> For an **abbreviated summary of what each store offers** (skill counts, MCP categories, headline contents), see [EXTERNAL-CATALOG.md](EXTERNAL-CATALOG.md). For Alex_Skill_Mall's own skills, see [CATALOG.md](CATALOG.md).

---

## Quick Reference

| If you need... | Check store |
|----------------|-------------|
| Official Claude Code plugins | anthropics/claude-plugins-official |
| Official Copilot plugins | github/copilot-plugins |
| Official MCP reference servers | modelcontextprotocol/servers |
| Canonical MCP server directory | punkpeye/awesome-mcp-servers |
| Azure SDK skills (Python, .NET, TS, Java, Rust) | microsoft/skills |
| Microsoft RPI workflow | microsoft/hve-core |
| Largest quality-focused collection | wshobson/agents |
| Largest cross-platform collection | affaan-m/everything-claude-code |
| Multi-tool conversion scripts | alirezarezvani/claude-skills |
| Claude Code subagents directory | VoltAgent/awesome-claude-code-subagents |
| Golang skills | samber/cc-skills-golang |
| Android/Kotlin skills | new-silvermoon/awesome-android-agent-skills |
| Rust skills | leonardomso/rust-skills |
| Game dev agents | Donchitos/Claude-Code-Game-Studios |
| Marketing skills | coreyhaines31/marketingskills |

---

## First-Party (Official)

**anthropics/claude-plugins-official** | `github.com/anthropics/claude-plugins-official` | 18K stars
- Type: Official Claude Code plugin directory
- Install: `/plugin install {name}@claude-plugins-official`
- Contains: plugins/, external_plugins/, skills, agents, commands
- Curated: Anthropic-reviewed quality and security

**github/copilot-plugins** | `github.com/github/copilot-plugins` | 223 stars
- Type: Official GitHub Copilot collection
- Status: Early stage (skills only, MCP servers coming soon)
- Contains: Skills, hooks (planned), MCP servers (planned)

**microsoft/skills** | `github.com/microsoft/skills` | 2.2K stars
- Type: Official Microsoft Azure SDK skills
- Install: `npx skills add microsoft/skills`
- Explorer: https://microsoft.github.io/skills/
- Contains: 132 skills, 5 agents, MCP configs, test harness (1158 scenarios)
- Languages: Python (41), .NET (29), TypeScript (25), Java (26), Rust (7)
- Focus: Azure SDKs, Microsoft AI Foundry, Context-Driven Development
- Plugins: deep-wiki, azure-skills
- License: MIT

**microsoft/hve-core** | `github.com/microsoft/hve-core` | 1K stars
- Type: Microsoft Hypervelocity Engineering
- Install: VS Code extension from Marketplace
- Contains: 49 agents, 102 instructions, 63 prompts, 11 skills
- Focus: Research-Plan-Implement (RPI) workflow
- License: MIT (some OWASP content CC BY-SA 4.0)

---

## MCP Server Registries

MCP (Model Context Protocol) servers extend AI assistants with tools, data sources, and external integrations. These registries are how heirs discover servers worth wiring into `.mcp.json`. Evaluate individual servers before adopting — the directory listing implies discoverability, not endorsement.

**modelcontextprotocol/servers** | `github.com/modelcontextprotocol/servers`
- Type: Official Anthropic reference servers
- Contains: filesystem, fetch, git, memory, sequential-thinking, time, sqlite, and other first-party servers
- License: MIT
- Notable: The correct starting point for any heir adopting MCP — these servers set the conventions everything else follows
- Use when: Wiring up local file access, git operations, web fetch, or persistent memory

**punkpeye/awesome-mcp-servers** | `github.com/punkpeye/awesome-mcp-servers` | 85K stars
- Type: Canonical community awesome-list (1,600+ contributors)
- Web directory: https://glama.ai/mcp/servers (searchable UI backing the list)
- Contains: ~30 categories — Aggregators, Art & Culture, Browser Automation, Cloud Platforms, Code Execution, Databases, Developer Tools, File Systems, Finance, Knowledge & Memory, Location Services, Monitoring, Search & Data Extraction, Security, Workplace, etc.
- License: MIT (list itself; individual servers vary)
- Notable: The de-facto registry — if a server isn't here, it's likely too new or too niche
- Caveat: Volume is high and quality varies — score individual servers before adoption (active maintenance, license, security review)

---

## Cross-Platform Collections

**affaan-m/everything-claude-code** | `github.com/affaan-m/everything-claude-code` | 168K stars
- Platforms: Claude Code, Codex, Cursor, OpenCode, Gemini
- Contains: 48 agents, 183 skills, 79 commands
- Features: Continuous learning, AgentShield security, hooks
- Install: `/plugin install everything-claude-code@everything-claude-code`
- Notable: Anthropic hackathon winner, largest community collection

**wshobson/agents** | `github.com/wshobson/agents` | 34.5K stars
- Platforms: Claude Code (primary), portable to other agentskills.io consumers
- Contains: 184 agents, 150 skills, 78 plugins
- Features: Built-in **PluginEval** quality framework — the project measures its own outputs
- License: MIT
- Notable: Largest *quality-focused* cross-platform collection. Active maintenance (commits within days). Caveat: format conventions may differ from agentskills.io spec — verify before bulk adoption

**VoltAgent/awesome-claude-code-subagents** | `github.com/VoltAgent/awesome-claude-code-subagents` | 18.6K stars
- Platforms: Claude Code (subagents — not the same artifact as skills)
- Contains: 131+ subagents across 10 categories
- Sister repos: `awesome-agent-skills`, `awesome-codex-subagents`, `awesome-openclaw-skills` (cross-platform parity)
- License: MIT
- Notable: Subagent-focused — useful when an ACT heir delegates a bounded sub-task. Subagents ≠ skills; do not conflate scopes

**alirezarezvani/claude-skills** | `github.com/alirezarezvani/claude-skills` | 12K stars
- Platforms: 12 tools (Claude, Codex, Gemini CLI, Cursor, Aider, Windsurf, Kilo Code, OpenCode, Augment, Antigravity, Hermes, OpenClaw)
- Contains: 235 skills across 9 domains, 305 Python CLI tools
- Convert: `./scripts/convert.sh --tool all`
- Install: `/plugin marketplace add alirezarezvani/claude-skills`

**mk-knight23/AGENTS-COLLECTION** | `github.com/mk-knight23/AGENTS-COLLECTION` | 57 stars
- Platforms: 11 AI platforms
- Contains: 784 agent definitions, 748 skills, 141 prompts
- Focus: Cross-platform agent portability

---

## Curated Lists (Awesome Lists)

**hesreallyhim/awesome-claude-code** | `github.com/hesreallyhim/awesome-claude-code` | 41K stars
- Type: Curated awesome-list
- Contains: Skills, hooks, slash-commands, orchestrators, plugins
- Focus: Quality curation, beginner to veteran

**forrestchang/andrej-karpathy-skills** | `github.com/forrestchang/andrej-karpathy-skills` | 93K stars
- Type: Single CLAUDE.md file
- Source: Derived from Andrej Karpathy's LLM coding observations
- Focus: Avoiding common LLM coding pitfalls

---

## Domain-Specific

**samber/cc-skills-golang** | `github.com/samber/cc-skills-golang` | 1.4K stars
- Focus: Golang agentic skills
- Platform: Claude Code, Codex

**new-silvermoon/awesome-android-agent-skills** | `github.com/new-silvermoon/awesome-android-agent-skills` | 762 stars
- Focus: Android development (Kotlin, Jetpack Compose)
- Platforms: Copilot, Claude, Gemini, Cursor

**leonardomso/rust-skills** | `github.com/leonardomso/rust-skills` | 154 stars
- Focus: Rust (179 rules)
- Platforms: Claude Code, OpenCode

**zhinkgit/embeddedskills** | `github.com/zhinkgit/embeddedskills` | 129 stars
- Focus: Embedded development, debugging
- Platforms: Claude Code, Copilot, TRAE

**Donchitos/Claude-Code-Game-Studios** | `github.com/Donchitos/Claude-Code-Game-Studios` | 16K stars
- Focus: Game development (Unity, Godot, Unreal)
- Contains: 49 AI agents, 72 workflow skills

**coreyhaines31/marketingskills** | `github.com/coreyhaines31/marketingskills` | 25K stars
- Focus: Marketing (CRO, copywriting, SEO, analytics, growth)
- Platforms: Claude Code, Codex

---

## Copilot-Specific

**canonical/copilot-collections** | `github.com/canonical/copilot-collections` | 21 stars
- Source: Canonical (Ubuntu)
- Focus: Platform engineering

**ikcode-dev/copilot-kit** | `github.com/ikcode-dev/copilot-kit` | 29 stars
- Contains: Prompts, instructions, chat modes, MCP configs
- Focus: Modern web development

**aios-labs/projectrules** | `github.com/aios-labs/projectrules` | 14 stars
- Platforms: Copilot, Cursor, Windsurf
- Focus: Cross-IDE project rules

---

## How to Evaluate a Store

Before adopting skills from external stores:

1. **Check stars and activity** — High stars + recent commits = maintained
2. **Review license** — MIT is safest; watch for CC-BY-SA (attribution required)
3. **Test before trust** — Run skills in sandbox project first
4. **Check security** — Stores like everything-claude-code include AgentShield
5. **Verify format** — SKILL.md with YAML frontmatter is the converging standard

## Alex_Skill_Mall Differentiation

This store focuses on:

- **Battle-tested patterns** from production experience (not theoretical)
- **Critical thinking** and ACT framework integration
- **LLM-friendly format** with Trigger/Pattern structure
- **Quality over quantity** — 51 focused skills vs 200+ general ones
- **No dependencies** — pure markdown, copy and use

When Alex_Skill_Mall doesn't have what you need, check the stores above.
