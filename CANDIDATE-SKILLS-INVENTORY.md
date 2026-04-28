# Alex Skill Mall: Candidate Hard Skills Inventory

**Source**: `learned-patterns.instructions.md` (2026-04-25)
**Assessment Date**: 2026-04-27
**Total Patterns**: 89
**KB Candidates**: 72 (after filtering)

---

## Selection Criteria Reminder

| Gate | Threshold |
|------|-----------|
| **Time saved** | >30 min debugging |
| **Non-obvious** | Not first Google result |
| **Battle-tested** | Used in real project |
| **Specific** | Concrete problem, not vague |
| **Current** | Still relevant |

**Excluded**: Patterns that are Alex-specific (fleet operations, trifecta internals) or too shallow.

---

## Category 1: Security (9 patterns → 6 KB candidates)

| # | Pattern | KB? | Skill Name | Time Saved | Notes |
|---|---------|-----|------------|------------|-------|
| 1 | Markdown rendering chain (marked.js → DOMPurify → Mermaid) | ✅ | `markdown-sanitization-chain` | 2-4h | Order-sensitive, non-obvious |
| 2 | Allowlist over blocklist | ✅ | `allowlist-over-blocklist` | Prevents incidents | Already in catalog |
| 3 | Sanitize at system boundaries | ✅ | `error-message-sanitization` | 1-2h | Strip paths, stack traces |
| 4 | execFileSync over execSync | ✅ | `shell-injection-prevention` | 1h | Security + performance |
| 5 | Cache expensive CLI probes | ❌ | — | — | Too shallow |
| 6 | Atomic filesystem writes | ✅ | `atomic-file-writes` | 1-2h | Already in patterns/ |
| 7 | Path traversal guard | ✅ | `path-traversal-prevention` | 2h | validate stays within root |
| 8 | Event delegation over inline handlers | ❌ | — | — | Well-documented pattern |
| 9 | escAttr must cover 6 chars | ❌ | — | — | Standard security knowledge |

---

## Category 2: GitHub (2 patterns → 2 KB candidates)

| # | Pattern | KB? | Skill Name | Time Saved | Notes |
|---|---------|-----|------------|------------|-------|
| 10 | `.github/README.md` overrides root README | ✅ | `github-readme-override` | 30-60m | Already in catalog |
| 11 | GitHub Wiki is flat | ✅ | `github-wiki-flat` | 1-2h | Already in catalog |

---

## Category 3: Documentation (10 patterns → 6 KB candidates)

| # | Pattern | KB? | Skill Name | Time Saved | Notes |
|---|---------|-----|------------|------------|-------|
| 12 | Docs decay proportional to velocity | ✅ | `docs-decay-velocity` | 2h+ | Already in catalog |
| 13 | Multi-surface count drift | ✅ | `multi-surface-count-drift` | 1-2h | Grep all surfaces |
| 14 | Automate version stamps | ✅ | `version-stamp-automation` | 2h+ | Single-source pattern |
| 15 | Plan integrity no automated check | ❌ | — | — | Alex-specific |
| 16 | Planning voice → past tense | ❌ | — | — | Too shallow |
| 17 | Dual-surface docs drift | ✅ | `dual-surface-docs-drift` | 1h | Cross-reference pattern |
| 18 | Wiki = user docs, README = developer docs | ❌ | — | — | Basic guidance |
| 19 | No decoration in machine-consumed files | ✅ | `machine-readable-content` | 30m-1h | Emoji breaks parsers |
| 20 | Mermaid mode fragility | ✅ | `mermaid-mode-fragility` | 30-60m | Already in catalog |
| 21 | ACT framework description | ❌ | — | — | Alex-specific |

---

## Category 4: Architecture (13 patterns → 5 KB candidates)

