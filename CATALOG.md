# Skill Catalog

**289 skills** organized by category. Each skill saves 30+ minutes of debugging.

**Format**: `skill-name` | path | tags | trigger → pattern

---

## Security (7)

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

**threat-surface-analysis** | `skills/security/threat-surface-analysis/` | security, threat-modeling, architecture

- Trigger: Security review, threat modeling prep, discovering attack surface of unfamiliar codebase
- Pattern: Ecosystem detection → project classification → dependency graph → config & auth → trust boundaries

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

## Quality (9)

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

**repository-readiness-eval** | `skills/quality/repository-readiness-eval/` | quality, onboarding, ci-cd

- Trigger: Onboarding to new repo, assessing AI-agent readiness, CI health check
- Pattern: 4-axis eval (code understanding → dependency restore → build → test) with 0–20 scoring

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

## Media (2)

**marp-presentation** | `skills/media/marp-presentation/` | marp, slides, presentation, pdf

- Trigger: Create slides, export Marp deck to PDF/PPTX, review presentation quality, theme customization
- Pattern: 4 capabilities (create → build → review → theme) for end-to-end Marp workflow

**alex-banner-generation** | `skills/media/alex-banner-generation/` | svg, banner, branding

- Trigger: Generate branded SVG banner for README, PLAN, CHANGELOG, or other docs
- Pattern: Watermark selection + subtitle craft → muscle generates 1200×300 SVG

---

## AI / LLM (1)

**agentic-eval** | `skills/ai-llm/agentic-eval/` | evaluation, llm-as-judge, self-critique

- Trigger: Building self-improvement loops, evaluator-optimizer pipelines, rubric-based scoring
- Pattern: Generate → Evaluate → Critique → Refine loop with convergence detection

---

## Quick Reference by Trigger

| If you see... | Check skill |
| --- | --- |
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
| --- | --- |
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

## Procedural Skills (40+)

Full procedural skills (150-1600 lines each) encoding hours of engineering judgment. Originally promoted from Alex cognitive architecture; now maintained as standalone Mall artifacts compatible with ACT Edition v0.9.0+ and any `.github/skills/` consumer (Copilot, Claude, Cursor).
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

### Data — Procedural (2)

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

---

## Procedural Skills — Wave 2 (62 skills)

Critical thinking, privacy/compliance, frontend/VS Code engineering,
data viz, process and risk, media generation, academic writing, and personal effectiveness.

### Critical Thinking (+7)

**appropriate-reliance** | `skills/critical-thinking/appropriate-reliance/` | calibration, human-ai, confidence

- Calibrated human-AI collaboration with creative latitude — trust calibrated to reliability, creativi

**awareness** | `skills/critical-thinking/awareness/` | metacognition, blindspot, self-correction

- Proactive detection, self-correction, and epistemic vigilance

**anti-hallucination** | `skills/critical-thinking/anti-hallucination/` | confabulation, llm, verification

- Recognize and prevent confabulation — when you dont know, say so.

**socratic-questioning** | `skills/critical-thinking/socratic-questioning/` | questioning, discovery, teaching

- Help users discover answers, dont just deliver them.

**dialog-engineering** | `skills/critical-thinking/dialog-engineering/` | csar, conversation, structure

- CSAR Loop and structured conversation patterns for effective AI dialog -- Clarify, Summarize, Act, R

**calibration-tracking** | `skills/critical-thinking/calibration-tracking/` | confidence, tracking, reconciliation

