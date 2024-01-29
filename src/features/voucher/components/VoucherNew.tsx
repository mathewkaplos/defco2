'use client';

import { Voucher } from '@prisma/client';
import { useRouter } from 'next/navigation';
import React from 'react';
import { VoucherForm } from 'src/features/voucher/components/VoucherForm';
import { AppContext } from 'src/shared/controller/appContext';

export default function VoucherNew({ context }: { context: AppContext }) {
  const router = useRouter();

  return (
    <VoucherForm
      context={context}
      onSuccess={(voucher: Voucher) =>
        router.push(`/voucher/${voucher.id}`)
      }
      onCancel={() => router.push('/voucher')}
    />
  );
}
