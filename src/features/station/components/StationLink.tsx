import { Station } from '@prisma/client';
import Link from 'next/link';
import React from 'react';
import { stationLabel } from 'src/features/station/stationLabel';
import { permissions } from 'src/features/permissions';
import { hasPermission } from 'src/features/security';
import { AppContext } from 'src/shared/controller/appContext';
import { cn } from 'src/shared/components/cn';

export function StationLink({
  station,
  context,
  className,
}: {
  station?: Partial<Station>;
  context: AppContext;
  className?: string;
}) {
  if (!station) {
    return '';
  }

  const hasPermissionToRead = hasPermission(permissions.stationRead, context);

  if (!hasPermissionToRead) {
    return <span className={className}>{stationLabel(station, context.dictionary)}</span>;
  }

  return (
    <Link
      href={`/station/${station.id}`}
      className={cn(
        'text-blue-500 hover:text-blue-400 hover:underline focus:text-blue-400 dark:text-blue-400',
        className,
      )}
      prefetch={false}
    >
      {stationLabel(station, context.dictionary)}
    </Link>
  );
}
