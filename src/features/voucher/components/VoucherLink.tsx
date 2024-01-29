import { Voucher } from '@prisma/client';
import Link from 'next/link';
import React from 'react';
import { voucherLabel } from 'src/features/voucher/voucherLabel';
import { permissions } from 'src/features/permissions';
import { hasPermission } from 'src/features/security';
import { AppContext } from 'src/shared/controller/appContext';
import { cn } from 'src/shared/components/cn';

export function VoucherLink({
  voucher,
  context,
  className,
}: {
  voucher?: Partial<Voucher>;
  context: AppContext;
  className?: string;
}) {
  if (!voucher) {
    return '';
  }

  const hasPermissionToRead = hasPermission(permissions.voucherRead, context);

  if (!hasPermissionToRead) {
    return <span className={className}>{voucherLabel(voucher, context.dictionary)}</span>;
  }

  return (
    <Link
      href={`/voucher/${voucher.id}`}
      className={cn(
        'text-blue-500 hover:text-blue-400 hover:underline focus:text-blue-400 dark:text-blue-400',
        className,
      )}
      prefetch={false}
    >
      {voucherLabel(voucher, context.dictionary)}
    </Link>
  );
}
