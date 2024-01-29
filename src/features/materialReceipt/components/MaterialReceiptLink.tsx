import { MaterialReceipt } from '@prisma/client';
import Link from 'next/link';
import React from 'react';
import { materialReceiptLabel } from 'src/features/materialReceipt/materialReceiptLabel';
import { permissions } from 'src/features/permissions';
import { hasPermission } from 'src/features/security';
import { AppContext } from 'src/shared/controller/appContext';
import { cn } from 'src/shared/components/cn';

export function MaterialReceiptLink({
  materialReceipt,
  context,
  className,
}: {
  materialReceipt?: Partial<MaterialReceipt>;
  context: AppContext;
  className?: string;
}) {
  if (!materialReceipt) {
    return '';
  }

  const hasPermissionToRead = hasPermission(permissions.materialReceiptRead, context);

  if (!hasPermissionToRead) {
    return <span className={className}>{materialReceiptLabel(materialReceipt, context.dictionary)}</span>;
  }

  return (
    <Link
      href={`/material-receipt/${materialReceipt.id}`}
      className={cn(
        'text-blue-500 hover:text-blue-400 hover:underline focus:text-blue-400 dark:text-blue-400',
        className,
      )}
      prefetch={false}
    >
      {materialReceiptLabel(materialReceipt, context.dictionary)}
    </Link>
  );
}
