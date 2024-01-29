'use client';

import { MaterialReceipt } from '@prisma/client';
import { useRouter } from 'next/navigation';
import React from 'react';
import { MaterialReceiptForm } from 'src/features/materialReceipt/components/MaterialReceiptForm';
import { AppContext } from 'src/shared/controller/appContext';

export default function MaterialReceiptNew({ context }: { context: AppContext }) {
  const router = useRouter();

  return (
    <MaterialReceiptForm
      context={context}
      onSuccess={(materialReceipt: MaterialReceipt) =>
        router.push(`/material-receipt/${materialReceipt.id}`)
      }
      onCancel={() => router.push('/material-receipt')}
    />
  );
}