| # | Pattern | KB? | Skill Name | Time Saved | Notes |
|---|---------|-----|------------|------------|-------|
| 22 | Default to fast, opt into slow | ✅ | `default-fast-opt-slow` | 1h+ | UX pattern for LLM |
| 23 | Asset-ships-with-authoring-skill | ❌ | — | — | Alex-specific |
| 24 | Defaults-plus-overrides | ✅ | `defaults-plus-overrides` | 2h+ | Role/archetype pattern |
| 25 | Weighted scoring matrix | ✅ | `weighted-scoring-matrix` | 1h | Multi-factor decisions |
| 26 | Staged transformation pipeline | ✅ | `staged-transformation-pipeline` | 2h+ | Testable stages |
| 27 | Opt-in for workspace mutations | ✅ | `opt-in-workspace-writes` | — | Extension dev pattern |
| 28 | Cross-platform path resolution | ✅ | `vscode-cross-platform-paths` | 30m | Already in catalog |
| 29 | Report → Validate → Approve loop | ❌ | — | — | Alex-specific |
| 30 | Mechanical vs semantic split | ❌ | — | — | Alex-specific |
| 31 | Promote paradigms to instructions | ❌ | — | — | Alex-specific |
| 32 | Carryover lane pattern | ❌ | — | — | Alex-specific |
| 33 | mandatory: boolean orthogonal to inheritance | ❌ | — | — | Alex-specific |
| 34 | Default-tab is identity work | ❌ | — | — | Too philosophical |

---

## Category 5: Visual Memory (3 patterns → 2 KB candidates)

| # | Pattern | KB? | Skill Name | Time Saved | Notes |
|---|---------|-----|------------|------------|-------|
| 35 | 256px max for embedded images | ✅ | `image-embedding-size-limits` | 30m | Token savings |
| 36 | Separate storage from embedding | ✅ | `image-storage-embedding-split` | 30m | Full-res on disk |
| 37 | Face-consistent models at 256px | ❌ | — | — | Too narrow |

---

## Category 6: Fleet Operations (12 patterns → 0 KB candidates)

All Alex-specific fleet management patterns. Not suitable for general KB.

| # | Pattern | KB? | Notes |
|---|---------|-----|-------|
| 38 | DryRun must simulate non-existent paths | ❌ | Alex-specific |
| 39 | Two-phase fleet upgrade | ❌ | Alex-specific |
| 40 | Brain source path | ❌ | Alex-specific |
| 41 | Three-tier inheritance model | ❌ | Alex-specific |
| 42 | Config files are conceptually custom | ❌ | Alex-specific |
| 43 | Three "hooks" in AlexMaster | ❌ | Alex-specific |
| 44 | Stacked upgrades: curate oldest backup | ❌ | Alex-specific |
| 45 | Heir feedback queue as proto-aggregation | ❌ | Alex-specific |
| 46 | Pull-forward small paradigm wins | ❌ | Alex-specific |

---

## Category 7: Build Pipelines (7 patterns → 5 KB candidates)

| # | Pattern | KB? | Skill Name | Time Saved | Notes |
|---|---------|-----|------------|------------|-------|
| 47 | Fix-once + auto-inject-future | ✅ | `fix-once-auto-inject` | 2h+ | Two-pronged enforcement |
| 48 | Declarative data-driven layouts | ✅ | `data-driven-layouts` | 2h+ | Data, not templates |
| 49 | Config + content file separation | ✅ | `config-content-separation` | 1h | JSON + .md pattern |
| 50 | Verify every field when transcribing | ✅ | `config-transcription-verification` | 1h | Silent drift prevention |
| 51 | Hardcoded paths in build scripts rot | ✅ | `build-script-path-rot` | 1h | Use config/manifests |
| 52 | Release scripts must build own artifacts | ❌ | — | — | Standard DevOps |
| 53 | Preflight version-mismatch is gate | ❌ | — | — | Too specific |

---

## Category 8: Quality Process (15 patterns → 8 KB candidates)

