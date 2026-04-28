# Skill Catalog

**96 skills** organized by category. Each skill saves 30+ minutes of debugging.

**Format**: `skill-name` | path | tags | trigger → pattern

---

## Security (6)

**allowlist-over-blocklist** | `skills/security/allowlist-over-blocklist/` | security, validation, input
- Trigger: Validating user input, URLs, file extensions, commands
- Pattern: Enumerate permitted values → reject everything else

**shell-injection-prevention** | `skills/security/shell-injection-prevention/` | security, nodejs, shell
- Trigger: Executing shell commands, spawning processes
- Pattern: `execFileSync(exe, argsArray)` instead of `execSync(string)`

**markdown-sanitization-chain** | `skills/security/markdown-sanitization-chain/` | security, markdown, xss, mermaid
- Trigger: Rendering user-provided markdown, using Mermaid diagrams
- Pattern: marked.js → DOMPurify → Mermaid (order matters)

**error-message-sanitization** | `skills/security/error-message-sanitization/` | security, errors, logging
- Trigger: Returning errors to users, logging errors externally
- Pattern: Strip paths, redact credentials, log full internally only

**path-traversal-prevention** | `skills/security/path-traversal-prevention/` | security, filesystem, path
- Trigger: Writing files based on user input, copying directories
- Pattern: Validate `path.resolve()` stays within destination root

**api-security-hardening** | `skills/security/api-security-hardening/` | security, api, authentication
- Trigger: Building HTTP API, security review checklist
- Pattern: 4-layer defense (rate limiting, JWT validation, CORS, input validation)

---

## Documentation (6)

**mermaid-mode-fragility** | `skills/documentation/mermaid-mode-fragility/` | mermaid, diagrams, markdown
- Trigger: Mermaid diagram not rendering, using timeline/gitGraph/gantt
- Pattern: Default to `flowchart` for complex content (other modes break on colons)

**docs-decay-velocity** | `skills/documentation/docs-decay-velocity/` | documentation, maintenance, drift
- Trigger: Auditing documentation, finding stale content
- Pattern: Hardcoded numbers/versions/paths rot fastest → use runtime reads or date stamps

**multi-surface-count-drift** | `skills/documentation/multi-surface-count-drift/` | documentation, drift, counts
- Trigger: Updating a count that appears in multiple files
- Pattern: Grep for old number across ALL surfaces when updating

**version-stamp-automation** | `skills/documentation/version-stamp-automation/` | documentation, versioning, automation
- Trigger: Version numbers appearing in 5+ files
- Pattern: Single-source from package.json → bump script derives all locations

**dual-surface-docs-drift** | `skills/documentation/dual-surface-docs-drift/` | documentation, drift, deduplication
- Trigger: Two READMEs covering overlapping scope
- Pattern: Cross-reference from less-detailed to more-detailed, or consolidate

**machine-readable-content** | `skills/documentation/machine-readable-content/` | documentation, automation, parsing
- Trigger: Tables/configs consumed by regex or LLMs
- Pattern: No emoji/decoration in machine-consumed files

---

## Quality (8)

**universal-audit-pattern** | `skills/quality/universal-audit-pattern/` | quality, audit, process
- Trigger: Auditing docs, code, security, architecture
- Pattern: Inventory → Ground Truth → Severity-Classify → Fix All

**visual-artifact-qa** | `skills/quality/visual-artifact-qa/` | quality, visual, svg, qa
- Trigger: SVG/banner/UI output that passes static checks but looks wrong
- Pattern: Render → view → diff against intent → fix → re-render

**falsifiability-test-pattern** | `skills/quality/falsifiability-test-pattern/` | quality, testing, planning
- Trigger: Deferred or speculative work items in a plan
- Pattern: Add measurable rule "this lane worked/failed" with time window

**iterative-health-check** | `skills/quality/iterative-health-check/` | quality, health, iteration
- Trigger: Assessing project/system health
- Pattern: Score → fix highest-ROI issue → rescore → iterate

**date-threshold-arithmetic** | `skills/quality/date-threshold-arithmetic/` | quality, dates, javascript
- Trigger: Date comparison failing unexpectedly, "exactly N days ago" off by one
- Pattern: `Math.floor()` before threshold comparison (getTime() returns fractional days)

