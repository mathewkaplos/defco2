import { Vehicle } from '@prisma/client';
import Link from 'next/link';
import React from 'react';
import { vehicleLabel } from 'src/features/vehicle/vehicleLabel';
import { permissions } from 'src/features/permissions';
import { hasPermission } from 'src/features/security';
import { AppContext } from 'src/shared/controller/appContext';
import { cn } from 'src/shared/components/cn';

export function VehicleLink({
  vehicle,
  context,
  className,
}: {
  vehicle?: Partial<Vehicle>;
  context: AppContext;
  className?: string;
}) {
  if (!vehicle) {
    return '';
  }

  const hasPermissionToRead = hasPermission(permissions.vehicleRead, context);

  if (!hasPermissionToRead) {
    return <span className={className}>{vehicleLabel(vehicle, context.dictionary)}</span>;
  }

  return (
    <Link
      href={`/vehicle/${vehicle.id}`}
      className={cn(
        'text-blue-500 hover:text-blue-400 hover:underline focus:text-blue-400 dark:text-blue-400',
        className,
      )}
      prefetch={false}
    >
      {vehicleLabel(vehicle, context.dictionary)}
    </Link>
  );
}
