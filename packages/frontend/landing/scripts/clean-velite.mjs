#!/usr/bin/env node
import { rm } from 'fs/promises';
import { join } from 'path';

const veliteDir = join(process.cwd(), '.velite');

console.log('🧹 Cleaning Velite cache...');

try {
  await rm(veliteDir, { recursive: true, force: true });
  console.log('✅ Velite cache cleared successfully!');
  console.log('');
  console.log('Now run: npm run velite');
} catch (error) {
  if (error.code === 'ENOENT') {
    console.log('ℹ️  No .velite directory found (already clean)');
  } else {
    console.error('❌ Error cleaning Velite cache:', error);
    process.exit(1);
  }
}
