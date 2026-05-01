#!/usr/bin/env node
/**
 * fix-frontmatter.cjs
 *
 * Scan all SKILL.md files in skills/ and ensure each has the canonical
 * frontmatter schema. Adds missing fields, normalizes existing ones.
 *
 * Usage:
 *   node scripts/fix-frontmatter.cjs          # dry-run (report only)
 *   node scripts/fix-frontmatter.cjs --apply  # write changes
 */

const fs = require('fs');
const path = require('path');

const APPLY = process.argv.includes('--apply');
const SKILLS_ROOT = path.join(__dirname, '..', 'skills');
const TODAY = '2026-04-30';

// --- Tier mapping by category ---
const CORE_CATEGORIES = new Set([
    'critical-thinking',
]);
const EXTENDED_CATEGORIES = new Set([
    'academic', 'publishing', 'domain', 'vitepress', 'windows-node',
    'media', 'people', 'design', 'productivity',
]);
// Everything else → standard

function getTier(category) {
    if (CORE_CATEGORIES.has(category)) return 'core';
    if (EXTENDED_CATEGORIES.has(category)) return 'extended';
    return 'standard';
}

// --- applyTo generation from skill name + category ---
function getApplyTo(skillName, category) {
    // Build glob from skill name keywords
    const keywords = skillName.split('-').filter(w => w.length > 2);
    // Take up to 3 most distinctive keywords
    const globs = keywords.slice(0, 3).map(k => `**/*${k}*`);
    if (globs.length === 0) return `'**/*${skillName}*'`;
    return `'${globs.join(',')}'`;
}

// --- Parse existing frontmatter ---
function parseFrontmatter(content) {
    const fmMatch = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
    if (!fmMatch) return { hasFM: false, fields: {}, body: content };

    const fmBlock = fmMatch[1];
    const fields = {};
    for (const line of fmBlock.split(/\r?\n/)) {
        const m = line.match(/^(\w[\w-]*)\s*:\s*(.+)$/);
        if (m) fields[m[1]] = m[2].trim();
    }
    const body = content.slice(fmMatch[0].length).replace(/^\r?\n/, '');
    return { hasFM: true, fields, body };
}

// --- Extract description from body if not in frontmatter ---
function extractDescription(body, skillName) {
    // Try first non-empty paragraph after title
    const lines = body.split(/\r?\n/);
    for (const line of lines) {
        const trimmed = line.trim();
        // Skip headings, empty lines, fences, metadata blocks
        if (!trimmed || trimmed.startsWith('#') || trimmed.startsWith('```') ||
            trimmed.startsWith('---') || trimmed.startsWith('|') ||
            trimmed.startsWith('**Tags**') || trimmed.startsWith('**Currency**') ||
            trimmed.startsWith('**Promoted') || trimmed.startsWith('>')) continue;
        // Skip very short lines
        if (trimmed.length < 20) continue;
        // Found a description candidate — truncate to one sentence
        const sentence = trimmed.replace(/\.\s.*$/, '.').slice(0, 200);
        return sentence.replace(/^[-*]\s+/, ''); // strip list markers
    }
    // Fallback: humanize skill name
    return skillName.split('-').join(' ');
}

// --- Strip inline metadata that duplicates frontmatter ---
function stripInlineMetadata(body) {
    // Remove **Tags**: ..., **Currency**: ..., **Promoted from**: ... blocks
    const lines = body.split(/\r?\n/);
    const cleaned = [];
    let skipNextHr = false;
    for (let i = 0; i < lines.length; i++) {
        const t = lines[i].trim();
        if (t.startsWith('**Tags**:') || t.startsWith('**Currency**:') ||
            t.startsWith('**Promoted from**:') || t.startsWith('**Promoted from:')) {
            skipNextHr = true;
            continue;
        }
        if (skipNextHr && t === '---') {
            skipNextHr = false;
            continue;
        }
        if (skipNextHr && t === '') continue; // blank line between metadata
        skipNextHr = false;
        cleaned.push(lines[i]);
    }
    // Remove leading blank lines
    while (cleaned.length && cleaned[0].trim() === '') cleaned.shift();
    return cleaned.join('\n');
}

// --- Main ---
function main() {
    const categories = fs.readdirSync(SKILLS_ROOT, { withFileTypes: true })
        .filter(d => d.isDirectory())
        .map(d => d.name);

    let fixed = 0;
    let alreadyGood = 0;
    let total = 0;

    for (const category of categories) {
        const catDir = path.join(SKILLS_ROOT, category);
        const skills = fs.readdirSync(catDir, { withFileTypes: true })
            .filter(d => d.isDirectory())
            .map(d => d.name);

        for (const skillName of skills) {
            const skillFile = path.join(catDir, skillName, 'SKILL.md');
            if (!fs.existsSync(skillFile)) continue;
            total++;

            const content = fs.readFileSync(skillFile, 'utf-8');
            const { hasFM, fields, body: rawBody } = parseFrontmatter(content);

            // Check required fields
            const required = ['type', 'lifecycle', 'inheritance', 'name', 'description', 'tier', 'applyTo', 'currency', 'lastReviewed'];
            const missing = required.filter(f => !fields[f]);

            if (missing.length === 0) {
                alreadyGood++;
                continue;
            }

            // Clean inline metadata from body
            const body = stripInlineMetadata(rawBody);

            // Build complete fields
            const final = { ...fields };
            if (!final.type) final.type = 'skill';
            if (!final.lifecycle) final.lifecycle = 'stable';
            if (!final.inheritance) final.inheritance = 'inheritable';
            if (!final.name) final.name = skillName;
            if (!final.description) {
                final.description = extractDescription(body, skillName);
            }
            // Clean description: remove quotes, ensure single line
            final.description = final.description.replace(/^["']|["']$/g, '').replace(/\r?\n/g, ' ').trim();
            // Remove markdown bold from description
            final.description = final.description.replace(/\*\*/g, '');
            if (!final.tier) final.tier = getTier(category);
            if (!final.applyTo) final.applyTo = getApplyTo(skillName, category);
            // Ensure applyTo is quoted
            if (!final.applyTo.startsWith("'")) final.applyTo = `'${final.applyTo}'`;
            if (!final.currency) final.currency = TODAY;
            if (!final.lastReviewed) final.lastReviewed = TODAY;

            // Build frontmatter in canonical order
            const orderedKeys = ['type', 'lifecycle', 'inheritance', 'name', 'description', 'tier', 'applyTo', 'currency', 'lastReviewed'];
            const fmLines = orderedKeys.map(k => `${k}: ${final[k]}`);
            const newContent = `---\n${fmLines.join('\n')}\n---\n\n${body}`;

            if (APPLY) {
                fs.writeFileSync(skillFile, newContent, 'utf-8');
            }

            fixed++;
            if (!APPLY) {
                console.log(`WOULD FIX: ${category}/${skillName} (missing: ${missing.join(', ')})`);
            } else {
                console.log(`FIXED: ${category}/${skillName} (added: ${missing.join(', ')})`);
            }
        }
    }

    console.log(`\n--- Summary ---`);
    console.log(`Total skills: ${total}`);
    console.log(`Already compliant: ${alreadyGood}`);
    console.log(`${APPLY ? 'Fixed' : 'Would fix'}: ${fixed}`);
}

main();