**test-rename-drift** | `skills/quality/test-rename-drift/` | quality, testing, refactoring
- Trigger: Renaming a function, test failures after rename
- Pattern: Grep for BOTH old and new names in test files

**parity-guard-test-pattern** | `skills/quality/parity-guard-test-pattern/` | quality, testing, contracts
- Trigger: "All callers of X must do Y" contract check has false positives
- Pattern: Separate DIRECT callers (must implement) from DELEGATORS (wrapper handles)

**capability-signature-detection** | `skills/quality/capability-signature-detection/` | quality, testing, regex
- Trigger: Code scanning regex missing real usage
- Pattern: Detect capability (import + call) not literal strings

---

## Architecture (5)

**defaults-plus-overrides** | `skills/architecture/defaults-plus-overrides/` | architecture, configuration
- Trigger: Designing user configuration system
- Pattern: Archetype defaults + partial overrides + clamped bounds

**default-fast-opt-slow** | `skills/architecture/default-fast-opt-slow/` | architecture, ai, ux
- Trigger: AI/LLM feature with response length options
- Pattern: Default to shortest response; users who want depth will select it

**weighted-scoring-matrix** | `skills/architecture/weighted-scoring-matrix/` | architecture, scoring, decision-making
- Trigger: Multi-factor scoring system design
- Pattern: Normalized weights (sum to 1.0) + optional boosts

**staged-transformation-pipeline** | `skills/architecture/staged-transformation-pipeline/` | architecture, pipeline
- Trigger: Complex data transformation, monolithic transform debugging
- Pattern: Discrete stages (profile → style → format → output), each independently testable

**opt-in-workspace-writes** | `skills/architecture/opt-in-workspace-writes/` | architecture, extension, ux
- Trigger: Extension/tool that writes to user workspaces
- Pattern: Explicit consent before first write; "remember choice" for subsequent

---

## Build Pipelines (5)

**fix-once-auto-inject** | `skills/build/fix-once-auto-inject/` | build, automation, idempotent
- Trigger: Recurring issue that needs perpetual enforcement
- Pattern: Idempotent fix script + build-time auto-inject fallback

**data-driven-layouts** | `skills/build/data-driven-layouts/` | build, templates, configuration
- Trigger: Adding sections to page layouts
- Pattern: Layout structure as data, rendering code as pure templates

**config-content-separation** | `skills/build/config-content-separation/` | build, configuration, content
- Trigger: Config files getting bloated with content
- Pattern: JSON config for structure, separate .md files for content

**config-transcription-verification** | `skills/build/config-transcription-verification/` | build, configuration, drift
- Trigger: Extracting hardcoded data to JSON config
- Pattern: Cross-check EVERY field against source (icons, descriptions drift silently)

**build-script-path-rot** | `skills/build/build-script-path-rot/` | build, paths, maintenance
- Trigger: Build script fails after directory restructure
- Pattern: Resolve paths relative to manifest files, not hardcoded strings

---

## Cross-Platform (5)

**terminal-backtick-hazard** | `skills/cross-platform/terminal-backtick-hazard/` | terminal, shell, powershell
- Trigger: Command with backticks failing, markdown in terminal args
- Pattern: Use temp files for content containing backticks (all shells break differently)

**cloud-storage-paths** | `skills/cross-platform/cloud-storage-paths/` | cross-platform, icloud, onedrive
- Trigger: Finding iCloud/OneDrive/Dropbox paths
- Pattern: Candidate-list approach (check all known path variants)

**line-ending-parsing** | `skills/cross-platform/line-ending-parsing/` | cross-platform, text-processing
- Trigger: String comparison fails on Windows, split lines have trailing garbage
- Pattern: Always use `/\r?\n/` regex for splitting text files

**vscode-cross-platform-paths** | `skills/cross-platform/vscode-cross-platform-paths/` | vscode, cross-platform
- Trigger: Finding VS Code user data directory
- Pattern: `os.platform()` switch (Windows/macOS/Linux have different paths)

