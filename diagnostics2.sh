#!/usr/bin/env bash
set -e

echo "Extracting context around each parse error…"

# 1) pages/admin/plans/index.tsx (JSX root error)
sed -n '1,30p' pages/admin/plans/index.tsx > ctx_plans_index.txt

# 2) pages/admin/subscriptions/index.tsx (around line 53)
sed -n '45,65p' pages/admin/subscriptions/index.tsx > ctx_subs_index.txt
# 3) pages/api/admin/plans/create.ts (Declaration or statement expected)
sed -n '1,50p' pages/api/admin/plans/create.ts > ctx_api_plans_create.txt

# 4) pages/dashboard/index.tsx (Identifier expected around line 58)
sed -n '50,80p' pages/dashboard/index.tsx > ctx_dashboard_index.txt

# 5) pages/profile.tsx ('try' expected around line 50)
sed -n '40,70p' pages/profile.tsx > ctx_profile.txt
# 6) components/PaymentForm.tsx (')' expected)
sed -n '1,30p' components/PaymentForm.tsx > ctx_paymentform.txt

echo "Done. Context files created: ctx_*.txt"
