import { Product } from '@prisma/client';
import Link from 'next/link';
import React from 'react';
import { productLabel } from 'src/features/product/productLabel';
import { permissions } from 'src/features/permissions';
import { hasPermission } from 'src/features/security';
import { AppContext } from 'src/shared/controller/appContext';
import { cn } from 'src/shared/components/cn';

export function ProductLink({
  product,
  context,
  className,
}: {
  product?: Partial<Product>;
  context: AppContext;
  className?: string;
}) {
  if (!product) {
    return '';
  }

  const hasPermissionToRead = hasPermission(permissions.productRead, context);

  if (!hasPermissionToRead) {
    return <span className={className}>{productLabel(product, context.dictionary)}</span>;
  }

  return (
    <Link
      href={`/product/${product.id}`}
      className={cn(
        'text-blue-500 hover:text-blue-400 hover:underline focus:text-blue-400 dark:text-blue-400',
        className,
      )}
      prefetch={false}
    >
      {productLabel(product, context.dictionary)}
    </Link>
  );
}