- Record confidence claims and reconcile against outcomes — closing Tenet V (calibration over confiden

**knowledge-synthesis** | `skills/critical-thinking/knowledge-synthesis/` | patterns, abstraction, cross-project

- Cross-project pattern recognition — abstract, generalize, connect, store at the highest true level

### AI / LLM Development (+5)

**copilot-sdk** | `skills/ai-llm/copilot-sdk/` | copilot-sdk, github, language-model

- Build applications powered by GitHub Copilot using the Copilot SDK — session management, custom tool

**sse-streaming** | `skills/ai-llm/sse-streaming/` | sse, streaming, post

- POST-based Server-Sent Events streaming for Azure Functions — HTTP streaming, chunked response parsi

**chat-participant-patterns** | `skills/ai-llm/chat-participant-patterns/` | vscode, chat-api, participant

- VS Code Chat API patterns.

**content-safety-implementation** | `skills/ai-llm/content-safety-implementation/` | safety, azure, kill-switch, injection

- Azure Content Safety API integration, multi-layer defense pipeline, output validation, and operation

**foundry-agent-platform** | `skills/ai-llm/foundry-agent-platform/` | foundry, microsoft, agents

- Microsoft Foundry agent deployment, orchestration, and cloud-native AI service patterns

### Azure (+5)

**azure-devops-automation** | `skills/azure/azure-devops-automation/` | azure-devops, ci-cd, pipelines

- CI/CD pipelines, infrastructure as code, and deployment automation for Azure workloads

**azure-architecture-patterns** | `skills/azure/azure-architecture-patterns/` | waf, well-architected, design

- Well-Architected Framework principles and Azure best practices

**cloud-solution-architect** | `skills/azure/cloud-solution-architect/` | design, review, well-architected

- Design well-architected Azure cloud systems — 10 design principles, 6 architecture styles, 44 design

**msal-authentication** | `skills/azure/msal-authentication/` | msal, oauth, tokens

- Microsoft Authentication Library (MSAL) patterns for React/SPA applications with Entra ID

**enterprise-integration** | `skills/azure/enterprise-integration/` | graph, m365, power-platform

- Patterns for Microsoft Graph, Microsoft Entra ID, and enterprise feature integration in VS Code exte

### Security (+1)

**secrets-management** | `skills/security/secrets-management/` | secrets, secretstorage, key-vault, env

- Secure token storage, VS Code SecretStorage API, credential management, environment variable migrati

### Privacy & Compliance (+2)

**privacy-responsible-ai** | `skills/privacy/privacy-responsible-ai/` | privacy-by-design, responsible-ai, ethics

- Privacy by design, data protection, and responsible AI principles.

**pii-privacy-regulations** | `skills/privacy/pii-privacy-regulations/` | gdpr, ccpa, hipaa, pii

- Handling personally identifiable information under European and Australian privacy regulations.

### Frontend (+3)

**react-vite-performance** | `skills/frontend/react-vite-performance/` | react, vite, performance

- React + Vite performance optimization — code splitting, lazy loading, bundle analysis, Web Vitals, a

**service-worker-offline-first** | `skills/frontend/service-worker-offline-first/` | pwa, service-worker, offline

- Progressive Web App offline-first patterns — Service Worker lifecycle, caching strategies, backgroun

**frontend-design-review** | `skills/frontend/frontend-design-review/` | design-review, distinctive, frontend

- Review and create distinctive frontend interfaces — design system compliance, three quality pillars

### VS Code (+2)

**vscode-extension-patterns** | `skills/vscode/vscode-extension-patterns/` | extension, patterns, authoring

- Reusable patterns for VS Code extension development.

**vscode-configuration-validation** | `skills/vscode/vscode-configuration-validation/` | manifest, validation, settings

- Validate VS Code extension manifest against runtime code usage

### Documentation (+6)

**markdown-mermaid** | `skills/documentation/markdown-mermaid/` | mermaid, diagrams, markdown, comprehensive

- Clear documentation through visual excellence

**documentation-quality-assurance** | `skills/documentation/documentation-quality-assurance/` | audit, drift, quality

- Systematic documentation audit, drift detection, preflight validation, and multi-pass quality pipeli

**ai-writing-avoidance** | `skills/documentation/ai-writing-avoidance/` | ai-detection, voice, human-writing

- Help writers produce content that sounds genuinely human by avoiding telltale AI-generated text patt

**api-documentation** | `skills/documentation/api-documentation/` | api-docs, reference, onboarding

- Technical documentation, API references, user guides, and docs-as-code workflows.

**md-scaffold** | `skills/documentation/md-scaffold/` | markdown, scaffold, templates

- Scaffold properly structured Markdown files from templates for clean first-pass conversion

**localization** | `skills/documentation/localization/` | i18n, l10n, translation

- **Domain**: Software localization, internationalization, multilingual application development

### Data (+6)

**data-visualization** | `skills/data/data-visualization/` | charts, color, story-intent

- Story-intent chart selection, color theory, annotation patterns, decluttering rules, and the title =

**data-analysis** | `skills/data/data-analysis/` | eda, profiling, exploration

- Exploratory data analysis patterns -- profiling, distributions, correlations, segmentation, anomaly

**data-storytelling** | `skills/data/data-storytelling/` | narrative, story, end-to-end

- End-to-end data narrative construction -- three-act structure, Knaflic/Duarte methodology, audience-

**dashboard-design** | `skills/data/dashboard-design/` | dashboard, kpi, layout

- Dashboard layout patterns, KPI card design, filter architecture, narrative flow through panels, and

**chart-interpretation** | `skills/data/chart-interpretation/` | reading-charts, image, screenshot

- Read any chart (image, HTML, screenshot) and extract insights, patterns, anomalies, bias, and narrat

**data-quality-monitoring** | `skills/data/data-quality-monitoring/` | pipeline, anomaly, dq

- Data pipeline quality assurance — anomaly detection, schema drift, null ratio monitoring, freshness

### Process & Risk (+7)

**project-risk-analysis** | `skills/process/project-risk-analysis/` | risk, mitigation, planning

- Systematic methodology for identifying, categorizing, and mitigating software project risks before i

**business-analysis** | `skills/process/business-analysis/` | requirements, brd, stakeholder

- Patterns for requirements elicitation, BRDs, process analysis, and stakeholder alignment.

**scope-management** | `skills/process/scope-management/` | scope-creep, mvp, backlog

- Recognize scope creep, suggest MVP cuts, and manage project boundaries

**change-management** | `skills/process/change-management/` | adkar, organizational, change

- Patterns for organizational change, ADKAR methodology, stakeholder engagement, and adoption strategi

**project-deployment** | `skills/process/project-deployment/` | deployment, release, universal

- Universal deployment patterns for any project type.

**git-workflow** | `skills/process/git-workflow/` | git, recovery, practices

- Consistent git practices, recovery patterns, and safe operations.

**error-recovery-patterns** | `skills/process/error-recovery-patterns/` | error-handling, recovery, resilience

- What to do when things break.

### Quality (+1)

**extension-audit-methodology** | `skills/quality/extension-audit-methodology/` | audit, 5-dimension, framework

- Systematic 5-dimension audit framework for VS Code extensions — debug hygiene, dead code, performanc

### Media & Presentation (+9)

**gamma-presentation** | `skills/media/gamma-presentation/` | gamma, slides, presentation

- Author markdown files optimized for Gamma import — card structure, layout hints, image directives, s

**slide-design** | `skills/media/slide-design/` | slides, visual-hierarchy, dataviz

- Visual hierarchy, data visualization, and minimal text patterns for impactful presentations

**graphic-design** | `skills/media/graphic-design/` | visual, svg, design

- Patterns for visual design, SVG creation, layout composition, typography, and brand identity.

**image-handling** | `skills/media/image-handling/` | images, format, size, quality

- Right format, right size, right quality — plus AI image generation via Replicate

**video-generation** | `skills/media/video-generation/` | video, replicate, ai-generation

- AI video generation via Replicate — 17 models, editing, and production workflows

**text-to-speech** | `skills/media/text-to-speech/` | tts, replicate, voice-cloning

- Cloud TTS via Replicate — 15 models, voice cloning, emotion control, and multi-language support

**music-generation** | `skills/media/music-generation/` | music, replicate, soundtrack

- AI music generation via Replicate — 5 models for background tracks, lyrics, and sound design

**svg-graphics** | `skills/media/svg-graphics/` | svg, accessible, theme-aware

- Scalable, accessible, theme-aware visuals

**document-banner-pastel** | `skills/media/document-banner-pastel/` | svg, banner, pastel, documentation

- Hand-authored pastel SVG banners (1200×240) with content-specific iconography — A/B/C/D/E variants and three accent tracks; complement to algorithmic banner muscles

**svg-dashboard-composition** | `skills/media/svg-dashboard-composition/` | svg, dashboard, treemap, panel, composition

- One self-contained SVG from many fragments — shared 820px canvas, one panel primitive, treemap + bar charts + KPI strip + footer; banner regex-injection trick. Promoted from AlexFleetPortfolio.

**pptx-generation** | `skills/media/pptx-generation/` | pptx, powerpoint, programmatic

- Programmatic PowerPoint creation via PptxGenJS with data-driven slides and Markdown conversion

### Academic (+5)

**academic-paper-drafting** | `skills/academic/academic-paper-drafting/` | paper, manuscript, drafting

- End-to-end academic paper drafting for CHI, HBR, journals, and conferences with venue-specific templ

**research-first-development** | `skills/academic/research-first-development/` | research, knowledge-base, workflow

- Build knowledge bases that build software — research before code, teach before execute

**literature-review** | `skills/academic/literature-review/` | literature, synthesis, search

- Systematic literature search, synthesis, gap identification, and narrative construction for academic

**academic-research** | `skills/academic/academic-research/` | thesis, dissertation, scaffolding

- Research project scaffolding, thesis/dissertation writing, literature reviews, publication workflows

**citation-management** | `skills/academic/citation-management/` | apa, citation, references

- APA 7th formatting, citation integration, reference validation, and bibliography generation

### Productivity (+3)

**deep-work-optimization** | `skills/productivity/deep-work-optimization/` | focus, deep-work, distraction

- Focus blocks, distraction management, and flow state triggers for cognitively demanding work

**presentation-tool-selection** | `skills/productivity/presentation-tool-selection/` | tools, decision-matrix, presentations

- Best practice decision matrix for choosing between Marp, Gamma, and PptxGenJS based on use case requ

**creative-writing** | `skills/productivity/creative-writing/` | fiction, narrative, structure

- Patterns for fiction, narrative structure, character development, dialogue, and storytelling craft.

---

## Procedural Skills — Wave 3 (26 skills)

Converters, domain-specific knowledge, soft skills, publishing workflows, and brand management.

### Converters (+5)

**md-to-word** | `skills/converters/md-to-word/` | markdown, docx, pandoc

- Convert Markdown with Mermaid diagrams and SVG illustrations to professional Word documents

**docx-to-md** | `skills/converters/docx-to-md/` | docx, markdown, conversion

- Convert Word documents (.docx) to clean Markdown with image extraction and pandoc cleanup

**md-to-html** | `skills/converters/md-to-html/` | markdown, html, standalone

- Convert Markdown to standalone HTML pages with embedded CSS, images, and Mermaid diagrams

**md-to-eml** | `skills/converters/md-to-eml/` | markdown, email, rfc5322

- Convert Markdown to RFC 5322 email (.eml) with inline CSS and CID images

**converter-qa** | `skills/converters/converter-qa/` | testing, conversion, validation

- Test harness for validating converter outputs with 284 assertions across all converter muscles

### Azure / Microsoft (+1)

**teams-app-patterns** | `skills/azure/teams-app-patterns/` | teams, m365, adaptive-cards

- Full Teams app development patterns.

### Domain Knowledge (+12)

**healthcare-informatics** | `skills/domain/healthcare-informatics/` | clinical, hipaa, healthcare

- Clinical terminology, healthcare compliance (HIPAA/HITECH), patient safety, and health data manageme

**financial-analysis** | `skills/domain/financial-analysis/` | finance, modeling, analysis

- Financial modeling, analysis frameworks, and regulatory awareness for business-minded professionals.

**legal-compliance** | `skills/domain/legal-compliance/` | legal, contracts, compliance

- Legal research, contract analysis, regulatory compliance, and case law citation for legal profession

**grant-writing** | `skills/domain/grant-writing/` | grants, research, funding

- Translate research vision into funded reality.

**journalism** | `skills/domain/journalism/` | journalism, news, investigative

- News writing, investigative reporting, source verification, editorial standards, and fact-checking f

**sales-enablement** | `skills/domain/sales-enablement/` | sales, pipeline, enablement

- Sales methodology, pipeline management, negotiation frameworks, and customer engagement patterns.

**hr-people-operations** | `skills/domain/hr-people-operations/` | hr, talent, lifecycle

- Talent acquisition, employee lifecycle, compensation, labor regulations, and organizational developm

**career-development** | `skills/domain/career-development/` | career, resume, interview

- Resume crafting, interview preparation, job search strategy, and professional growth planning.

**game-design** | `skills/domain/game-design/` | game-design, mechanics, level-design

- Game mechanics, level design, player psychology, systems balancing, and narrative design for game de

**comedy-writing** | `skills/domain/comedy-writing/` | comedy, jokes, timing

- Joke structure, comedic timing, set construction, callback patterns, and audience engagement for com

**cross-cultural-collaboration** | `skills/domain/cross-cultural-collaboration/` | multicultural, collaboration, communication

- **Domain**: Multicultural team communication, cultural intelligence, global collaboration

**localization** | `skills/domain/localization/` | i18n, l10n, translation, multilingual

- Software localization and internationalization — i18n architecture, RTL support, ICU MessageFormat, LQA, dialect inheritance

### People & Learning (+4)

**coaching-techniques** | `skills/people/coaching-techniques/` | coaching, grow, listening

- GROW model, active listening, developmental feedback, and team growth approaches

**counseling-psychology** | `skills/people/counseling-psychology/` | counseling, therapy, ethics

- Therapeutic frameworks, assessment, ethical practice, and client documentation for counselors and ps

**learning-psychology** | `skills/people/learning-psychology/` | learning, partnership, teaching

- Help humans learn through partnership, not instruction.

**cognitive-load** | `skills/people/cognitive-load/` | cognitive-load, chunking, scaffolding

- Dont overwhelm — chunk, scaffold, summarize first.

### Publishing (+4)

**book-publishing** | `skills/publishing/book-publishing/` | pdf, pandoc, latex

- Markdown-to-PDF pipeline via Pandoc and LuaLaTeX with emoji rendering, dual output, and print-ready

**kdp-publishing** | `skills/publishing/kdp-publishing/` | amazon, kdp, self-publishing

- Amazon KDP self-publishing specs — cover requirements, interior formatting, spine formulas, ink opti

**dissertation-defense** | `skills/publishing/dissertation-defense/` | dissertation, defense, doctoral

- Comprehensive preparation for doctoral dissertation defense including timeline management, presentat

**book-launch-content** | `skills/publishing/book-launch-content/` | book-launch, marketing, content

- Generate launch-companion content for books — blog posts, author notes, and dogfooding angles that d

### Design (+1)

**brand-asset-management** | `skills/design/brand-asset-management/` | brand, hierarchy, assets

- Brand hierarchy, visual identity, asset deployment, platform-specific branding guidelines

---

## Procedural Skills — Wave 4 (16 skills)

Dev-tooling, ops, reasoning, and quality-of-life utilities.

### Critical Thinking (+2)

**debugging-patterns** | `skills/critical-thinking/debugging-patterns/` | debugging, investigation, methodology

- Systematic debugging patterns — bisection, logging strategy, hypothesis discipline

**bootstrap-learning** | `skills/critical-thinking/bootstrap-learning/` | learning, ramp-up, new-domain

- Rapid context acquisition for new domains — phased learning protocol from zero to partnership

### AI / LLM Development (+1)

**token-waste-elimination** | `skills/ai-llm/token-waste-elimination/` | tokens, efficiency, output

- Eliminate token waste in LLM I/O — output sizing, image embedding, terminal capture, redirect-to-file

### Architecture (+2)

**architecture-refinement** | `skills/architecture/architecture-refinement/` | architecture, refactor, evolution

- Iterative architecture refinement — when to refactor, when to rewrite, when to leave it alone

**early-filter-optimization** | `skills/architecture/early-filter-optimization/` | performance, filter, pipeline

- Push filters early in pipelines — work avoidance over work optimization

### Communication (+1)

**disagreement-protocol** | `skills/communication/disagreement-protocol/` | disagreement, conflict, dialog

- Productive disagreement protocol — name the gap, surface evidence, commit or escalate

### Documentation (+3)

**lint-clean-markdown** | `skills/documentation/lint-clean-markdown/` | markdown, lint, formatting

- Write Markdown that passes the linter on first attempt — header hierarchy, list spacing, code fences

**doc-hygiene** | `skills/documentation/doc-hygiene/` | docs, hygiene, drift

- Keep documentation correct, current, and concise — staleness checks and rewrite triggers

**nav-inject** | `skills/documentation/nav-inject/` | nav, sidebar, generation

- Auto-inject navigation sidebars from doc structure — keeps nav in sync without manual edits

### Media (+1)

**terminal-image-rendering** | `skills/media/terminal-image-rendering/` | terminal, images, sixel-iterm

- Render images directly in terminal — sixel, iTerm2 inline images, kitty graphics protocol

### Operations (+1)

**incident-response** | `skills/operations/incident-response/` | incident, sev, response

- Incident response playbook — severity classification, war-room norms, recovery checklist

### Process (+1)

**release-preflight** | `skills/process/release-preflight/` | release, preflight, ship-checklist

- Pre-release checklist — version, changelog, smoke tests, rollback plan before any push

### Productivity (+1)

**work-life-balance** | `skills/productivity/work-life-balance/` | wellbeing, sustainable, pace

- Sustainable engineering pace — when to stop, when to push, recovery norms

### Quality — Utilities (+1) | `skills/quality/terminal-command-safety/` | terminal, shell, safety

- Safe terminal command patterns — backtick escaping, output capture, and hang prevention

### Security — Utilities (+1) | `skills/security/distribution-security/` | distribution, signing, supply-chain

- Secure software distribution — signing, provenance, supply-chain hygiene, package integrity

### VS Code (+1)

**vscode-environment** | `skills/vscode/vscode-environment/` | vscode, environment, settings

- VS Code environment setup — settings, extensions, keybindings tuned for AI-assisted development






