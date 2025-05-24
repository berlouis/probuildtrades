#!/bin/bash
# 1. Clean up previous build artifacts
rm -rf .next

# 2. Run build with ESLint disabled
echo "🛠️ Building with ESLint disabled..."
NEXT_DISABLE_ESLINT=true npm run build
