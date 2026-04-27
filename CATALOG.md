# Skill Catalog

Browse skills by category. All skills are battle-tested and save >30 minutes of debugging.

**Total Skills**: 20 MVP skills

---

## Security (3 skills)

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

## Documentation (2 skills)

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

## Quality (1 skill)

### [universal-audit-pattern](skills/quality/universal-audit-pattern/)

**Tags**: `quality` `audit` `process` `documentation`

Systematic audit pattern: Inventory → Ground Truth → Severity-Classify → Fix All.

- Works for docs, code, security, architecture
- Template with inventory, findings, resolution log
- Severity classification criteria

**Time saved**: 4+ hours per audit

---

## Visual (1 skill)

### [image-embedding-size-limits](skills/visual/image-embedding-size-limits/)

**Tags**: `images` `ai` `tokens` `performance`

256px max for embedded images. 70% token savings vs 512px.

- Store originals at full resolution separately
- `embedSize` field documents the embedded dimension
- Implementation pattern with sharp

**Time saved**: 30 minutes + token costs

---

## VitePress (1 skill)

### [vitepress-iframe-embed](skills/vitepress/vitepress-iframe-embed/)

**Tags**: `vitepress` `vue` `iframe` `spa`

VitePress SPA routing intercepts all navigation clicks.

- Use iframe embed pattern for standalone HTML
- Create `.md` wrapper + Vue component
- HTML detects `?embed` to hide chrome

**Time saved**: 1 hour

---

## Architecture (1 skill)

### [defaults-plus-overrides](skills/architecture/defaults-plus-overrides/)

**Tags**: `architecture` `configuration` `patterns`

Provide role/archetype defaults, allow partial overrides, clamp bounds.

- Archetypes cover 80% of users out of the box
- Overrides are partial (don't require full config)
- Bounds prevent invalid configurations

**Time saved**: 2+ hours

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
| `azure` | azure-swa-gotchas, azure-identity-msi, azure-subscription-context |
| `security` | allowlist-over-blocklist, shell-injection-prevention, markdown-sanitization-chain |
| `cross-platform` | terminal-backtick-hazard, cloud-storage-paths, line-ending-parsing, vscode-cross-platform-paths |
| `documentation` | mermaid-mode-fragility, docs-decay-velocity, github-wiki-flat, github-readme-override |
| `windows` | node-winget-collision, pat-expiration-silent, vscode-cross-platform-paths |
| `nodejs` | shell-injection-prevention, node-winget-collision |
| `vscode` | vscode-cross-platform-paths |
| `github` | github-readme-override, github-wiki-flat |
| `mermaid` | mermaid-mode-fragility |
| `vitepress` | vitepress-iframe-embed |