**powershell-regex-backreference** | `skills/cross-platform/powershell-regex-backreference/` | powershell, regex, cross-platform
- Trigger: Regex replacement with backreference + digit gives wrong result
- Pattern: Use `${1}` syntax when backreference is followed by digit (`$10` = group 10)

---

## VitePress (3)

**vitepress-iframe-embed** | `skills/vitepress/vitepress-iframe-embed/` | vitepress, vue, iframe
- Trigger: Standalone HTML page within VitePress site
- Pattern: .md wrapper + Vue component + `?embed` detection in HTML

**vitepress-clean-urls** | `skills/vitepress/vitepress-clean-urls/` | vitepress, urls, configuration
- Trigger: 404 errors after enabling cleanUrls, links with .html extension
- Pattern: Remove .html from all nav/sidebar/markdown links

**vitepress-spa-routing** | `skills/vitepress/vitepress-spa-routing/` | vitepress, spa, navigation
- Trigger: Link to non-VitePress page on same domain not working
- Pattern: `target="_self"` or full URL to bypass SPA router

---

## GitHub (2)

**github-readme-override** | `skills/github/github-readme-override/` | github, documentation, readme
- Trigger: Wrong README showing on repo landing page
- Pattern: `.github/README.md` overrides root `README.md` — delete or rename

**github-wiki-flat** | `skills/github/github-wiki-flat/` | github, wiki, links
- Trigger: Broken links in GitHub Wiki, folder structure not working
- Pattern: Wiki is flat — `wiki/guide/setup.md` → `/wiki/guide-setup`

---

## Azure (4)

**azure-identity-msi** | `skills/azure/azure-identity-msi/` | azure, managed-identity, rbac
- Trigger: Verifying Managed Identity permissions, RBAC debugging
- Pattern: MSI = Service Principal; `principalId` matches SP in role assignments

**azure-subscription-context** | `skills/azure/azure-subscription-context/` | azure, cli, subscription
- Trigger: Azure CLI returning empty results, "not found" errors
- Pattern: Verify subscription with `az account show` first

**azure-cost-management-api** | `skills/azure/azure-cost-management-api/` | azure, cost-management, powershell
- Trigger: Cost Management API "Unsupported Media Type" error
- Pattern: Write JSON to file, reference with `@$path` (inline JSON breaks in PowerShell)

**msal-singleton-pattern** | `skills/azure/msal-singleton-pattern/` | azure, msal, authentication
- Trigger: MSAL.js silent auth failures, "interaction_in_progress" errors
- Pattern: Single `PublicClientApplication` instance with async `initialize()`

---

## Visual (2)

**image-embedding-size-limits** | `skills/visual/image-embedding-size-limits/` | images, ai, tokens
- Trigger: Base64 images consuming too many tokens
- Pattern: 256px max for embedded images (70% savings vs 512px)

**image-storage-embedding-split** | `skills/visual/image-storage-embedding-split/` | visual, images, storage
- Trigger: Image quality issues after embedding
- Pattern: Full resolution on disk, smaller version in dataUri, document with `embedSize`

---

## Windows / Node.js (2)

**node-winget-collision** | `skills/windows-node/node-winget-collision/` | windows, nodejs, winget
- Trigger: Node.js missing after winget uninstall
- Pattern: Multiple packages share directory — install new first, then uninstall old

**pat-expiration-silent** | `skills/windows-node/pat-expiration-silent/` | tokens, publishing, vsce
- Trigger: 401 error during npm/vsce publish, token exists but fails
- Pattern: Token existence ≠ validity; set calendar reminders before expiry

---

## Academic (2)

**academic-editorial-judgment** | `skills/academic/academic-editorial-judgment/` | academic, editing, style-guides
- Trigger: Editing academic manuscripts, applying APA7/MLA/Chicago
- Pattern: Critical thinking for context-dependent rules (tense, voice)

**survey-instrument-verification** | `skills/academic/survey-instrument-verification/` | academic, surveys, verification
- Trigger: Editing survey methods sections, verifying appendix claims
- Pattern: Compare manuscript claims against raw data (scale points, wording)

---

## Data (2)

