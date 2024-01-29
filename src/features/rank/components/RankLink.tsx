import { Rank } from '@prisma/client';
import Link from 'next/link';
import React from 'react';
import { rankLabel } from 'src/features/rank/rankLabel';
import { permissions } from 'src/features/permissions';
import { hasPermission } from 'src/features/security';
import { AppContext } from 'src/shared/controller/appContext';
import { cn } from 'src/shared/components/cn';

export function RankLink({
  rank,
  context,
  className,
}: {
  rank?: Partial<Rank>;
  context: AppContext;
  className?: string;
}) {
  if (!rank) {
    return '';
  }

  const hasPermissionToRead = hasPermission(permissions.rankRead, context);

  if (!hasPermissionToRead) {
    return <span className={className}>{rankLabel(rank, context.dictionary)}</span>;
  }

  return (
    <Link
      href={`/rank/${rank.id}`}
      className={cn(
        'text-blue-500 hover:text-blue-400 hover:underline focus:text-blue-400 dark:text-blue-400',
        className,
      )}
      prefetch={false}
    >
      {rankLabel(rank, context.dictionary)}
    </Link>
  );
}