| # | Pattern | KB? | Skill Name | Time Saved | Notes |
|---|---------|-----|------------|------------|-------|
| 54 | Universal audit pattern | ✅ | `universal-audit-pattern` | 4h+ | Inventory → compare → classify → fix |
| 55 | Release preflight surfaces drift | ❌ | — | — | Alex-specific |
| 56 | Vision QA for visual artifacts | ✅ | `visual-artifact-qa` | 1h | Render → view → diff |
| 57 | Falsifiability test per plan lane | ✅ | `falsifiability-test-pattern` | 2h+ | Measurable success/fail |
| 58 | Iterative health-check loop | ✅ | `iterative-health-check` | 2h+ | Score → fix → rescore |
| 59 | Dev folder harvest | ❌ | — | — | Alex-specific |
| 60 | brain-qa frontmatter gate | ❌ | — | — | Alex-specific |
| 61 | Token waste triage | ❌ | — | — | Alex-specific |
| 62 | Fractional date arithmetic at thresholds | ✅ | `date-threshold-arithmetic` | 30m | Math.floor() before compare |
| 63 | Rename drift in tests | ✅ | `test-rename-drift` | 30m | Grep old AND new name |
| 64 | Self-contained .github/ release gate | ❌ | — | — | Alex-specific |
| 65 | Parity-guard tests: DIRECT vs DELEGATION | ✅ | `parity-guard-test-pattern` | 1h | Contract implementation check |
| 66 | Detect capability, not literal text | ✅ | `capability-signature-detection` | 1h | Regex design for code scanning |
| 67 | node --test cwd contention on Windows | ❌ | — | — | Too narrow edge case |

---

## Category 9: Cross-Platform (3 patterns → 3 KB candidates)

| # | Pattern | KB? | Skill Name | Time Saved | Notes |
|---|---------|-----|------------|------------|-------|
| 68 | Cloud storage paths provider/install specific | ✅ | `cloud-storage-paths` | 1-2h | Already in catalog |
| 69 | Line endings in file parsing | ✅ | `line-ending-parsing` | 30m | Already in catalog |
| 70 | `path.join()` everywhere | ❌ | — | — | Basic Node.js knowledge |

---

## Category 10: Windows / Node.js (2 patterns → 2 KB candidates)

| # | Pattern | KB? | Skill Name | Time Saved | Notes |
|---|---------|-----|------------|------------|-------|
| 71 | Winget MSI packages share install dirs | ✅ | `node-winget-collision` | 30-60m | Already in catalog |
| 72 | PAT expiration breaks publish silently | ✅ | `pat-expiration-silent` | 30m | Already in catalog |

---

## Category 11: Azure CLI (2 patterns → 2 KB candidates)

| # | Pattern | KB? | Skill Name | Time Saved | Notes |
|---|---------|-----|------------|------------|-------|
| 73 | Subscription context breaks silently | ✅ | `azure-subscription-context` | 30m-1h | az account show first |
| 74 | Cost Management API file-based body | ✅ | `azure-cost-management-api` | 30-60m | Already in catalog |

---

## Category 12: Azure Static Web Apps (12 patterns → 1 KB skill)

All consolidated into `azure-swa-gotchas` (already created):

| # | Pattern | Notes |
|---|---------|-------|
| 75 | Vite public/ requires rebuild+redeploy | In azure-swa-gotchas |
| 76 | Self-host CDN libraries in enterprise | In azure-swa-gotchas |
| 77 | AbortController for long API calls | In azure-swa-gotchas |
| 78 | Auth route ordering matters | In azure-swa-gotchas |
| 79 | SWA CLI v2.0.8 silently fails | In azure-swa-gotchas |
| 80 | Custom domain redirect URIs | In azure-swa-gotchas |
| 81 | Disconnect before switching deploy | In azure-swa-gotchas |
| 82 | SWA embedded Functions lack IDENTITY_HEADER | In azure-swa-gotchas |
| 83 | Embedded API overrides linked backend | In azure-swa-gotchas |
| 84 | Azure Functions v4 requires main entry | In azure-swa-gotchas |
| 85 | X-Frame-Options blocks iframes | In azure-swa-gotchas |
| 86 | Verify hostname via az CLI | In azure-swa-gotchas |

