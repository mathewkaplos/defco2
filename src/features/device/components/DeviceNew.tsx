'use client';

import { Device } from '@prisma/client';
import { useRouter } from 'next/navigation';
import React from 'react';
import { DeviceForm } from 'src/features/device/components/DeviceForm';
import { AppContext } from 'src/shared/controller/appContext';

export default function DeviceNew({ context }: { context: AppContext }) {
  const router = useRouter();

  return (
    <DeviceForm
      context={context}
      onSuccess={(device: Device) =>
        router.push(`/device/${device.id}`)
      }
      onCancel={() => router.push('/device')}
    />
  );
}
