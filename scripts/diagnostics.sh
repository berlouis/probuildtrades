#!/usr/bin/env bash
# Simple build-health checker for ProBuildTrades
# Logs are time-stamped and saved to ./build-diagnostics-YYYYMMDD-HHMMSS.log

log="build-diagnostics-$(date +%Y%m%d-%H%M%S).log"
touch "$log"
exec > >(tee -a "$log") 2>&1

echo "=== ProBuildTrades Diagnostic Run: $(date) ==="

step () { echo -e "\n--- $1 ---"; }

step "Node & package versions"
node -v
npm -v
npx --version
step "Prisma validate"
npx prisma validate || echo "❌ Prisma validation FAILED"

step "Generate Prisma client (non-fatal)"
npx prisma generate || echo "⚠️  Prisma generate reported problems"

step "TypeScript compile (no emit)"
npx tsc --noEmit --pretty false || echo "❌ TypeScript errors"

step "Next.js lint"
npx next lint || echo "⚠️  ESLint issues"

step "Next.js production build"
npx next build || echo "❌ Next build FAILED"

echo -e "\n=== Diagnostics finished: $(date) ==="
echo "Log saved to $(pwd)/$log"