---

## Category 13: Azure Identity (2 patterns → 1 KB candidate)

| # | Pattern | KB? | Skill Name | Time Saved | Notes |
|---|---------|-----|------------|------------|-------|
| 87 | MSI = ServicePrincipal | ✅ | `azure-identity-msi` | 1-2h | Already in catalog |
| 88 | RBAC verification pattern | — | — | — | Part of above |

---

## Category 14: GitHub Actions (1 pattern → 1 KB candidate)

| # | Pattern | KB? | Skill Name | Time Saved | Notes |
|---|---------|-----|------------|------------|-------|
| 89 | Proactive version upgrades | ✅ | `github-actions-version-upgrades` | 30m | v5 + Node 22 |

---

## Category 15: VitePress (4 patterns → 3 KB candidates)

| # | Pattern | KB? | Skill Name | Time Saved | Notes |
|---|---------|-----|------------|------------|-------|
| 90 | Standalone HTML in VitePress nav | ✅ | `vitepress-iframe-embed` | 1h | iframe pattern |
| 91 | cleanUrls + nav links | ✅ | `vitepress-clean-urls` | 30m | No .html extensions |
| 92 | SPA routing intercepts all nav clicks | ✅ | `vitepress-spa-routing` | 30m | target="_self" |
| 93 | Iframe CSS isolation | ❌ | — | — | Standard CSS knowledge |

---

## Category 16: Data Modeling (2 patterns → 2 KB candidates)

| # | Pattern | KB? | Skill Name | Time Saved | Notes |
|---|---------|-----|------------|------------|-------|
| 94 | Temp-file Python analysis | ✅ | `temp-file-python-analysis` | 30m | Already in catalog |
| 95 | TMDL linter false positives | ✅ | `tmdl-linter-false-positives` | 15m | Already in catalog |

---

## Category 17: Academic Writing (3 patterns → 2 KB candidates)

| # | Pattern | KB? | Skill Name | Time Saved | Notes |
|---|---------|-----|------------|------------|-------|
| 96 | Editorial review is judgment | ✅ | `academic-editorial-judgment` | 2h+ | CT from the start |
| 97 | Verify instrument wording against source | ✅ | `survey-instrument-verification` | 1-2h | Check raw data |
| 98 | Appendix exactness claims require audit | ❌ | — | — | Part of above |

---

## Summary: KB Candidate Skills (72 total)

### Already in Catalog (20)

1. `allowlist-over-blocklist`
2. `atomic-file-writes` (patterns/)
3. `github-readme-override`
4. `github-wiki-flat`
5. `docs-decay-velocity`
6. `mermaid-mode-fragility`
7. `vscode-cross-platform-paths`
8. `cloud-storage-paths`
9. `line-ending-parsing`
10. `node-winget-collision`
11. `pat-expiration-silent`
12. `azure-cost-management-api`
13. `azure-swa-gotchas` (consolidates 12 patterns)
14. `azure-identity-msi`
15. `temp-file-python-analysis`
16. `tmdl-linter-false-positives`
17. `champion-challenger-cache` (patterns/)
18. `entra-redirect-uris` (in catalog, part of auth gotchas)
19. `terminal-backtick-hazard` (referenced in catalog)
20. `github-actions-version-upgrades`

### New Skills to Create (32)

**Security (4)**
1. `markdown-sanitization-chain` — marked.js → DOMPurify → Mermaid order
2. `error-message-sanitization` — Strip paths, traces at boundaries
3. `shell-injection-prevention` — execFileSync over execSync
4. `path-traversal-prevention` — Validate stays within root

**Documentation (4)**
5. `multi-surface-count-drift` — Grep all surfaces when updating
6. `version-stamp-automation` — Single-source + bump script
7. `dual-surface-docs-drift` — Cross-reference pattern
8. `machine-readable-content` — No emoji in parsed files

