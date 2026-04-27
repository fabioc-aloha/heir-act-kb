# Skill Catalog

**51 skills** organized by category. Each skill saves 30+ minutes of debugging.

**Format**: `skill-name` | path | tags | trigger → pattern

---

## Security (5)

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

## Cross-Platform (4)

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

## Azure (3)

**azure-identity-msi** | `skills/azure/azure-identity-msi/` | azure, managed-identity, rbac
- Trigger: Verifying Managed Identity permissions, RBAC debugging
- Pattern: MSI = Service Principal; `principalId` matches SP in role assignments

**azure-subscription-context** | `skills/azure/azure-subscription-context/` | azure, cli, subscription
- Trigger: Azure CLI returning empty results, "not found" errors
- Pattern: Verify subscription with `az account show` first

**azure-cost-management-api** | `skills/azure/azure-cost-management-api/` | azure, cost-management, powershell
- Trigger: Cost Management API "Unsupported Media Type" error
- Pattern: Write JSON to file, reference with `@$path` (inline JSON breaks in PowerShell)

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