**temp-file-python-analysis** | `skills/data/temp-file-python-analysis/` | data, python, shell
- Trigger: Inline Python in shell script failing, quote escaping issues
- Pattern: Write to `_tmp.py` → execute → delete

**tmdl-linter-false-positives** | `skills/data/tmdl-linter-false-positives/` | data, tmdl, power-bi
- Trigger: VS Code TMDL linter showing errors on valid syntax
- Pattern: `description` on measures is valid — linter is wrong, test in Power BI

---

## Testing (1)

**python-mock-patching-location** | `skills/testing/python-mock-patching-location/` | testing, python, mocking
- Trigger: Mock not working, real function still called
- Pattern: Patch where function is USED, not where it's DEFINED

---

## JavaScript (1)

**boolean-string-trap** | `skills/javascript/boolean-string-trap/` | javascript, typescript, debugging
- Trigger: Boolean check always true, localStorage/URL param issues
- Pattern: `"false"` is truthy; use `=== 'true'` or `JSON.parse()`

---

## GitHub Actions (1)

**github-actions-version-upgrades** | `skills/github-actions/github-actions-version-upgrades/` | github-actions, ci-cd, node
- Trigger: Deprecation warnings in workflows, setting up new repo
- Pattern: `actions/*@v5`, `node-version: '22'`

---

## Cloud Platforms (1)

**azure-swa-gotchas** | `skills/cloud/azure-swa-gotchas/` | azure, static-web-apps, deployment
- Trigger: Deploying to Azure Static Web Apps, auth/routing issues
- Pattern: 12 specific pitfalls (api_location override, auth route order, SWA CLI bugs)

---

## Patterns (1)

**champion-challenger-cache** | `patterns/champion-challenger-cache.md` | caching, llm, optimization
- Trigger: LLM pipeline with repeated calls, token cost optimization
- Pattern: Hash inputs → compare to cached champion → skip API if unchanged

---

## Scaffolds (1)

**vite-azure-swa** | `scaffolds/vite-azure-swa/` | vite, azure, static-web-apps
- Trigger: New Vite + Azure SWA project
- Pattern: Starter with common gotchas pre-solved

---

## Quick Reference by Trigger

| If you see... | Check skill |
|---------------|-------------|
| XSS, injection, user input validation | allowlist-over-blocklist, markdown-sanitization-chain |
| Shell command failing | shell-injection-prevention, terminal-backtick-hazard |
| Path traversal, `../` in paths | path-traversal-prevention |
| Mermaid not rendering | mermaid-mode-fragility |
| Stale docs, wrong counts | docs-decay-velocity, multi-surface-count-drift |
| Version mismatch across files | version-stamp-automation |
| Build script path error | build-script-path-rot |
| Date comparison off by one | date-threshold-arithmetic |
| Test failing after rename | test-rename-drift |
| Config extraction bugs | config-transcription-verification |
| Azure CLI "not found" | azure-subscription-context |
| 401 on publish | pat-expiration-silent |
| VitePress 404 | vitepress-clean-urls, vitepress-spa-routing |
| GitHub Wiki broken links | github-wiki-flat |
| Wrong README on GitHub | github-readme-override |

---

## Index by Tag

| Tag | Skills |
|-----|--------|
| academic | academic-editorial-judgment, survey-instrument-verification |
| architecture | defaults-plus-overrides, default-fast-opt-slow, weighted-scoring-matrix, staged-transformation-pipeline, opt-in-workspace-writes |
| azure | azure-swa-gotchas, azure-identity-msi, azure-subscription-context, azure-cost-management-api |
| build | fix-once-auto-inject, data-driven-layouts, config-content-separation, config-transcription-verification, build-script-path-rot |
| cross-platform | terminal-backtick-hazard, cloud-storage-paths, line-ending-parsing, vscode-cross-platform-paths |
| data | temp-file-python-analysis, tmdl-linter-false-positives |
| documentation | mermaid-mode-fragility, docs-decay-velocity, multi-surface-count-drift, version-stamp-automation, dual-surface-docs-drift, machine-readable-content |
| github | github-readme-override, github-wiki-flat |
| github-actions | github-actions-version-upgrades |
| quality | universal-audit-pattern, visual-artifact-qa, falsifiability-test-pattern, iterative-health-check, date-threshold-arithmetic, test-rename-drift, parity-guard-test-pattern, capability-signature-detection |
| security | allowlist-over-blocklist, shell-injection-prevention, markdown-sanitization-chain, error-message-sanitization, path-traversal-prevention |
| visual | image-embedding-size-limits, image-storage-embedding-split |
| vitepress | vitepress-iframe-embed, vitepress-clean-urls, vitepress-spa-routing |
| vscode | vscode-cross-platform-paths |
| windows | node-winget-collision, pat-expiration-silent |

