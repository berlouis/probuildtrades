#!/usr/bin/env bash
set -e

timestamp=$(date +%Y%m%d-%H%M%S)
mkdir -p backup-admin-pages-$timestamp

cp pages/admin/subscriptions/index.tsx backup-admin-pages-$timestamp/
cp pages/admin/plans/index.tsx backup-admin-pages-$timestamp/
