'use client';

import { Station } from '@prisma/client';
import { useRouter } from 'next/navigation';
import React from 'react';
import { StationForm } from 'src/features/station/components/StationForm';
import { AppContext } from 'src/shared/controller/appContext';

export default function StationNew({ context }: { context: AppContext }) {
  const router = useRouter();

  return (
    <StationForm
      context={context}
      onSuccess={(station: Station) =>
        router.push(`/station/${station.id}`)
      }
      onCancel={() => router.push('/station')}
    />
  );
}
