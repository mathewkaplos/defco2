'use client';

import { Station } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { StationForm } from 'src/features/station/components/StationForm';
import { stationFindApiCall } from 'src/features/station/stationApiCalls';
import { stationLabel } from 'src/features/station/stationLabel';
import { StationWithRelationships } from 'src/features/station/stationSchemas';
import Breadcrumb from 'src/shared/components/Breadcrumb';
import { toast } from 'src/shared/components/ui/use-toast';
import { AppContext } from 'src/shared/controller/appContext';
import { Logger } from 'src/shared/lib/Logger';

export default function StationEdit({
  context,
  id,
}: {
  context: AppContext;
  id: string;
}) {
  const dictionary = context.dictionary;
  const router = useRouter();
  const [station, setStation] = useState<StationWithRelationships>();

  useEffect(() => {
    async function doFetch() {
      try {
        setStation(undefined);
        const station = await stationFindApiCall(id);

        if (!station) {
          router.push('/station');
        }

        setStation(station);
      } catch (error: any) {
        Logger.error(error);
        toast({
          description: error.message || dictionary.shared.errors.unknown,
          variant: 'destructive',
        });
        router.push('/station');
      }
    }

    doFetch();
  }, [id, router, dictionary.shared.errors.unknown]);

  if (!station) {
    return null;
  }

  return (
    <div className="flex flex-1 flex-col">
      <Breadcrumb
        items={[
          [dictionary.station.list.menu, '/station'],
          [stationLabel(station, context.dictionary), `/station/${station?.id}`],
          [dictionary.station.edit.menu],
        ]}
      />
      <div className="my-10">
        <StationForm
          context={context}
          station={station}
          onSuccess={(station: Station) => router.push(`/station/${station.id}`)}
          onCancel={() => router.push('/station')}
        />
      </div>
    </div>
  );
}
