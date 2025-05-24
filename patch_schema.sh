#!/bin/bash

# Backup schema.prisma first
cp prisma/schema.prisma prisma/schema.prisma.bak

# Use sed to replace required fields with nullable ones
sed -i 's/licenseNumber String/licenseNumber String?/' prisma/schema.prisma
sed -i 's/description String/description String?/' prisma/schema.prisma
sed -i 's/priceMonthly Float/priceMonthly Float?/' prisma/schema.prisma
sed -i 's/priceYearly Float/priceYearly Float?/' prisma/schema.prisma
sed -i 's/stripePriceId String/stripePriceId String?/' prisma/schema.prisma
