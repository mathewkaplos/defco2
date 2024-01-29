'use client';

import { Tank } from '@prisma/client';
import { useRouter } from 'next/navigation';
import React from 'react';
import { TankForm } from 'src/features/tank/components/TankForm';
import { AppContext } from 'src/shared/controller/appContext';

export default function TankNew({ context }: { context: AppContext }) {
  const router = useRouter();

  return (
    <TankForm
      context={context}
      onSuccess={(tank: Tank) =>
        router.push(`/tank/${tank.id}`)
      }
      onCancel={() => router.push('/tank')}
    />
  );
}
