#!/bin/bash

cat << 'EOM' > prisma/schema.prisma.part

model Plan {
  id        Int      @id @default(autoincrement())
  name      String
  createdAt DateTime @default(now())
  updatedAt DateTime?
  price     Float
  interval  String
}

EOM

# Remove old Plan model from schema.prisma and append the cleaned one
sed -i '/model Plan {/,/}/d' prisma/schema.prisma
cat prisma/schema.prisma.part >> prisma/schema.prisma
rm prisma/schema.prisma.part
