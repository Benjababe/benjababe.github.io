#!/usr/bin/env node
import { readFileSync, readdirSync, statSync } from 'fs';
import { resolve, join } from 'path';

// Find the latest Lighthouse report JSON
function findLatestReport(baseDir) {
  const lhciDir = join(baseDir, '.lighthouseci');
  let latestFile = null;
  let latestTime = 0;

  try {
    const entries = readdirSync(lhciDir, { recursive: true, withFileTypes: true });
    for (const entry of entries) {
      if (entry.isFile() && entry.name.startsWith('lhr-') && entry.name.endsWith('.json')) {
        const fullPath = join(lhciDir, entry.path || '', entry.name);
        const mtime = statSync(fullPath).mtimeMs;
        if (mtime > latestTime) {
          latestTime = mtime;
          latestFile = fullPath;
        }
      }
    }
  } catch (e) {
    // directory might not exist
  }
  return latestFile;
}

const reportPath = findLatestReport(process.cwd());
if (!reportPath) {
  console.error('No Lighthouse reports found. Run `pnpm lhci` first.');
  process.exit(1);
}

// Read the report
const report = JSON.parse(readFileSync(reportPath, 'utf-8'));

const audits = report.audits || {};
const categories = report.categories || {};
const issues = [];

// Extract failed/warning assertions
for (const [key, audit] of Object.entries(audits)) {
  if (audit.score !== null && audit.score < 1) {
    if (audit.displayValue || audit.explanation) {
      issues.push({
        id: key,
        title: audit.title,
        description: audit.description,
        score: audit.score,
        numericValue: audit.numericValue ? `${audit.numericValue} ${audit.numericUnit}` : null,
        explanation: audit.explanation,
        displayValue: audit.displayValue
      });
    }
  }
}

// Extract category scores
for (const [catKey, cat] of Object.entries(categories)) {
  if (cat.score < 0.9) {
    issues.unshift({
      id: `category:${catKey}`,
      title: `${catKey.charAt(0).toUpperCase() + catKey.slice(1)} category`,
      score: cat.score,
      isCategory: true
    });
  }
}

// Output structured issues
console.log(`\n📊 Lighthouse Issues Found: ${issues.length}\n`);
console.log('---BEGIN ISSUES---');
console.log(JSON.stringify(issues, null, 2));
console.log('---END ISSUES---\n');

// Save to file for CI use
import { writeFileSync } from 'fs';
writeFileSync('.lighthouseci/issues.json', JSON.stringify(issues, null, 2));
console.log(`💾 Issues saved to .lighthouseci/issues.json`);
