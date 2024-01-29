'use client';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { MaterialReceiptWithRelationships } from 'src/features/materialReceipt/materialReceiptSchemas';
import { materialReceiptFindApiCall } from 'src/features/materialReceipt/materialReceiptApiCalls';
import { MaterialReceiptActions } from 'src/features/materialReceipt/components/MaterialReceiptActions';
import { materialReceiptPermissions } from 'src/features/materialReceipt/materialReceiptPermissions';
import Breadcrumb from 'src/shared/components/Breadcrumb';
import { CopyToClipboardButton } from 'src/shared/components/CopyToClipboardButton';
import { toast } from 'src/shared/components/ui/use-toast';
import { AppContext } from 'src/shared/controller/appContext';
import { formatDatetime } from 'src/shared/lib/formatDateTime';
import { formatDate } from 'src/shared/lib/formatDate';
import { formatDecimal } from 'src/shared/lib/formatDecimal';
import { productLabel } from 'src/features/product/productLabel';
import { ProductLink } from 'src/features/product/components/ProductLink';
import { materialReceiptLabel } from 'src/features/materialReceipt/materialReceiptLabel';
import { MembershipLink } from 'src/features/membership/components/MembershipLink';
import { membershipLabel } from 'src/features/membership/membershipLabel';

export function MaterialReceiptView({
  id,
  context,
}: {
  id: string;
  context: AppContext;
}) {
  const { dictionary } = context;
  const queryClient = useQueryClient();
  const router = useRouter();

  const query = useQuery({
    queryKey: ['materialReceipt', id],
    queryFn: async ({ signal }) => {
      return await materialReceiptFindApiCall(id, signal);
    },
    initialData: () =>
      (
        queryClient.getQueryData([
          'materialReceipt',
        ]) as Array<MaterialReceiptWithRelationships>
      )?.find((d) => d.id === id),
  });

  const materialReceipt = query.data;

  if (query.isSuccess && !materialReceipt) {
    router.push('/material-receipt');
    return null;
  }

  if (query.isError) {
    toast({
      description:
        (query.error as any).message || dictionary.shared.errors.unknown,
      variant: 'destructive',
    });
    router.push('/material-receipt');
    return null;
  }

  if (!materialReceipt) {
    return null;
  }

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex items-center justify-between">
        <Breadcrumb
          items={[
            [dictionary.materialReceipt.list.menu, '/material-receipt'],
            [materialReceiptLabel(materialReceipt, dictionary)],
          ]}
        />
        <div className="flex gap-2">
          <MaterialReceiptActions mode="view" materialReceipt={materialReceipt} context={context} />
        </div>
      </div>

      <div className="my-6 divide-y border-t">
        {materialReceipt.date1 != null && (
          <div className="grid grid-cols-3 gap-4 py-4 text-sm lg:grid-cols-4">
            <div className="font-semibold">
              {dictionary.materialReceipt.fields.date1}
            </div>
            <div className="col-span-2 flex items-baseline gap-4 lg:col-span-3">
              <span>{formatDate(materialReceipt.date1, dictionary)}</span>
              <CopyToClipboardButton
                text={formatDate(materialReceipt.date1, dictionary)}
                dictionary={context.dictionary}
              />
            </div>
          </div>
        )}
        {Boolean(materialReceipt.supplier) && (
          <div className="grid grid-cols-3 gap-4 py-4 text-sm lg:grid-cols-4">
            <div className="font-semibold">
              {dictionary.materialReceipt.fields.supplier}
            </div>
            <div className="col-span-2 flex items-baseline gap-4 lg:col-span-3">
              <span>{materialReceipt.supplier}</span>
              <CopyToClipboardButton
                text={materialReceipt.supplier}
                dictionary={context.dictionary}
              />
            </div>
          </div>
        )}
        {materialReceipt.quantity != null && (
          <div className="grid grid-cols-3 gap-4 py-4 text-sm lg:grid-cols-4">
            <div className="font-semibold">
              {dictionary.materialReceipt.fields.quantity}
            </div>
            <div className="col-span-2 flex items-baseline gap-4 lg:col-span-3">
              <span>{materialReceipt.quantity}</span>
              <CopyToClipboardButton
                text={materialReceipt.quantity.toString()}
                dictionary={context.dictionary}
              />
            </div>
          </div>
        )}
        {materialReceipt.price != null && (
          <div className="grid grid-cols-3 gap-4 py-4 text-sm lg:grid-cols-4">
            <div className="font-semibold">
              {dictionary.materialReceipt.fields.price}
            </div>
            <div className="col-span-2 flex items-baseline gap-4 lg:col-span-3">
              <span>
                {formatDecimal(materialReceipt.price?.toString(), context.locale, 2)}
              </span>
              <CopyToClipboardButton
                text={formatDecimal(
                  materialReceipt.price?.toString(),
                  context.locale, 2
                )}
                dictionary={context.dictionary}
              />
            </div>
          </div>
        )}
        {materialReceipt.total != null && (
          <div className="grid grid-cols-3 gap-4 py-4 text-sm lg:grid-cols-4">
            <div className="font-semibold">
              {dictionary.materialReceipt.fields.total}
            </div>
            <div className="col-span-2 flex items-baseline gap-4 lg:col-span-3">
              <span>
                {formatDecimal(materialReceipt.total?.toString(), context.locale, 2)}
              </span>
              <CopyToClipboardButton
                text={formatDecimal(
                  materialReceipt.total?.toString(),
                  context.locale, 2
                )}
                dictionary={context.dictionary}
              />
            </div>
          </div>
        )}
        {materialReceipt.product != null && (
          <div className="grid grid-cols-3 gap-4 py-4 text-sm lg:grid-cols-4">
            <div className="font-semibold">
              {dictionary.materialReceipt.fields.product}
            </div>
            <div className="col-span-2 flex items-baseline gap-4 lg:col-span-3">
              <ProductLink product={materialReceipt.product} context={context} />
              <CopyToClipboardButton
                text={productLabel(materialReceipt.product, context.dictionary)}
                dictionary={context.dictionary}
              />
            </div>
          </div>
        )}

        {materialReceipt.createdByMembership != null && (
          <div className="grid grid-cols-3 gap-4 py-4 text-sm lg:grid-cols-4">
            <div className="font-semibold">
              {dictionary.materialReceipt.fields.createdByMembership}
            </div>
            <div className="col-span-2 flex items-baseline gap-4 lg:col-span-3">
              <MembershipLink
                membership={materialReceipt.createdByMembership}
                context={context}
              />
              <CopyToClipboardButton
                text={membershipLabel(
                  materialReceipt.createdByMembership,
                  context.dictionary,
                )}
                dictionary={context.dictionary}
              />
            </div>
          </div>
        )}

        {materialReceipt.createdAt != null && (
          <div className="grid grid-cols-3 gap-4 py-4 text-sm lg:grid-cols-4">
            <div className="font-semibold">
              {dictionary.materialReceipt.fields.createdAt}
            </div>
            <div className="col-span-2 flex items-baseline gap-4 lg:col-span-3">
              <span>{formatDatetime(materialReceipt.createdAt, dictionary)}</span>
              <CopyToClipboardButton
                text={formatDatetime(materialReceipt.createdAt, dictionary)}
                dictionary={context.dictionary}
              />
            </div>
          </div>
        )}

        {materialReceipt.updatedByMembership != null && (
          <div className="grid grid-cols-3 gap-4 py-4 text-sm lg:grid-cols-4">
            <div className="font-semibold">
              {dictionary.materialReceipt.fields.updatedByMembership}
            </div>
            <div className="col-span-2 flex items-baseline gap-4 lg:col-span-3">
              <MembershipLink
                membership={materialReceipt.updatedByMembership}
                context={context}
              />
              <CopyToClipboardButton
                text={membershipLabel(
                  materialReceipt.updatedByMembership,
                  context.dictionary,
                )}
                dictionary={context.dictionary}
              />
            </div>
          </div>
        )}

        {materialReceipt.updatedAt != null && (
          <div className="grid grid-cols-3 gap-4 py-4 text-sm lg:grid-cols-4">
            <div className="font-semibold">
              {dictionary.materialReceipt.fields.updatedAt}
            </div>
            <div className="col-span-2 flex items-baseline gap-4 lg:col-span-3">
              <span>{formatDatetime(materialReceipt.updatedAt, dictionary)}</span>
              <CopyToClipboardButton
                text={formatDatetime(materialReceipt.updatedAt, dictionary)}
                dictionary={context.dictionary}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