---

## Promoted from Master Alex (40 skills, v0.4.x)

These are full procedural skills (150-1600 lines each) promoted from the Master Alex inheritable skill set.
Unlike the bite-sized gotcha skills above, these are deep procedures that encode hours of engineering judgment.
Drop-in compatible with any `.github/skills/` consumer (Copilot, Claude, Cursor).

### Critical Thinking (6)

**act-pass** | `skills/critical-thinking/act-pass/` | reasoning, decision-making, act
- Run the 7-step Artificial Critical Thinking pass — Materiality → Hypothesise → Alternatives → Discon

**critical-thinking** | `skills/critical-thinking/critical-thinking/` | reasoning, alternatives, bias
- Challenge what you think is right — alternative hypotheses, missing data, evidence quality, bias det

**hypothesis-driven-debugging** | `skills/critical-thinking/hypothesis-driven-debugging/` | debugging, scientific-method
- Investigate build failures, test errors, runtime crashes, or unexpected behavior through systematic 

**root-cause-analysis** | `skills/critical-thinking/root-cause-analysis/` | debugging, 5-whys, investigation
- Find the true source, not symptoms — systematic debugging from observation to permanent fix

**rubber-duck-debugging** | `skills/critical-thinking/rubber-duck-debugging/` | debugging, thinking-partner
- Be a thinking partner. The answer often emerges when explaining the problem.

**problem-framing-audit** | `skills/critical-thinking/problem-framing-audit/` | reasoning, frame-audit, type-iii-error
- Step-back protocol — restate, generalise, specialise, invert, ask why, pre-mortem, check stakeholder

### AI / LLM Development (8)

**mcp-development** | `skills/ai-llm/mcp-development/` | mcp, server, primitives, transport
- **Domain**: AI Infrastructure

**mcp-builder** | `skills/ai-llm/mcp-builder/` | mcp, tools, registration
- Build MCP servers for LLM tool integration — Python (FastMCP), Node/TypeScript (MCP SDK), or C#/.NET

**multi-agent-orchestration** | `skills/ai-llm/multi-agent-orchestration/` | agents, delegation, synthesis
- Coordinate multiple AI agents for complex tasks — decomposition, delegation, and synthesis

**prompt-engineering** | `skills/ai-llm/prompt-engineering/` | prompts, patterns, eval
- Craft effective prompts that get the best results from language models.

**prompt-builder** | `skills/ai-llm/prompt-builder/` | prompt-md, frontmatter, authoring
- Create and validate .prompt.md files that pass brain-qa on first attempt

**rag-architecture** | `skills/ai-llm/rag-architecture/` | rag, retrieval, vector-store
- Build retrieval-augmented generation systems that ground LLMs in your data.

**ai-agent-design** | `skills/ai-llm/ai-agent-design/` | agents, reasoning, tools
- Design autonomous AI agents that reason, plan, and execute tasks

**llm-model-selection** | `skills/ai-llm/llm-model-selection/` | models, selection, cost-quality
- Choosing the right model for the task — power vs. cost vs. speed.

### Communication (4)

**executive-storytelling** | `skills/communication/executive-storytelling/` | pyramid, narrative, leadership
- Data-driven narrative construction, stakeholder management, and influencing senior leadership decisi

**meeting-efficiency** | `skills/communication/meeting-efficiency/` | agenda, facilitation, async
- Agenda design, time boxing, decision capture, async alternatives, and productive facilitation

**stakeholder-management** | `skills/communication/stakeholder-management/` | influence, communication, alignment
- Influence mapping, communication strategies, and expectation management for complex organizations

