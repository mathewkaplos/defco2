import { Sale } from '@prisma/client';
import Link from 'next/link';
import React from 'react';
import { saleLabel } from 'src/features/sale/saleLabel';
import { permissions } from 'src/features/permissions';
import { hasPermission } from 'src/features/security';
import { AppContext } from 'src/shared/controller/appContext';
import { cn } from 'src/shared/components/cn';

export function SaleLink({
  sale,
  context,
  className,
}: {
  sale?: Partial<Sale>;
  context: AppContext;
  className?: string;
}) {
  if (!sale) {
    return '';
  }

  const hasPermissionToRead = hasPermission(permissions.saleRead, context);

  if (!hasPermissionToRead) {
    return <span className={className}>{saleLabel(sale, context.dictionary)}</span>;
  }

  return (
    <Link
      href={`/sale/${sale.id}`}
      className={cn(
        'text-blue-500 hover:text-blue-400 hover:underline focus:text-blue-400 dark:text-blue-400',
        className,
      )}
      prefetch={false}
    >
      {saleLabel(sale, context.dictionary)}
    </Link>
  );
}
