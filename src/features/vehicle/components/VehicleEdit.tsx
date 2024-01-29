'use client';

import { Vehicle } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { VehicleForm } from 'src/features/vehicle/components/VehicleForm';
import { vehicleFindApiCall } from 'src/features/vehicle/vehicleApiCalls';
import { vehicleLabel } from 'src/features/vehicle/vehicleLabel';
import { VehicleWithRelationships } from 'src/features/vehicle/vehicleSchemas';
import Breadcrumb from 'src/shared/components/Breadcrumb';
import { toast } from 'src/shared/components/ui/use-toast';
import { AppContext } from 'src/shared/controller/appContext';
import { Logger } from 'src/shared/lib/Logger';

export default function VehicleEdit({
  context,
  id,
}: {
  context: AppContext;
  id: string;
}) {
  const dictionary = context.dictionary;
  const router = useRouter();
  const [vehicle, setVehicle] = useState<VehicleWithRelationships>();

  useEffect(() => {
    async function doFetch() {
      try {
        setVehicle(undefined);
        const vehicle = await vehicleFindApiCall(id);

        if (!vehicle) {
          router.push('/vehicle');
        }

        setVehicle(vehicle);
      } catch (error: any) {
        Logger.error(error);
        toast({
          description: error.message || dictionary.shared.errors.unknown,
          variant: 'destructive',
        });
        router.push('/vehicle');
      }
    }

    doFetch();
  }, [id, router, dictionary.shared.errors.unknown]);

  if (!vehicle) {
    return null;
  }

  return (
    <div className="flex flex-1 flex-col">
      <Breadcrumb
        items={[
          [dictionary.vehicle.list.menu, '/vehicle'],
          [vehicleLabel(vehicle, context.dictionary), `/vehicle/${vehicle?.id}`],
          [dictionary.vehicle.edit.menu],
        ]}
      />
      <div className="my-10">
        <VehicleForm
          context={context}
          vehicle={vehicle}
          onSuccess={(vehicle: Vehicle) => router.push(`/vehicle/${vehicle.id}`)}
          onCancel={() => router.push('/vehicle')}
        />
      </div>
    </div>
  );
}
