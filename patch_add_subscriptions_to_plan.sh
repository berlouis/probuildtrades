#!/bin/bash

# Backup current schema.prisma
cp prisma/schema.prisma prisma/schema.prisma.bak

# Add subscriptions relation to Plan model if not present
if ! grep -q 'subscriptions Subscription\[\]' prisma/schema.prisma; then
  echo "Adding subscriptions field to Plan model..."

  # Insert line after 'model Plan {' line
  sed -i '/model Plan {/a\  subscriptions Subscription[]' prisma/schema.prisma
else
  echo "subscriptions field already present in Plan model."
fi

