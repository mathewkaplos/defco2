'use client';

import { Tank } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { TankForm } from 'src/features/tank/components/TankForm';
import { tankFindApiCall } from 'src/features/tank/tankApiCalls';
import { tankLabel } from 'src/features/tank/tankLabel';
import { TankWithRelationships } from 'src/features/tank/tankSchemas';
import Breadcrumb from 'src/shared/components/Breadcrumb';
import { toast } from 'src/shared/components/ui/use-toast';
import { AppContext } from 'src/shared/controller/appContext';
import { Logger } from 'src/shared/lib/Logger';

export default function TankEdit({
  context,
  id,
}: {
  context: AppContext;
  id: string;
}) {
  const dictionary = context.dictionary;
  const router = useRouter();
  const [tank, setTank] = useState<TankWithRelationships>();

  useEffect(() => {
    async function doFetch() {
      try {
        setTank(undefined);
        const tank = await tankFindApiCall(id);

        if (!tank) {
          router.push('/tank');
        }

        setTank(tank);
      } catch (error: any) {
        Logger.error(error);
        toast({
          description: error.message || dictionary.shared.errors.unknown,
          variant: 'destructive',
        });
        router.push('/tank');
      }
    }

    doFetch();
  }, [id, router, dictionary.shared.errors.unknown]);

  if (!tank) {
    return null;
  }

  return (
    <div className="flex flex-1 flex-col">
      <Breadcrumb
        items={[
          [dictionary.tank.list.menu, '/tank'],
          [tankLabel(tank, context.dictionary), `/tank/${tank?.id}`],
          [dictionary.tank.edit.menu],
        ]}
      />
      <div className="my-10">
        <TankForm
          context={context}
          tank={tank}
          onSuccess={(tank: Tank) => router.push(`/tank/${tank.id}`)}
          onCancel={() => router.push('/tank')}
        />
      </div>
    </div>
  );
}
