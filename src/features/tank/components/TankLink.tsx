import { Tank } from '@prisma/client';
import Link from 'next/link';
import React from 'react';
import { tankLabel } from 'src/features/tank/tankLabel';
import { permissions } from 'src/features/permissions';
import { hasPermission } from 'src/features/security';
import { AppContext } from 'src/shared/controller/appContext';
import { cn } from 'src/shared/components/cn';

export function TankLink({
  tank,
  context,
  className,
}: {
  tank?: Partial<Tank>;
  context: AppContext;
  className?: string;
}) {
  if (!tank) {
    return '';
  }

  const hasPermissionToRead = hasPermission(permissions.tankRead, context);

  if (!hasPermissionToRead) {
    return <span className={className}>{tankLabel(tank, context.dictionary)}</span>;
  }

  return (
    <Link
      href={`/tank/${tank.id}`}
      className={cn(
        'text-blue-500 hover:text-blue-400 hover:underline focus:text-blue-400 dark:text-blue-400',
        className,
      )}
      prefetch={false}
    >
      {tankLabel(tank, context.dictionary)}
    </Link>
  );
}
