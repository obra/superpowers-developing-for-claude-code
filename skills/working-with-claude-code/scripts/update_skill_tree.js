#!/usr/bin/env node

/**
 * update_skill_tree.js
 *
 * Scans references/ directory and updates the file tree in SKILL.md
 * with current files and their descriptions.
 *
 * Usage: node scripts/update_skill_tree.js
 */

const fs = require('fs');
const path = require('path');

const REFERENCES_DIR = path.join(__dirname, '..', 'references');
const SKILL_FILE = path.join(__dirname, '..', 'SKILL.md');
const TREE_START_MARKER = '<!-- tree-start -->';
const TREE_END_MARKER = '<!-- tree-end -->';

/**
 * Extract description from a markdown file
 * Priority: blockquote > H1 heading > generic fallback
 */
function extractDescription(filepath) {
  try {
    const content = fs.readFileSync(filepath, 'utf8');
    const lines = content.split('\n');

    // Look for blockquote pattern (> Description text)
    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed.startsWith('> ') && trimmed.length > 2) {
        // Remove the '> ' prefix and return
        return trimmed.substring(2).trim();
      }
    }

    // Fall back to H1 heading (# Heading Text)
    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed.startsWith('# ') && trimmed.length > 2) {
        return trimmed.substring(2).trim();
      }
    }

    // Generic fallback
    console.warn(`⚠️  No description found for ${path.basename(filepath)}, using generic text`);
    return 'Documentation file';
  } catch (error) {
    console.error(`❌ Error reading ${filepath}: ${error.message}`);
    return 'Documentation file';
  }
}

/**
 * Generate the file tree structure
 */
function generateTree() {
  // Check if references directory exists
  if (!fs.existsSync(REFERENCES_DIR)) {
    throw new Error(`References directory not found: ${REFERENCES_DIR}`);
  }

  // Get all .md files
  const files = fs.readdirSync(REFERENCES_DIR)
    .filter(file => file.endsWith('.md'))
    .sort();

  if (files.length === 0) {
    console.log('📁 No markdown files found in references/');
    return '```\nreferences/\n```';
  }

  // Build tree structure
  const lines = ['```', 'references/'];

  files.forEach((file, index) => {
    const filepath = path.join(REFERENCES_DIR, file);
    const description = extractDescription(filepath);
    const isLast = index === files.length - 1;
    const prefix = isLast ? '└── ' : '├── ';

    // Format: ├── filename.md              # Description
    // Pad the filename to align comments
    const paddedFilename = file.padEnd(25);
    lines.push(`${prefix}${paddedFilename}# ${description}`);
  });

  lines.push('```');
  return lines.join('\n');
}

/**
 * Update SKILL.md with the new tree
 */
function updateSkillFile(newTree) {
  // Read SKILL.md
  if (!fs.existsSync(SKILL_FILE)) {
    throw new Error(`SKILL.md not found: ${SKILL_FILE}`);
  }

  let content = fs.readFileSync(SKILL_FILE, 'utf8');

  // Find markers
  const startIndex = content.indexOf(TREE_START_MARKER);
  const endIndex = content.indexOf(TREE_END_MARKER);

  if (startIndex === -1 || endIndex === -1) {
    throw new Error('Cannot find tree markers in SKILL.md. Expected <!-- tree-start --> and <!-- tree-end -->');
  }

  // Replace content between markers
  const before = content.substring(0, startIndex + TREE_START_MARKER.length);
  const after = content.substring(endIndex);
  const newContent = `${before}\n${newTree}\n${after}`;

  // Write back
  fs.writeFileSync(SKILL_FILE, newContent, 'utf8');

  return true;
}

/**
 * Main execution
 */
async function main() {
  console.log('🌲 Updating SKILL.md file tree...\n');

  // Validate directory
  console.log(`📁 Scanning: ${REFERENCES_DIR}`);
  const fileCount = fs.readdirSync(REFERENCES_DIR)
    .filter(file => file.endsWith('.md')).length;
  console.log(`✅ Found ${fileCount} markdown files\n`);

  // Generate tree
  console.log('🔨 Generating file tree...');
  const tree = generateTree();

  // Update SKILL.md
  console.log('📝 Updating SKILL.md...');
  updateSkillFile(tree);

  console.log('✅ SKILL.md updated successfully!\n');
  console.log('💡 Run "git diff SKILL.md" to see changes');
}

// Run if called directly
if (require.main === module) {
  main().catch(error => {
    console.error('❌ Error:', error.message);
    process.exit(1);
  });
}

module.exports = { extractDescription, generateTree, updateSkillFile };