**Architecture (5)**
9. `default-fast-opt-slow` — LLM response length UX
10. `defaults-plus-overrides` — Role/archetype pattern
11. `weighted-scoring-matrix` — Multi-factor scoring
12. `staged-transformation-pipeline` — Testable stages
13. `opt-in-workspace-writes` — Extension consent pattern

**Visual (2)**
14. `image-embedding-size-limits` — 256px for context
15. `image-storage-embedding-split` — Full-res on disk

**Build (5)**
16. `fix-once-auto-inject` — Two-pronged enforcement
17. `data-driven-layouts` — Data, not templates
18. `config-content-separation` — JSON + .md pattern
19. `config-transcription-verification` — Cross-check fields
20. `build-script-path-rot` — Config over hardcoded

**Quality (8)**
21. `universal-audit-pattern` — Inventory → compare → fix
22. `visual-artifact-qa` — Render → view → diff loop
23. `falsifiability-test-pattern` — Measurable rules
24. `iterative-health-check` — Score → fix → rescore
25. `date-threshold-arithmetic` — Math.floor() for thresholds
26. `test-rename-drift` — Grep old AND new names
27. `parity-guard-test-pattern` — DIRECT vs DELEGATION
28. `capability-signature-detection` — Regex for code scanning

**VitePress (3)**
29. `vitepress-iframe-embed` — Standalone HTML pattern
30. `vitepress-clean-urls` — No .html in nav links
31. `vitepress-spa-routing` — target="_self" for external

**Academic (2)**
32. `academic-editorial-judgment` — CT for style rules
33. `survey-instrument-verification` — Check raw data

### Consolidated Skills

| Skill | Patterns Consolidated |
|-------|----------------------|
| `azure-swa-gotchas` | 12 SWA patterns |
| `azure-identity-msi` | MSI + RBAC verification |

---

## New Scaffolds to Create (4)

| Scaffold | Stack | Gotchas Pre-solved |
|----------|-------|-------------------|
| `vite-azure-swa` | Vite + SWA | ✅ Already created |
| `fastapi-container-apps` | FastAPI + ACA | Identity, health checks, IaC |
| `react-copilot-extension` | React + VS Code + Copilot | Chat participant, manifest |
| `python-data-pipeline` | Synapse + Delta | Medallion, notebook patterns |

---

## New Patterns to Create (4)

| Pattern | What It Solves |
|---------|----------------|
| `champion-challenger-cache` | ✅ Already created |
| `atomic-file-writes` | Partial-write corruption |
| `universal-audit-pattern` | Cross-domain audit process |
| `staged-transformation-pipeline` | Testable processing stages |

---

## Phase 1 MVP (20 skills) — Recommended Order

Extract these first — highest value, broadest applicability:

1. `azure-swa-gotchas` ✅ (created)
2. `mermaid-mode-fragility`
3. `terminal-backtick-hazard`
4. `cloud-storage-paths`
5. `line-ending-parsing`
6. `github-wiki-flat`
7. `github-readme-override`
8. `docs-decay-velocity`
9. `azure-identity-msi`
10. `azure-subscription-context`
11. `node-winget-collision`
12. `pat-expiration-silent`
13. `vscode-cross-platform-paths`
14. `allowlist-over-blocklist`
15. `universal-audit-pattern`
16. `markdown-sanitization-chain`
17. `shell-injection-prevention`
18. `image-embedding-size-limits`
19. `vitepress-iframe-embed`
20. `defaults-plus-overrides`

---

## Excluded Patterns Summary (17)

| Reason | Count | Examples |
|--------|-------|----------|
| Alex-specific | 12 | Fleet ops, trifectas, brain-qa |
| Too shallow | 3 | Cache CLI probes, past tense |
| Well-documented | 2 | Event delegation, escAttr |

---

*Inventory complete. Ready for Phase 1 extraction.*
