#!/bin/bash

cp prisma/schema.prisma prisma/schema.prisma.bak3

sed -i -E 's/(licenseNumber\s+String)\?+/\1/' prisma/schema.prisma
sed -i -E 's/(description\s+String)\?+/\1/' prisma/schema.prisma
sed -i -E 's/(priceMonthly\s+Float)\?+/\1/' prisma/schema.prisma
sed -i -E 's/(priceYearly\s+Float)\?+/\1/' prisma/schema.prisma
sed -i -E 's/(stripePriceId\s+String)\?+/\1/' prisma/schema.prisma

sed -i -E 's/(licenseNumber\s+String)/\1?/' prisma/schema.prisma
sed -i -E 's/(description\s+String)/\1?/' prisma/schema.prisma
sed -i -E 's/(priceMonthly\s+Float)/\1?/' prisma/schema.prisma
sed -i -E 's/(priceYearly\s+Float)/\1?/' prisma/schema.prisma
sed -i -E 's/(stripePriceId\s+String)/\1?/' prisma/schema.prisma
