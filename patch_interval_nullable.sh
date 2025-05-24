#!/bin/bash

# Backup the current schema
cp prisma/schema.prisma prisma/schema.prisma.bak

# Replace 'interval String' with 'interval String?' to make it nullable
sed -i 's/interval\s\+String/interval String?/' prisma/schema.prisma

echo "Patched schema.prisma: 'interval' is now nullable."
