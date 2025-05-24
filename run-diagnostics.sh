#!/usr/bin/env bash
set -e

LOG=diagnostics.log
echo "=== ESLint ===" > \$LOG
npx next lint >> \$LOG 2>&1 || echo "✗ ESLint issues found" >> \$LOG

echo -e "\n=== TypeScript ===" >> \$LOG
npx tsc --noEmit >> \$LOG 2>&1 || echo "✗ TypeScript errors found" >> \$LOG

echo -e "\n=== Next.js Build ===" >> \$LOG
npx next build >> \$LOG 2>&1 || echo "✗ Build errors found" >> \$LOG

echo -e "\nSummary of errors (if any):" >> \$LOG
grep -E "✗|error|Error|failed" -n \$LOG || echo "✔ No errors detected" >> \$LOG

echo "Diagnostics complete. See \$LOG for details."
