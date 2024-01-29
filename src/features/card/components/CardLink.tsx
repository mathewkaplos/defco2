import { Card } from '@prisma/client';
import Link from 'next/link';
import React from 'react';
import { cardLabel } from 'src/features/card/cardLabel';
import { permissions } from 'src/features/permissions';
import { hasPermission } from 'src/features/security';
import { AppContext } from 'src/shared/controller/appContext';
import { cn } from 'src/shared/components/cn';

export function CardLink({
  card,
  context,
  className,
}: {
  card?: Partial<Card>;
  context: AppContext;
  className?: string;
}) {
  if (!card) {
    return '';
  }

  const hasPermissionToRead = hasPermission(permissions.cardRead, context);

  if (!hasPermissionToRead) {
    return <span className={className}>{cardLabel(card, context.dictionary)}</span>;
  }

  return (
    <Link
      href={`/card/${card.id}`}
      className={cn(
        'text-blue-500 hover:text-blue-400 hover:underline focus:text-blue-400 dark:text-blue-400',
        className,
      )}
      prefetch={false}
    >
      {cardLabel(card, context.dictionary)}
    </Link>
  );
}
