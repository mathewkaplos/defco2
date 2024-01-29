'use client';

import { Device } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { DeviceForm } from 'src/features/device/components/DeviceForm';
import { deviceFindApiCall } from 'src/features/device/deviceApiCalls';
import { deviceLabel } from 'src/features/device/deviceLabel';
import { DeviceWithRelationships } from 'src/features/device/deviceSchemas';
import Breadcrumb from 'src/shared/components/Breadcrumb';
import { toast } from 'src/shared/components/ui/use-toast';
import { AppContext } from 'src/shared/controller/appContext';
import { Logger } from 'src/shared/lib/Logger';

export default function DeviceEdit({
  context,
  id,
}: {
  context: AppContext;
  id: string;
}) {
  const dictionary = context.dictionary;
  const router = useRouter();
  const [device, setDevice] = useState<DeviceWithRelationships>();

  useEffect(() => {
    async function doFetch() {
      try {
        setDevice(undefined);
        const device = await deviceFindApiCall(id);

        if (!device) {
          router.push('/device');
        }

        setDevice(device);
      } catch (error: any) {
        Logger.error(error);
        toast({
          description: error.message || dictionary.shared.errors.unknown,
          variant: 'destructive',
        });
        router.push('/device');
      }
    }

    doFetch();
  }, [id, router, dictionary.shared.errors.unknown]);

  if (!device) {
    return null;
  }

  return (
    <div className="flex flex-1 flex-col">
      <Breadcrumb
        items={[
          [dictionary.device.list.menu, '/device'],
          [deviceLabel(device, context.dictionary), `/device/${device?.id}`],
          [dictionary.device.edit.menu],
        ]}
      />
      <div className="my-10">
        <DeviceForm
          context={context}
          device={device}
          onSuccess={(device: Device) => router.push(`/device/${device.id}`)}
          onCancel={() => router.push('/device')}
        />
      </div>
    </div>
  );
}
