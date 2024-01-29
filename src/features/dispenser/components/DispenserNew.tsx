'use client';

import { Dispenser } from '@prisma/client';
import { useRouter } from 'next/navigation';
import React from 'react';
import { DispenserForm } from 'src/features/dispenser/components/DispenserForm';
import { AppContext } from 'src/shared/controller/appContext';

export default function DispenserNew({ context }: { context: AppContext }) {
  const router = useRouter();

  return (
    <DispenserForm
      context={context}
      onSuccess={(dispenser: Dispenser) =>
        router.push(`/dispenser/${dispenser.id}`)
      }
      onCancel={() => router.push('/dispenser')}
    />
  );
}
