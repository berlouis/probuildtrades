#!/bin/bash

cp prisma/schema.prisma prisma/schema.prisma.bak2

sed -i 's/licenseNumber\s+String\??/licenseNumber String?/' prisma/schema.prisma
sed -i 's/description\s+String\??/description String?/' prisma/schema.prisma
sed -i 's/priceMonthly\s+Float\??/priceMonthly Float?/' prisma/schema.prisma
sed -i 's/priceYearly\s+Float\??/priceYearly Float?/' prisma/schema.prisma
sed -i 's/stripePriceId\s+String\??/stripePriceId String?/' prisma/schema.prisma
