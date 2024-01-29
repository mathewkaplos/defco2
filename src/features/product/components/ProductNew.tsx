'use client';

import { Product } from '@prisma/client';
import { useRouter } from 'next/navigation';
import React from 'react';
import { ProductForm } from 'src/features/product/components/ProductForm';
import { AppContext } from 'src/shared/controller/appContext';

export default function ProductNew({ context }: { context: AppContext }) {
  const router = useRouter();

  return (
    <ProductForm
      context={context}
      onSuccess={(product: Product) =>
        router.push(`/product/${product.id}`)
      }
      onCancel={() => router.push('/product')}
    />
  );
}
