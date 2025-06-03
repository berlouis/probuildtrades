#!/usr/bin/env bash
set -e

# 1) Run Next.js build and capture stderr
npx next build 2> build-errors.log || true
# 2) Pull out all “Parsing error” lines
grep -E "Error: Parsing error" -n build-errors.log > parsing-errors.log
# 3) List which files are triggering them
awk -F ':' '/Parsing error/ {print }' parsing-errors.log | sort | uniq > error-files.txt
echo "Files with parsing errors:"
cat error-files.txt
# 4) Summarize each distinct parsing error
awk -F 'Parsing error: ' '{print }' parsing-errors.log | sort | uniq -c > error-summary.txt
echo; echo "Error summary (count → message):"
cat error-summary.txt
