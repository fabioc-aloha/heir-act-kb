# Skill Catalog

Browse skills by category. All skills are battle-tested patterns that save debugging time.

**Total Skills**: 51 skills

---

## Security (5 skills)

### [allowlist-over-blocklist](skills/security/allowlist-over-blocklist/)

**Tags**: `security` `validation` `input` `xss`

Blocklists fail because they only block what you anticipated. Attackers find variants.

- Enumerate what's permitted, reject everything else
- Patterns for URLs, file extensions, commands, API methods
- Implementation examples in JavaScript

**Time saved**: Prevents security incidents

---

### [shell-injection-prevention](skills/security/shell-injection-prevention/)

**Tags**: `security` `nodejs` `shell` `command-execution`

`execSync(command)` passes strings to a shell which interprets metacharacters.

- Use `execFileSync(executable, argsArray)` instead
- Avoids shell injection and is slightly faster
- Patterns for safe command execution

**Time saved**: 1+ hour + prevents incidents

---

### [markdown-sanitization-chain](skills/security/markdown-sanitization-chain/)

**Tags**: `security` `markdown` `xss` `mermaid` `dompurify`

Order matters: marked.js → DOMPurify → Mermaid post-render.

- Parse first, sanitize second, then render diagrams
- Never skip sanitizer even for "trusted" content
- DOMPurify configuration examples

**Time saved**: 2-4 hours debugging XSS vulnerabilities

---

### [error-message-sanitization](skills/security/error-message-sanitization/)

**Tags**: `security` `errors` `logging` `pii`

Error messages expose internal state: file paths, stack traces, SQL queries.

- Strip absolute paths with regex
- Redact connection strings and credentials
- Log full errors internally, sanitize externally

**Time saved**: 1+ hour + prevents information disclosure

---

### [path-traversal-prevention](skills/security/path-traversal-prevention/)

**Tags**: `security` `filesystem` `validation` `path`

Path traversal (`../../../etc/passwd`) escapes intended directories.

- Validate `path.resolve()` stays within destination root
- Use allowlists for permitted directories
- Atomic write pattern with staging directory

**Time saved**: 1+ hour + prevents security incidents

---

## GitHub (2 skills)

### [github-readme-override](skills/github/github-readme-override/)

**Tags**: `github` `documentation` `readme`

`.github/README.md` overrides root `README.md` on the repo landing page.

- Delete, rename, or symlink to fix
- Same behavior affects CONTRIBUTING.md, CODE_OF_CONDUCT.md, etc.

**Time saved**: 30-60 minutes

---

### [github-wiki-flat](skills/github/github-wiki-flat/)

**Tags**: `github` `wiki` `documentation` `links`

GitHub Wiki has no folder hierarchy. All pages render at root.

- `wiki/guide/setup.md` becomes `/wiki/guide-setup`
- Links must use flat names, not relative paths
- Automation pattern for link rewriting

**Time saved**: 1-2 hours debugging broken links

---

## Documentation (6 skills)

### [mermaid-mode-fragility](skills/documentation/mermaid-mode-fragility/)

**Tags**: `mermaid` `diagrams` `documentation` `markdown`

Three Mermaid modes silently fail on valid content:

- `timeline` breaks on `HH:MM` (uses `:` as separator)
- `gitGraph` fails on >10 commits with colon-bearing tags
- `gantt` mis-parses task lines with `dateFormat HH:mm`

**Solution**: Default to `flowchart` for complex content.

**Time saved**: 30-60 minutes debugging render failures

---

### [docs-decay-velocity](skills/documentation/docs-decay-velocity/)

**Tags**: `documentation` `maintenance` `drift`

Documentation decays proportional to how fast code changes.

- Hardcoded numbers, versions, paths rot fastest
- Prefer runtime reads or dated stamps
- Red flags to grep for

**Time saved**: 2+ hours per documentation audit

---

### [multi-surface-count-drift](skills/documentation/multi-surface-count-drift/)

**Tags**: `documentation` `maintenance` `drift` `counts`

Numbers appearing in N files across M surfaces WILL diverge.

- Grep for old number across ALL surfaces when updating
- Analytical/point-in-time docs are exempt (historical records)
- Automate counts where possible

**Time saved**: 1-2 hours debugging stale counts

---

### [version-stamp-automation](skills/documentation/version-stamp-automation/)

**Tags**: `documentation` `versioning` `automation` `drift`

Version numbers in 5+ files WILL drift with manual edits.

- Single-source from root `package.json`
- Bump script derives all locations
- Classify: auto-derivable vs. inherently manual (changelogs)

