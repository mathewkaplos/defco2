import { Device } from '@prisma/client';
import Link from 'next/link';
import React from 'react';
import { deviceLabel } from 'src/features/device/deviceLabel';
import { permissions } from 'src/features/permissions';
import { hasPermission } from 'src/features/security';
import { AppContext } from 'src/shared/controller/appContext';
import { cn } from 'src/shared/components/cn';

export function DeviceLink({
  device,
  context,
  className,
}: {
  device?: Partial<Device>;
  context: AppContext;
  className?: string;
}) {
  if (!device) {
    return '';
  }

  const hasPermissionToRead = hasPermission(permissions.deviceRead, context);

  if (!hasPermissionToRead) {
    return <span className={className}>{deviceLabel(device, context.dictionary)}</span>;
  }

  return (
    <Link
      href={`/device/${device.id}`}
      className={cn(
        'text-blue-500 hover:text-blue-400 hover:underline focus:text-blue-400 dark:text-blue-400',
        className,
      )}
      prefetch={false}
    >
      {deviceLabel(device, context.dictionary)}
    </Link>
  );
}
