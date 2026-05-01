#!/usr/bin/env node
/**
 * fix-descriptions.cjs
 * Fix skills where the auto-extracted description grabbed "Category: X"
 * instead of real content. Reads deeper into the body to find actual description.
 *
 * Usage:
 *   node scripts/fix-descriptions.cjs          # dry-run
 *   node scripts/fix-descriptions.cjs --apply  # write
 */

const fs = require('fs');
const path = require('path');

const APPLY = process.argv.includes('--apply');

// Skills with bad "Category:" descriptions
const FIXES = {
    'architecture/defaults-plus-overrides': 'Provide sensible defaults with user-overridable configuration — reduce boilerplate without limiting flexibility',
    'cross-platform/cloud-storage-paths': 'Cross-platform cloud storage path resolution — OneDrive, iCloud, Dropbox path discovery and normalization',
    'cross-platform/line-ending-parsing': 'Line ending handling across platforms — CRLF vs LF detection, normalization, and git config',
    'cross-platform/powershell-regex-backreference': 'PowerShell regex backreference syntax pitfalls — dollar-sign escaping in replacement strings',
    'cross-platform/terminal-backtick-hazard': 'Backticks break in all shells — bash treats them as command substitution, PowerShell as escape character',
    'cross-platform/vscode-cross-platform-paths': 'VS Code path handling across Windows, macOS, and Linux — URI schemes, path separators, workspace folders',
    'documentation/docs-decay-velocity': 'Documentation decay rates by content type — hardcoded numbers and version pins rot fastest',
    'documentation/mermaid-mode-fragility': 'Mermaid diagram mode fragility — timeline, gitGraph, and gantt break on colons, default to flowchart',
    'github/github-readme-override': 'GitHub README display rules — which README renders when multiple exist, profile READMEs, org READMEs',
    'github/github-wiki-flat': 'GitHub Wiki has a flat namespace — no real folders, sidebar ordering tricks, link gotchas',
    'javascript/boolean-string-trap': 'JavaScript boolean-string coercion trap — "false" is truthy, JSON.parse or strict comparison required',
    'quality/universal-audit-pattern': 'Systematic project audit pattern — version consistency, terminology, fact inventory, cross-references',
    'security/allowlist-over-blocklist': 'Validate input against an allowlist of permitted values — reject everything else',
    'security/api-security-hardening': 'API security hardening — rate limiting, JWT validation, CORS, input validation (4-layer defense)',
    'security/markdown-sanitization-chain': 'Markdown sanitization order matters — marked.js then DOMPurify then Mermaid to prevent XSS',
    'security/shell-injection-prevention': 'Use execFileSync with args array instead of execSync with string concatenation to prevent shell injection',
    'testing/python-mock-patching-location': 'Python mock.patch must target the import location, not the definition location',
    'visual/image-embedding-size-limits': 'Image embedding size limits in markdown — base64 bloats 33%, use file references for images over 50KB',
    'vitepress/vitepress-iframe-embed': 'VitePress iframe embedding gotchas — CSP headers, sandboxing, responsive sizing',
    'windows-node/node-winget-collision': 'Node.js installed via winget collides with nvm — path priority, shim conflicts, resolution steps',
    'windows-node/pat-expiration-silent': 'Personal Access Token expiration fails silently — 401 errors with no expiry message, pre-check pattern',
};

const SKILLS_ROOT = path.join(__dirname, '..', 'skills');

let fixed = 0;
for (const [relPath, newDesc] of Object.entries(FIXES)) {
    const filePath = path.join(SKILLS_ROOT, relPath, 'SKILL.md');
    if (!fs.existsSync(filePath)) { console.log(`SKIP: ${relPath} (not found)`); continue; }

    let content = fs.readFileSync(filePath, 'utf-8');
    const oldMatch = content.match(/^description: .+$/m);
    if (!oldMatch) { console.log(`SKIP: ${relPath} (no description field)`); continue; }

    content = content.replace(/^description: .+$/m, `description: ${newDesc}`);

    if (APPLY) {
        fs.writeFileSync(filePath, content, 'utf-8');
        console.log(`FIXED: ${relPath}`);
    } else {
        console.log(`WOULD FIX: ${relPath} → "${newDesc.slice(0, 60)}..."`);
    }
    fixed++;
}

console.log(`\n${APPLY ? 'Fixed' : 'Would fix'}: ${fixed} descriptions`);
