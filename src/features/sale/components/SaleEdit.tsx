'use client';

import { Sale } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { SaleForm } from 'src/features/sale/components/SaleForm';
import { saleFindApiCall } from 'src/features/sale/saleApiCalls';
import { saleLabel } from 'src/features/sale/saleLabel';
import { SaleWithRelationships } from 'src/features/sale/saleSchemas';
import Breadcrumb from 'src/shared/components/Breadcrumb';
import { toast } from 'src/shared/components/ui/use-toast';
import { AppContext } from 'src/shared/controller/appContext';
import { Logger } from 'src/shared/lib/Logger';

export default function SaleEdit({
  context,
  id,
}: {
  context: AppContext;
  id: string;
}) {
  const dictionary = context.dictionary;
  const router = useRouter();
  const [sale, setSale] = useState<SaleWithRelationships>();

  useEffect(() => {
    async function doFetch() {
      try {
        setSale(undefined);
        const sale = await saleFindApiCall(id);

        if (!sale) {
          router.push('/sale');
        }

        setSale(sale);
      } catch (error: any) {
        Logger.error(error);
        toast({
          description: error.message || dictionary.shared.errors.unknown,
          variant: 'destructive',
        });
        router.push('/sale');
      }
    }

    doFetch();
  }, [id, router, dictionary.shared.errors.unknown]);

  if (!sale) {
    return null;
  }

  return (
    <div className="flex flex-1 flex-col">
      <Breadcrumb
        items={[
          [dictionary.sale.list.menu, '/sale'],
          [saleLabel(sale, context.dictionary), `/sale/${sale?.id}`],
          [dictionary.sale.edit.menu],
        ]}
      />
      <div className="my-10">
        <SaleForm
          context={context}
          sale={sale}
          onSuccess={(sale: Sale) => router.push(`/sale/${sale.id}`)}
          onCancel={() => router.push('/sale')}
        />
      </div>
    </div>
  );
}
