'use client';

import { Sale } from '@prisma/client';
import { useRouter } from 'next/navigation';
import React from 'react';
import { SaleForm } from 'src/features/sale/components/SaleForm';
import { AppContext } from 'src/shared/controller/appContext';

export default function SaleNew({ context }: { context: AppContext }) {
  const router = useRouter();

  return (
    <SaleForm
      context={context}
      onSuccess={(sale: Sale) =>
        router.push(`/sale/${sale.id}`)
      }
      onCancel={() => router.push('/sale')}
    />
  );
}
