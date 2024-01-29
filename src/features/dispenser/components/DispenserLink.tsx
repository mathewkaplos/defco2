import { Dispenser } from '@prisma/client';
import Link from 'next/link';
import React from 'react';
import { dispenserLabel } from 'src/features/dispenser/dispenserLabel';
import { permissions } from 'src/features/permissions';
import { hasPermission } from 'src/features/security';
import { AppContext } from 'src/shared/controller/appContext';
import { cn } from 'src/shared/components/cn';

export function DispenserLink({
  dispenser,
  context,
  className,
}: {
  dispenser?: Partial<Dispenser>;
  context: AppContext;
  className?: string;
}) {
  if (!dispenser) {
    return '';
  }

  const hasPermissionToRead = hasPermission(permissions.dispenserRead, context);

  if (!hasPermissionToRead) {
    return <span className={className}>{dispenserLabel(dispenser, context.dictionary)}</span>;
  }

  return (
    <Link
      href={`/dispenser/${dispenser.id}`}
      className={cn(
        'text-blue-500 hover:text-blue-400 hover:underline focus:text-blue-400 dark:text-blue-400',
        className,
      )}
      prefetch={false}
    >
      {dispenserLabel(dispenser, context.dictionary)}
    </Link>
  );
}
