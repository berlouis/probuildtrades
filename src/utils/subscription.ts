import { prisma } from '@/lib/prisma';

export async function hasActiveSubscription(id: number): Promise<boolean> {
  const now = new Date();
  const subscription = await prisma.subscription.findFirst({
    where: {
      id,
      status: 'active',
    },
  });

  return !!subscription;
}
