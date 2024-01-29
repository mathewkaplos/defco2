'use client';

import { Dispenser } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { DispenserForm } from 'src/features/dispenser/components/DispenserForm';
import { dispenserFindApiCall } from 'src/features/dispenser/dispenserApiCalls';
import { dispenserLabel } from 'src/features/dispenser/dispenserLabel';
import { DispenserWithRelationships } from 'src/features/dispenser/dispenserSchemas';
import Breadcrumb from 'src/shared/components/Breadcrumb';
import { toast } from 'src/shared/components/ui/use-toast';
import { AppContext } from 'src/shared/controller/appContext';
import { Logger } from 'src/shared/lib/Logger';

export default function DispenserEdit({
  context,
  id,
}: {
  context: AppContext;
  id: string;
}) {
  const dictionary = context.dictionary;
  const router = useRouter();
  const [dispenser, setDispenser] = useState<DispenserWithRelationships>();

  useEffect(() => {
    async function doFetch() {
      try {
        setDispenser(undefined);
        const dispenser = await dispenserFindApiCall(id);

        if (!dispenser) {
          router.push('/dispenser');
        }

        setDispenser(dispenser);
      } catch (error: any) {
        Logger.error(error);
        toast({
          description: error.message || dictionary.shared.errors.unknown,
          variant: 'destructive',
        });
        router.push('/dispenser');
      }
    }

    doFetch();
  }, [id, router, dictionary.shared.errors.unknown]);

  if (!dispenser) {
    return null;
  }

  return (
    <div className="flex flex-1 flex-col">
      <Breadcrumb
        items={[
          [dictionary.dispenser.list.menu, '/dispenser'],
          [dispenserLabel(dispenser, context.dictionary), `/dispenser/${dispenser?.id}`],
          [dictionary.dispenser.edit.menu],
        ]}
      />
      <div className="my-10">
        <DispenserForm
          context={context}
          dispenser={dispenser}
          onSuccess={(dispenser: Dispenser) => router.push(`/dispenser/${dispenser.id}`)}
          onCancel={() => router.push('/dispenser')}
        />
      </div>
    </div>
  );
}
