#!/usr/bin/env node
// Generate CATALOG.json from all SKILL.md frontmatter
const fs = require('fs');
const path = require('path');

const skillsDir = path.join(__dirname, '..', 'skills');
const catalog = [];

function walkDir(dir) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) {
            const skillFile = path.join(full, 'SKILL.md');
            if (fs.existsSync(skillFile)) {
                const content = fs.readFileSync(skillFile, 'utf-8');
                const fm = parseFrontmatter(content);
                const rel = path.relative(skillsDir, full).replace(/\\/g, '/');
                const category = rel.split('/')[0];
                const title = extractTitle(content);
                // Fallback description: first paragraph after heading
                let desc = fm.description || '';
                if (!desc && title) {
                    const afterTitle = content.match(/^#\s+.+\n+([^#\n][^\n]+)/m);
                    desc = afterTitle ? afterTitle[1].trim().replace(/^>\s*/, '') : title;
                }
                catalog.push({
                    name: fm.name || entry.name,
                    category,
                    path: `skills/${rel}/`,
                    description: desc,
                    tier: fm.tier || 'standard',
                    applyTo: fm.applyTo || '',
                    triggers: extractTriggers(fm.description || ''),
                    title
                });
            }
            // always recurse into subdirs to find nested skills
            walkDir(full);
        }
    }
}

function parseFrontmatter(content) {
    const match = content.match(/^---\n([\s\S]*?)\n---/);
    if (!match) return {};
    const fm = {};
    let currentKey = null;
    for (const line of match[1].split('\n')) {
        const kv = line.match(/^(\w[\w-]*):\s*(.*)$/);
        if (kv) {
            currentKey = kv[1];
            let val = kv[2].trim();
            // strip quotes
            if ((val.startsWith("'") && val.endsWith("'")) || (val.startsWith('"') && val.endsWith('"'))) {
                val = val.slice(1, -1);
            }
            // handle multi-line start
            if (val === '|' || val === '>') {
                fm[currentKey] = '';
            } else if (val === '|-' || val === '>-') {
                fm[currentKey] = '';
            } else {
                fm[currentKey] = val;
            }
        } else if (currentKey && (line.startsWith('  ') || line.startsWith('\t'))) {
            // continuation of multi-line value
            fm[currentKey] = ((fm[currentKey] || '') + ' ' + line.trim()).trim();
        }
    }
    return fm;
}

function extractTitle(content) {
    const match = content.match(/^#\s+(.+)$/m);
    return match ? match[1].trim() : '';
}

function extractTriggers(desc) {
    // Pull trigger phrases from description if present
    const triggers = [];
    const trigMatch = desc.match(/[Tt]rigger[s]?[:\s]+["']?([^"'\n.]+)/);
    if (trigMatch) triggers.push(...trigMatch[1].split(',').map(t => t.trim()).filter(Boolean));
    // Also extract quoted trigger phrases
    const quoted = desc.match(/"([^"]+)"/g);
    if (quoted) triggers.push(...quoted.map(q => q.replace(/"/g, '')).slice(0, 5));
    return [...new Set(triggers)].slice(0, 8);
}

walkDir(skillsDir);

// Sort by category then name
catalog.sort((a, b) => a.category.localeCompare(b.category) || a.name.localeCompare(b.name));

const output = {
    version: '1.0.0',
    generated: new Date().toISOString().split('T')[0],
    count: catalog.length,
    categories: [...new Set(catalog.map(s => s.category))].sort(),
    skills: catalog
};

const outPath = path.join(__dirname, '..', 'CATALOG.json');
fs.writeFileSync(outPath, JSON.stringify(output, null, 2) + '\n');
console.log(`Generated CATALOG.json: ${catalog.length} skills across ${output.categories.length} categories`);
