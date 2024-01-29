'use client';

import { Voucher } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { VoucherForm } from 'src/features/voucher/components/VoucherForm';
import { voucherFindApiCall } from 'src/features/voucher/voucherApiCalls';
import { voucherLabel } from 'src/features/voucher/voucherLabel';
import { VoucherWithRelationships } from 'src/features/voucher/voucherSchemas';
import Breadcrumb from 'src/shared/components/Breadcrumb';
import { toast } from 'src/shared/components/ui/use-toast';
import { AppContext } from 'src/shared/controller/appContext';
import { Logger } from 'src/shared/lib/Logger';

export default function VoucherEdit({
  context,
  id,
}: {
  context: AppContext;
  id: string;
}) {
  const dictionary = context.dictionary;
  const router = useRouter();
  const [voucher, setVoucher] = useState<VoucherWithRelationships>();

  useEffect(() => {
    async function doFetch() {
      try {
        setVoucher(undefined);
        const voucher = await voucherFindApiCall(id);

        if (!voucher) {
          router.push('/voucher');
        }

        setVoucher(voucher);
      } catch (error: any) {
        Logger.error(error);
        toast({
          description: error.message || dictionary.shared.errors.unknown,
          variant: 'destructive',
        });
        router.push('/voucher');
      }
    }

    doFetch();
  }, [id, router, dictionary.shared.errors.unknown]);

  if (!voucher) {
    return null;
  }

  return (
    <div className="flex flex-1 flex-col">
      <Breadcrumb
        items={[
          [dictionary.voucher.list.menu, '/voucher'],
          [voucherLabel(voucher, context.dictionary), `/voucher/${voucher?.id}`],
          [dictionary.voucher.edit.menu],
        ]}
      />
      <div className="my-10">
        <VoucherForm
          context={context}
          voucher={voucher}
          onSuccess={(voucher: Voucher) => router.push(`/voucher/${voucher.id}`)}
          onCancel={() => router.push('/voucher')}
        />
      </div>
    </div>
  );
}
