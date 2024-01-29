'use client';

import { Customer } from '@prisma/client';
import { useRouter } from 'next/navigation';
import React from 'react';
import { CustomerForm } from 'src/features/customer/components/CustomerForm';
import { AppContext } from 'src/shared/controller/appContext';

export default function CustomerNew({ context }: { context: AppContext }) {
  const router = useRouter();

  return (
    <CustomerForm
      context={context}
      onSuccess={(customer: Customer) =>
        router.push(`/customer/${customer.id}`)
      }
      onCancel={() => router.push('/customer')}
    />
  );
}
