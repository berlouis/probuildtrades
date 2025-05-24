#!/bin/bash
cp prisma/schema.prisma prisma/schema.prisma.bak
echo "generator client {
  provider = \"prisma-client-js\"
}" > prisma/schema.prisma
