#!/usr/bin/env bash
# Remove everything after the real end of the AdminSubscriptions component
sed -i '/^}/q' pages/admin/subscriptions/index.tsx
