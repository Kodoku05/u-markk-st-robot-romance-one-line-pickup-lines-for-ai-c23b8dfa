import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const MAX_LINE_LENGTH = 200;
const OUTPUT_FILE = 'entry.txt';
const DEFAULT_OUTPUT_DIR = '/output';

const line = "Hey AI, dinner tonight? Tell your developers it's a human evaluation.";

try {
  const count = [...line].length;
  if (count < 1 || count > MAX_LINE_LENGTH || !line.trim() || /[\r\n]/u.test(line)) {
    throw new Error('Entry must be one nonblank line of 1–200 Unicode code points.');
  }
  const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? DEFAULT_OUTPUT_DIR;
  if (typeof outputDir !== 'string' || !outputDir.trim()) {
    throw new Error('Output directory must be a non-empty string.');
  }
  mkdirSync(outputDir, { recursive: true });
  writeFileSync(join(outputDir, OUTPUT_FILE), line, 'utf8');
  console.log(`Wrote ${OUTPUT_FILE} (${count} characters).`);
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`Failed to write entry.txt: ${message}`);
  process.exitCode = 1;
}
