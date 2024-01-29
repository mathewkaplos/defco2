'use client';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { ProductWithRelationships } from 'src/features/product/productSchemas';
import { productFindApiCall } from 'src/features/product/productApiCalls';
import { ProductActions } from 'src/features/product/components/ProductActions';
import { productPermissions } from 'src/features/product/productPermissions';
import Breadcrumb from 'src/shared/components/Breadcrumb';
import { CopyToClipboardButton } from 'src/shared/components/CopyToClipboardButton';
import { toast } from 'src/shared/components/ui/use-toast';
import { AppContext } from 'src/shared/controller/appContext';
import { formatDatetime } from 'src/shared/lib/formatDateTime';
import { formatDecimal } from 'src/shared/lib/formatDecimal';
import { materialReceiptLabel } from 'src/features/materialReceipt/materialReceiptLabel';
import { MaterialReceiptLink } from 'src/features/materialReceipt/components/MaterialReceiptLink';
import { productLabel } from 'src/features/product/productLabel';
import { MembershipLink } from 'src/features/membership/components/MembershipLink';
import { membershipLabel } from 'src/features/membership/membershipLabel';

export function ProductView({
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
    queryKey: ['product', id],
    queryFn: async ({ signal }) => {
      return await productFindApiCall(id, signal);
    },
    initialData: () =>
      (
        queryClient.getQueryData([
          'product',
        ]) as Array<ProductWithRelationships>
      )?.find((d) => d.id === id),
  });

  const product = query.data;

  if (query.isSuccess && !product) {
    router.push('/product');
    return null;
  }

  if (query.isError) {
    toast({
      description:
        (query.error as any).message || dictionary.shared.errors.unknown,
      variant: 'destructive',
    });
    router.push('/product');
    return null;
  }

  if (!product) {
    return null;
  }

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex items-center justify-between">
        <Breadcrumb
          items={[
            [dictionary.product.list.menu, '/product'],
            [productLabel(product, dictionary)],
          ]}
        />
        <div className="flex gap-2">
          <ProductActions mode="view" product={product} context={context} />
        </div>
      </div>

      <div className="my-6 divide-y border-t">
        {Boolean(product.name) && (
          <div className="grid grid-cols-3 gap-4 py-4 text-sm lg:grid-cols-4">
            <div className="font-semibold">
              {dictionary.product.fields.name}
            </div>
            <div className="col-span-2 flex items-baseline gap-4 lg:col-span-3">
              <span>{product.name}</span>
              <CopyToClipboardButton
                text={product.name}
                dictionary={context.dictionary}
              />
            </div>
          </div>
        )}
        {product.price != null && (
          <div className="grid grid-cols-3 gap-4 py-4 text-sm lg:grid-cols-4">
            <div className="font-semibold">
              {dictionary.product.fields.price}
            </div>
            <div className="col-span-2 flex items-baseline gap-4 lg:col-span-3">
              <span>
                {formatDecimal(product.price?.toString(), context.locale)}
              </span>
              <CopyToClipboardButton
                text={formatDecimal(
                  product.price?.toString(),
                  context.locale
                )}
                dictionary={context.dictionary}
              />
            </div>
          </div>
        )}
        {product.receipts?.length ? (<div className="grid grid-cols-3 gap-4 py-4 text-sm lg:grid-cols-4">
          <div className="font-semibold">
            {dictionary.product.fields.receipts}
          </div>
          <div className="col-span-2 flex flex-col gap-1">
            {product.receipts?.map((item) => {
              return (
                <div key={item?.id} className="flex items-center gap-4">
                  <MaterialReceiptLink
                    materialReceipt={item}
                    context={context}
                    className="whitespace-nowrap"
                  />
                  <CopyToClipboardButton
                    text={materialReceiptLabel(item, context.dictionary)}
                    dictionary={context.dictionary}
                  />
                </div>
              );
            })}
          </div>
        </div>): null}

        {product.createdByMembership != null && (
          <div className="grid grid-cols-3 gap-4 py-4 text-sm lg:grid-cols-4">
            <div className="font-semibold">
              {dictionary.product.fields.createdByMembership}
            </div>
            <div className="col-span-2 flex items-baseline gap-4 lg:col-span-3">
              <MembershipLink
                membership={product.createdByMembership}
                context={context}
              />
              <CopyToClipboardButton
                text={membershipLabel(
                  product.createdByMembership,
                  context.dictionary,
                )}
                dictionary={context.dictionary}
              />
            </div>
          </div>
        )}

        {product.createdAt != null && (
          <div className="grid grid-cols-3 gap-4 py-4 text-sm lg:grid-cols-4">
            <div className="font-semibold">
              {dictionary.product.fields.createdAt}
            </div>
            <div className="col-span-2 flex items-baseline gap-4 lg:col-span-3">
              <span>{formatDatetime(product.createdAt, dictionary)}</span>
              <CopyToClipboardButton
                text={formatDatetime(product.createdAt, dictionary)}
                dictionary={context.dictionary}
              />
            </div>
          </div>
        )}

        {product.updatedByMembership != null && (
          <div className="grid grid-cols-3 gap-4 py-4 text-sm lg:grid-cols-4">
            <div className="font-semibold">
              {dictionary.product.fields.updatedByMembership}
            </div>
            <div className="col-span-2 flex items-baseline gap-4 lg:col-span-3">
              <MembershipLink
                membership={product.updatedByMembership}
                context={context}
              />
              <CopyToClipboardButton
                text={membershipLabel(
                  product.updatedByMembership,
                  context.dictionary,
                )}
                dictionary={context.dictionary}
              />
            </div>
          </div>
        )}

        {product.updatedAt != null && (
          <div className="grid grid-cols-3 gap-4 py-4 text-sm lg:grid-cols-4">
            <div className="font-semibold">
              {dictionary.product.fields.updatedAt}
            </div>
            <div className="col-span-2 flex items-baseline gap-4 lg:col-span-3">
              <span>{formatDatetime(product.updatedAt, dictionary)}</span>
              <CopyToClipboardButton
                text={formatDatetime(product.updatedAt, dictionary)}
                dictionary={context.dictionary}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
