'use client';

import { MaterialReceipt } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { MaterialReceiptForm } from 'src/features/materialReceipt/components/MaterialReceiptForm';
import { materialReceiptFindApiCall } from 'src/features/materialReceipt/materialReceiptApiCalls';
import { materialReceiptLabel } from 'src/features/materialReceipt/materialReceiptLabel';
import { MaterialReceiptWithRelationships } from 'src/features/materialReceipt/materialReceiptSchemas';
import Breadcrumb from 'src/shared/components/Breadcrumb';
import { toast } from 'src/shared/components/ui/use-toast';
import { AppContext } from 'src/shared/controller/appContext';
import { Logger } from 'src/shared/lib/Logger';

export default function MaterialReceiptEdit({
  context,
  id,
}: {
  context: AppContext;
  id: string;
}) {
  const dictionary = context.dictionary;
  const router = useRouter();
  const [materialReceipt, setMaterialReceipt] = useState<MaterialReceiptWithRelationships>();

  useEffect(() => {
    async function doFetch() {
      try {
        setMaterialReceipt(undefined);
        const materialReceipt = await materialReceiptFindApiCall(id);

        if (!materialReceipt) {
          router.push('/material-receipt');
        }

        setMaterialReceipt(materialReceipt);
      } catch (error: any) {
        Logger.error(error);
        toast({
          description: error.message || dictionary.shared.errors.unknown,
          variant: 'destructive',
        });
        router.push('/material-receipt');
      }
    }

    doFetch();
  }, [id, router, dictionary.shared.errors.unknown]);

  if (!materialReceipt) {
    return null;
  }

  return (
    <div className="flex flex-1 flex-col">
      <Breadcrumb
        items={[
          [dictionary.materialReceipt.list.menu, '/material-receipt'],
          [materialReceiptLabel(materialReceipt, context.dictionary), `/material-receipt/${materialReceipt?.id}`],
          [dictionary.materialReceipt.edit.menu],
        ]}
      />
      <div className="my-10">
        <MaterialReceiptForm
          context={context}
          materialReceipt={materialReceipt}
          onSuccess={(materialReceipt: MaterialReceipt) => router.push(`/material-receipt/${materialReceipt.id}`)}
          onCancel={() => router.push('/material-receipt')}
        />
      </div>
    </div>
  );
}