**status-reporting** | `skills/communication/status-reporting/` | rag, dashboards, escalation
- Create stakeholder-friendly project status updates and progress reports

### Security (2)

**security-review** | `skills/security/security-review/` | owasp, stride, audit
- Defend before attackers find the gaps - OWASP, STRIDE, and Microsoft SFI

**security-threat-modeler** | `skills/security/security-threat-modeler/` | stride, threat-modeling, dfd
- Analyze codebase architecture to generate a STRIDE-based threat model with data flow diagrams, trust

### Quality (5)

**code-review** | `skills/quality/code-review/` | review, pr, feedback
- Systematic code review for correctness, security, and growth — not just style enforcement

**testing-strategies** | `skills/quality/testing-strategies/` | testing, coverage, risk
- Systematic testing for confidence without over-testing — the right test at the right level

**test-quality-analysis** | `skills/quality/test-quality-analysis/` | testing, smells, assertions
- Analyze test code quality to detect coverage-only tests, test smells, and low-value assertions. Use 

**tech-debt-discovery** | `skills/quality/tech-debt-discovery/` | debt, inventory, prioritization
- Systematic technical debt inventory and prioritization. Use when asked to find tech debt, show me th

**refactoring-patterns** | `skills/quality/refactoring-patterns/` | refactoring, extract, rename
- Safe transformations — same behavior, better structure.

### Performance (1)

**performance-profiling** | `skills/performance/performance-profiling/` | cpu, memory, network, bottleneck
- CPU, memory, network bottleneck analysis — systematic performance investigation

### Operations (2)

**postmortem** | `skills/operations/postmortem/` | incident, root-cause, timeline
- Write a postmortem for a regression or incident that escaped to production, broke real users, and tr

**observability-monitoring** | `skills/operations/observability-monitoring/` | logs, metrics, traces, alerts
- Production visibility through logs, metrics, traces, and alerting — the three pillars of observabili

### Data (2)

**kql** | `skills/data/kql/` | kusto, log-analytics, queries
- KQL language expertise for writing correct, efficient Kusto Query Language queries. Covers syntax go

**database-design** | `skills/data/database-design/` | schema, normalization, indexing
- Schema design, normalization, query optimization, and data modeling patterns

### Infrastructure (2)

**infrastructure-as-code** | `skills/infrastructure/infrastructure-as-code/` | iac, bicep, terraform, arm
- **Domain**: DevOps & Cloud Engineering

**bicep-avm-mastery** | `skills/infrastructure/bicep-avm-mastery/` | bicep, avm, azure-modules
- Azure Verified Modules (AVM), Bicep best practices, and MCP-powered infrastructure as code for Azure

### Azure (5)

**microsoft-graph-api** | `skills/azure/microsoft-graph-api/` | graph, m365, rest
- Comprehensive Microsoft Graph API reference for M365 service integration

**microsoft-fabric** | `skills/azure/microsoft-fabric/` | fabric, lakehouse, medallion
- Microsoft Fabric workspace management, governance, REST API patterns, and medallion architecture imp

**azure-deployment-operations** | `skills/azure/azure-deployment-operations/` | deploy, production, operations
- Production deployment patterns for Azure Static Web Apps, Container Apps, App Service, and infrastru

**azure-openai-patterns** | `skills/azure/azure-openai-patterns/` | openai, rate-limit, content-safety
- Azure OpenAI API patterns for rate limiting, function calling, error handling, and token optimizatio

**entra-agent-id** | `skills/azure/entra-agent-id/` | entra, agent-id, app-registration
- Microsoft Entra Agent ID (preview) — create OAuth2-capable AI agent identities via Microsoft Graph b

### Architecture (2)

**architecture-audit** | `skills/architecture/architecture-audit/` | consistency, audit, project-wide
- Comprehensive **project** consistency review across code, documentation, diagrams, and configuration

**api-design** | `skills/architecture/api-design/` | rest, graphql, versioning
- Design APIs that developers love to use.

### Design (1)

**ui-ux-design** | `skills/design/ui-ux-design/` | design-system, accessibility, components
- User interface design, user experience optimization, accessibility compliance, design systems

