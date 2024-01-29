'use client';

import { Vehicle } from '@prisma/client';
import { useRouter } from 'next/navigation';
import React from 'react';
import { VehicleForm } from 'src/features/vehicle/components/VehicleForm';
import { AppContext } from 'src/shared/controller/appContext';

export default function VehicleNew({ context }: { context: AppContext }) {
  const router = useRouter();

  return (
    <VehicleForm
      context={context}
      onSuccess={(vehicle: Vehicle) =>
        router.push(`/vehicle/${vehicle.id}`)
      }
      onCancel={() => router.push('/vehicle')}
    />
  );
}
