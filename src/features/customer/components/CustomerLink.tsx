import { Customer } from '@prisma/client';
import Link from 'next/link';
import React from 'react';
import { customerLabel } from 'src/features/customer/customerLabel';
import { permissions } from 'src/features/permissions';
import { hasPermission } from 'src/features/security';
import { AppContext } from 'src/shared/controller/appContext';
import { cn } from 'src/shared/components/cn';

export function CustomerLink({
  customer,
  context,
  className,
}: {
  customer?: Partial<Customer>;
  context: AppContext;
  className?: string;
}) {
  if (!customer) {
    return '';
  }

  const hasPermissionToRead = hasPermission(permissions.customerRead, context);

  if (!hasPermissionToRead) {
    return <span className={className}>{customerLabel(customer, context.dictionary)}</span>;
  }

  return (
    <Link
      href={`/customer/${customer.id}`}
      className={cn(
        'text-blue-500 hover:text-blue-400 hover:underline focus:text-blue-400 dark:text-blue-400',
        className,
      )}
      prefetch={false}
    >
      {customerLabel(customer, context.dictionary)}
    </Link>
  );
}