**Time saved**: 30-60 minutes per release

---

### [dual-surface-docs-drift](skills/documentation/dual-surface-docs-drift/)

**Tags**: `documentation` `drift` `deduplication`

Two READMEs covering overlapping scope will diverge.

- Cross-reference from less-detailed to more-detailed
- Or consolidate into single source
- Wiki = user docs, README = developer docs

**Time saved**: 1-2 hours per documentation audit

---

### [machine-readable-content](skills/documentation/machine-readable-content/)

**Tags**: `documentation` `automation` `parsing` `formatting`

Emoji, color codes, or visual markers in machine-consumed files break tooling.

- No decoration in tables/configs parsed by regex or LLMs
- Keep data clean, add presentation layer separately
- Test with actual consumers

**Time saved**: 30-60 minutes debugging parse failures

---

## Cross-Platform (4 skills)

### [terminal-backtick-hazard](skills/cross-platform/terminal-backtick-hazard/)

**Tags**: `terminal` `shell` `powershell` `bash`

Backticks break in ALL shells differently.

- Bash: command substitution
- PowerShell: escape character
- Use temp files for content containing backticks

**Time saved**: 1-2 hours

---

### [cloud-storage-paths](skills/cross-platform/cloud-storage-paths/)

**Tags**: `cross-platform` `icloud` `onedrive` `dropbox`

Cloud storage paths vary by provider, OS, account type, and version.

- iCloud has 3+ Windows path variants
- OneDrive differs for Personal vs Business
- Candidate-list approach: check all known paths

**Time saved**: 1-2 hours

---

### [line-ending-parsing](skills/cross-platform/line-ending-parsing/)

**Tags**: `cross-platform` `text-processing` `windows`

`.split('\n')` leaves `\r` on Windows, breaking pattern matching.

- Always use `/\r?\n/` regex for splitting text files
- Affects string equality, regex matching, hash values

**Time saved**: 30 minutes

---

### [vscode-cross-platform-paths](skills/cross-platform/vscode-cross-platform-paths/)

**Tags**: `vscode` `cross-platform` `extension-development`

VS Code stores user data differently on each OS.

- Windows: `%APPDATA%\Code\User`
- macOS: `~/Library/Application Support/Code/User`
- Linux: `${XDG_CONFIG_HOME:-~/.config}/Code/User`

**Time saved**: 30 minutes

---

## Azure (2 skills)

### [azure-identity-msi](skills/azure/azure-identity-msi/)

**Tags**: `azure` `managed-identity` `rbac` `service-principal`

A Managed Identity IS a Service Principal in Entra ID.

- `principalId` matches the ServicePrincipal in role assignments
- 4-step RBAC verification pattern
- Common role scope requirements

**Time saved**: 1-2 hours

---

### [azure-subscription-context](skills/azure/azure-subscription-context/)

**Tags**: `azure` `cli` `subscription`

Azure CLI commands run against the active subscription silently.

- Always verify with `az account show` first
- Per-command override with `--subscription`
- Scripting best practices

**Time saved**: 30 minutes - 1 hour

---

## Windows / Node.js (2 skills)

### [node-winget-collision](skills/windows-node/node-winget-collision/)

**Tags**: `windows` `nodejs` `winget` `installation`

Multiple winget Node.js packages share `C:\Program Files\nodejs\`.

- Uninstalling one removes binaries for others
- Safe upgrade: install new first, verify, then uninstall old

**Time saved**: 30-60 minutes

---

### [pat-expiration-silent](skills/windows-node/pat-expiration-silent/)

**Tags**: `tokens` `publishing` `vsce` `npm`

PAT expiration causes 401 errors but preflight only checks existence.

- Token existence ≠ token validity
- Set calendar reminders before expiry
- Common tokens and their lifespans

**Time saved**: 30 minutes

---

## Quality (8 skills)

### [universal-audit-pattern](skills/quality/universal-audit-pattern/)

**Tags**: `quality` `audit` `process` `documentation`

Systematic audit pattern: Inventory → Ground Truth → Severity-Classify → Fix All.

- Works for docs, code, security, architecture
- Template with inventory, findings, resolution log
- Severity classification criteria

**Time saved**: 4+ hours per audit

---

### [visual-artifact-qa](skills/quality/visual-artifact-qa/)

**Tags**: `quality` `visual` `svg` `qa`

SVG/banner/UI output that passes static checks can still fail to render.

- Loop: render → view → diff against intent → fix → re-render
- ImageMagick silently drops some valid SVG features
- No markdown lint or SVG validator catches rendering issues

**Time saved**: 1-2 hours debugging visual artifacts

---

### [falsifiability-test-pattern](skills/quality/falsifiability-test-pattern/)

**Tags**: `quality` `testing` `planning` `metrics`

Every deferred or speculative work item needs a falsifiability test.

- Measurable rule: "this lane worked / this lane failed"
- Defined time window for evaluation
- Without it, plans drift into wishful thinking

**Time saved**: Prevents wasted effort on unmeasurable goals

---

### [iterative-health-check](skills/quality/iterative-health-check/)

**Tags**: `quality` `health` `iteration` `scoring`

Score → fix top issues → rescore pattern.

- Fix highest-ROI dimension first
- Rescore to verify improvement
- Iterate until health threshold met

**Time saved**: 2+ hours per health assessment

---

### [date-threshold-arithmetic](skills/quality/date-threshold-arithmetic/)

**Tags**: `quality` `dates` `javascript` `bugs`

`daysBetween(a, b)` using `getTime()` returns fractional days.

- A date "exactly 7 days ago" may compute as 7.0001
- Fails a `> 7` check when it should pass
- Always `Math.floor()` before threshold comparison

**Time saved**: 30-60 minutes debugging date logic

---

### [test-rename-drift](skills/quality/test-rename-drift/)

**Tags**: `quality` `testing` `refactoring` `rename`

When renaming functions, test files have references that survive find-and-replace.

- Describe blocks, comments, variable names get missed
- Grep for BOTH old and new names after renaming
- Run rename-drift check before committing

**Time saved**: 30-60 minutes debugging test failures

---

### [parity-guard-test-pattern](skills/quality/parity-guard-test-pattern/)

**Tags**: `quality` `testing` `contracts` `parity`

When checking contract compliance, separate DIRECT callers from DELEGATORS.

- Direct callers must implement contract
- Delegators using compliant wrappers are exempt
- Prevents false positives from wrapper usage

**Time saved**: 1-2 hours triaging false test failures

---

### [capability-signature-detection](skills/quality/capability-signature-detection/)

**Tags**: `quality` `testing` `regex` `code-analysis`

Detect capability signature, not literal text, in code scanning.

- "If a developer renames a path constant, would the test still find them?"
- Import + call pattern survives refactoring
- Literal string matching misses real usage

**Time saved**: 1-2 hours debugging code analysis tools

---

## Visual (2 skills)

### [image-embedding-size-limits](skills/visual/image-embedding-size-limits/)

**Tags**: `images` `ai` `tokens` `performance`

256px max for embedded images. 70% token savings vs 512px.

- Store originals at full resolution separately
- `embedSize` field documents the embedded dimension
- Implementation pattern with sharp

**Time saved**: 30 minutes + token costs

---

### [image-storage-embedding-split](skills/visual/image-storage-embedding-split/)

**Tags**: `visual` `images` `storage` `embedding`

Separate storage resolution from embedding resolution.

- Keep originals at full resolution (512px) on disk
- Only the embedded `dataUri` uses smaller version (256px)
- Document with `embedSize` field in metadata

**Time saved**: 30 minutes debugging image quality issues

---

## VitePress (3 skills)

### [vitepress-iframe-embed](skills/vitepress/vitepress-iframe-embed/)

**Tags**: `vitepress` `vue` `iframe` `spa`

VitePress SPA routing intercepts all navigation clicks.

- Use iframe embed pattern for standalone HTML
- Create `.md` wrapper + Vue component
- HTML detects `?embed` to hide chrome

**Time saved**: 1 hour

---

### [vitepress-clean-urls](skills/vitepress/vitepress-clean-urls/)

**Tags**: `vitepress` `urls` `configuration` `links`

With `cleanUrls: true`, nav links must NOT have `.html` extensions.

- Nav links: `/guide` not `/guide.html`
- Sidebar links: same rule
- Markdown links: `[text](./page)` not `[text](./page.html)`

**Time saved**: 30-60 minutes debugging 404s

---

### [vitepress-spa-routing](skills/vitepress/vitepress-spa-routing/)

**Tags**: `vitepress` `spa` `routing` `navigation`

VitePress intercepts all navigation clicks for SPA routing.

- Use `target="_self"` to force full page navigation
- Or use full URL to bypass router
- Needed for non-VitePress pages on same domain

**Time saved**: 30-60 minutes debugging navigation

---

## Architecture (5 skills)

### [defaults-plus-overrides](skills/architecture/defaults-plus-overrides/)

**Tags**: `architecture` `configuration` `patterns`

Provide role/archetype defaults, allow partial overrides, clamp bounds.

- Archetypes cover 80% of users out of the box
- Overrides are partial (don't require full config)
- Bounds prevent invalid configurations

**Time saved**: 2+ hours

---

### [default-fast-opt-slow](skills/architecture/default-fast-opt-slow/)

**Tags**: `architecture` `ai` `ux` `performance`

For AI/LLM features, default to shortest response length.

- Users who want more depth will select it
- Persist preference in localStorage
- Faster default = better first impression

**Time saved**: 1 hour of UX iteration

---

### [weighted-scoring-matrix](skills/architecture/weighted-scoring-matrix/)

**Tags**: `architecture` `scoring` `decision-making`

Multi-factor scoring with normalized weights and optional boosts.

- Weights sum to 1.0 for predictable ranges
- Boosts for priority factors
- Transparent, debuggable scoring

**Time saved**: 2+ hours designing scoring systems

---

### [staged-transformation-pipeline](skills/architecture/staged-transformation-pipeline/)

**Tags**: `architecture` `pipeline` `transformation`

Input flows through discrete stages (profile → style → format → output).

- Each stage independently testable
- Each stage replaceable
- Clear data contracts between stages

**Time saved**: 2+ hours debugging monolithic transforms

---

### [opt-in-workspace-writes](skills/architecture/opt-in-workspace-writes/)

**Tags**: `architecture` `extension` `ux` `safety`

Extensions that write to user workspaces must get explicit consent first.

- Auto-writing `.github/`, config files, or scaffolding violates least-surprise
- Confirmation dialog before first write
- "Remember choice" option for subsequent writes

**Time saved**: User trust + support tickets

---

## Cloud Platforms (1 skill — in skills/cloud/)

### [azure-swa-gotchas](skills/cloud/azure-swa-gotchas/)

**Tags**: `azure` `static-web-apps` `deployment` `auth`

12 specific pitfalls when deploying to Azure Static Web Apps:

- `api_location:` silently overrides linked backend
- Auth route ordering matters
- SWA CLI v2.0.8 silently fails
- Custom domain redirect URIs required
- Embedded Functions lack IDENTITY_HEADER
- X-Frame-Options blocks iframes by default

**Time saved**: 2-4 hours per issue

---

## Build Pipelines (5 skills)

### [fix-once-auto-inject](skills/build/fix-once-auto-inject/)

**Tags**: `build` `automation` `idempotent`

Pair idempotent one-time fix script with build-time auto-inject fallback.

- Fix script runs once, cleans up issues
- Build-time fallback catches future regressions
- Avoids perpetual manual enforcement

**Time saved**: 2+ hours over project lifetime

---

### [data-driven-layouts](skills/build/data-driven-layouts/)

**Tags**: `build` `templates` `configuration`

Define page layout structures as data, keep rendering code as pure templates.

- Adding new sections requires only data changes
- No template surgery needed
- Separation of concerns

**Time saved**: 1-2 hours per layout change

---

### [config-content-separation](skills/build/config-content-separation/)

**Tags**: `build` `configuration` `content` `architecture`

JSON config defines structure, separate .md files hold content.

- Loader resolves file references at runtime
- Cache per session, invalidate on refresh
- Clean separation of concerns

**Time saved**: 1-2 hours debugging config issues

---

### [config-transcription-verification](skills/build/config-transcription-verification/)

**Tags**: `build` `configuration` `verification` `drift`

When extracting hardcoded data to JSON, fields will silently drift.

- Icon names, descriptions, field values get wrong
- Cross-check EVERY field against the source
- Automated verification where possible

**Time saved**: 1-2 hours debugging mysterious config bugs

---

### [build-script-path-rot](skills/build/build-script-path-rot/)

**Tags**: `build` `paths` `maintenance` `refactoring`

Hardcoded paths in build scripts rot when directory structure changes.

- Use config or resolve relative to manifest files
- Build scripts break silently on refactors
- `path.join()` from reliable anchors

**Time saved**: 30-60 minutes debugging build failures

---

## Academic (2 skills)

### [academic-editorial-judgment](skills/academic/academic-editorial-judgment/)

**Tags**: `academic` `editing` `style-guides` `judgment`

Complex editorial style rules require judgment, not pattern-matching.

- APA7 verb tense depends on context
- Apply critical thinking to editorial decisions
- Preserve author voice for intentional choices

**Time saved**: 1-2 hours per manuscript review

---

### [survey-instrument-verification](skills/academic/survey-instrument-verification/)

**Tags**: `academic` `surveys` `verification` `data-quality`

Verify manuscript claims against raw data before editing.

- Scale points, anchor labels, item wording
- "Exactly as administered" claims are testable hypotheses
- Manuscripts evolve terminology that may not match data

**Time saved**: 1-2 hours debugging data mismatches

---

## GitHub Actions (1 skill)

### [github-actions-version-upgrades](skills/github-actions/github-actions-version-upgrades/)

**Tags**: `github-actions` `ci-cd` `maintenance` `node`

Proactively use current action versions to avoid deprecation warnings.

- `actions/checkout@v5`, `actions/setup-node@v5`
- `node-version: '22'` (current LTS)
- Migration script for batch updates

**Time saved**: 30 minutes + avoids future breaks

---

## Azure (additional) (1 skill)

### [azure-cost-management-api](skills/azure/azure-cost-management-api/)

**Tags**: `azure` `cost-management` `api` `powershell`

In PowerShell, inline JSON for Cost Management API causes "Unsupported Media Type".

- Write JSON to file, reference with `@$path`
- Common query templates included
- Avoids shell JSON mangling

**Time saved**: 30-60 minutes

---

## Data (2 skills)

### [temp-file-python-analysis](skills/data/temp-file-python-analysis/)

**Tags**: `data` `python` `shell` `analysis`

Inline Python in shell scripts has quoting issues.

- Write to `_tmp.py`, execute, delete
- Avoids inline quoting nightmares
- Full editor support for the script

**Time saved**: 30-60 minutes debugging quote escaping

---

### [tmdl-linter-false-positives](skills/data/tmdl-linter-false-positives/)

**Tags**: `data` `tmdl` `power-bi` `linting` `false-positive`

VS Code's TMDL linter reports valid syntax as errors.

- `description` on measures is valid (linter is wrong)
- Test in Power BI Desktop to verify
- Option to suppress linting

**Time saved**: 30 minutes of confusion

---

## Patterns (1 pattern)

### [champion-challenger-cache](patterns/champion-challenger-cache.md)

**Tags**: `caching` `llm` `optimization` `hashing`

Hash LLM inputs → compare to cached champion → skip API if unchanged.

- Saves tokens and time on no-change runs
- Key gotcha: hash must include ALL prompt inputs

---

## Scaffolds (1 scaffold)

### [vite-azure-swa](scaffolds/vite-azure-swa/)

**Tags**: `vite` `azure` `static-web-apps` `starter`

Vite + Azure SWA starter with gotchas pre-solved.

---

## Index by Tag

| Tag | Skills |
|-----|--------|
| `academic` | academic-editorial-judgment, survey-instrument-verification |
| `architecture` | defaults-plus-overrides, default-fast-opt-slow, weighted-scoring-matrix, staged-transformation-pipeline, opt-in-workspace-writes |
| `azure` | azure-swa-gotchas, azure-identity-msi, azure-subscription-context, azure-cost-management-api |
| `build` | fix-once-auto-inject, data-driven-layouts, config-content-separation, config-transcription-verification, build-script-path-rot |
| `cross-platform` | terminal-backtick-hazard, cloud-storage-paths, line-ending-parsing, vscode-cross-platform-paths |
| `data` | temp-file-python-analysis, tmdl-linter-false-positives |
| `documentation` | mermaid-mode-fragility, docs-decay-velocity, multi-surface-count-drift, version-stamp-automation, dual-surface-docs-drift, machine-readable-content |
| `github` | github-readme-override, github-wiki-flat |
| `github-actions` | github-actions-version-upgrades |
| `mermaid` | mermaid-mode-fragility |
| `nodejs` | shell-injection-prevention, node-winget-collision |
| `quality` | universal-audit-pattern, visual-artifact-qa, falsifiability-test-pattern, iterative-health-check, date-threshold-arithmetic, test-rename-drift, parity-guard-test-pattern, capability-signature-detection |
| `security` | allowlist-over-blocklist, shell-injection-prevention, markdown-sanitization-chain, error-message-sanitization, path-traversal-prevention |
| `visual` | image-embedding-size-limits, image-storage-embedding-split |
| `vitepress` | vitepress-iframe-embed, vitepress-clean-urls, vitepress-spa-routing |
| `vscode` | vscode-cross-platform-paths |
| `windows` | node-winget-collision, pat-expiration-silent, vscode-cross-platform-paths | |
