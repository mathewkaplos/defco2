'use client';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { SaleWithRelationships } from 'src/features/sale/saleSchemas';
import { saleFindApiCall } from 'src/features/sale/saleApiCalls';
import { SaleActions } from 'src/features/sale/components/SaleActions';
import { salePermissions } from 'src/features/sale/salePermissions';
import Breadcrumb from 'src/shared/components/Breadcrumb';
import { CopyToClipboardButton } from 'src/shared/components/CopyToClipboardButton';
import { toast } from 'src/shared/components/ui/use-toast';
import { AppContext } from 'src/shared/controller/appContext';
import { formatDatetime } from 'src/shared/lib/formatDateTime';
import { enumeratorLabel } from 'src/shared/lib/enumeratorLabel';
import { formatDecimal } from 'src/shared/lib/formatDecimal';
import { customerLabel } from 'src/features/customer/customerLabel';
import { CustomerLink } from 'src/features/customer/components/CustomerLink';
import { stationLabel } from 'src/features/station/stationLabel';
import { StationLink } from 'src/features/station/components/StationLink';
import { saleLabel } from 'src/features/sale/saleLabel';
import { MembershipLink } from 'src/features/membership/components/MembershipLink';
import { membershipLabel } from 'src/features/membership/membershipLabel';

export function SaleView({
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
    queryKey: ['sale', id],
    queryFn: async ({ signal }) => {
      return await saleFindApiCall(id, signal);
    },
    initialData: () =>
      (
        queryClient.getQueryData([
          'sale',
        ]) as Array<SaleWithRelationships>
      )?.find((d) => d.id === id),
  });

  const sale = query.data;

  if (query.isSuccess && !sale) {
    router.push('/sale');
    return null;
  }

  if (query.isError) {
    toast({
      description:
        (query.error as any).message || dictionary.shared.errors.unknown,
      variant: 'destructive',
    });
    router.push('/sale');
    return null;
  }

  if (!sale) {
    return null;
  }

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex items-center justify-between">
        <Breadcrumb
          items={[
            [dictionary.sale.list.menu, '/sale'],
            [saleLabel(sale, dictionary)],
          ]}
        />
        <div className="flex gap-2">
          <SaleActions mode="view" sale={sale} context={context} />
        </div>
      </div>

      <div className="my-6 divide-y border-t">
        {sale.date1 != null && (
          <div className="grid grid-cols-3 gap-4 py-4 text-sm lg:grid-cols-4">
            <div className="font-semibold">
              {dictionary.sale.fields.date1}
            </div>
            <div className="col-span-2 flex items-baseline gap-4 lg:col-span-3">
              <span>
                {formatDatetime(sale.date1, dictionary)}
              </span>
              <CopyToClipboardButton
                text={formatDatetime(sale.date1, dictionary)}
                dictionary={context.dictionary}
              />
            </div>
          </div>
        )}
        {sale.fuelType != null && (
          <div className="grid grid-cols-3 gap-4 py-4 text-sm lg:grid-cols-4">
            <div className="font-semibold">
              {dictionary.sale.fields.fuelType}
            </div>
            <div className="col-span-2 flex items-baseline gap-4 lg:col-span-3">
              <span>
                {enumeratorLabel(
                  dictionary.sale.enumerators.fuelType,
                  sale.fuelType,
                )}
              </span>
              <CopyToClipboardButton
                text={enumeratorLabel(
                  dictionary.sale.enumerators.fuelType,
                  sale.fuelType,
                )}
                dictionary={context.dictionary}
              />
            </div>
          </div>
        )}
        {sale.litres != null && (
          <div className="grid grid-cols-3 gap-4 py-4 text-sm lg:grid-cols-4">
            <div className="font-semibold">
              {dictionary.sale.fields.litres}
            </div>
            <div className="col-span-2 flex items-baseline gap-4 lg:col-span-3">
              <span>
                {formatDecimal(sale.litres?.toString(), context.locale)}
              </span>
              <CopyToClipboardButton
                text={formatDecimal(
                  sale.litres?.toString(),
                  context.locale
                )}
                dictionary={context.dictionary}
              />
            </div>
          </div>
        )}
        {sale.rate != null && (
          <div className="grid grid-cols-3 gap-4 py-4 text-sm lg:grid-cols-4">
            <div className="font-semibold">
              {dictionary.sale.fields.rate}
            </div>
            <div className="col-span-2 flex items-baseline gap-4 lg:col-span-3">
              <span>
                {formatDecimal(sale.rate?.toString(), context.locale)}
              </span>
              <CopyToClipboardButton
                text={formatDecimal(
                  sale.rate?.toString(),
                  context.locale
                )}
                dictionary={context.dictionary}
              />
            </div>
          </div>
        )}
        {sale.total != null && (
          <div className="grid grid-cols-3 gap-4 py-4 text-sm lg:grid-cols-4">
            <div className="font-semibold">
              {dictionary.sale.fields.total}
            </div>
            <div className="col-span-2 flex items-baseline gap-4 lg:col-span-3">
              <span>
                {formatDecimal(sale.total?.toString(), context.locale)}
              </span>
              <CopyToClipboardButton
                text={formatDecimal(
                  sale.total?.toString(),
                  context.locale
                )}
                dictionary={context.dictionary}
              />
            </div>
          </div>
        )}
        {sale.paymode != null && (
          <div className="grid grid-cols-3 gap-4 py-4 text-sm lg:grid-cols-4">
            <div className="font-semibold">
              {dictionary.sale.fields.paymode}
            </div>
            <div className="col-span-2 flex items-baseline gap-4 lg:col-span-3">
              <span>
                {enumeratorLabel(
                  dictionary.sale.enumerators.paymode,
                  sale.paymode,
                )}
              </span>
              <CopyToClipboardButton
                text={enumeratorLabel(
                  dictionary.sale.enumerators.paymode,
                  sale.paymode,
                )}
                dictionary={context.dictionary}
              />
            </div>
          </div>
        )}
        {sale.cashAmount != null && (
          <div className="grid grid-cols-3 gap-4 py-4 text-sm lg:grid-cols-4">
            <div className="font-semibold">
              {dictionary.sale.fields.cashAmount}
            </div>
            <div className="col-span-2 flex items-baseline gap-4 lg:col-span-3">
              <span>
                {formatDecimal(sale.cashAmount?.toString(), context.locale, 2)}
              </span>
              <CopyToClipboardButton
                text={formatDecimal(
                  sale.cashAmount?.toString(),
                  context.locale, 2
                )}
                dictionary={context.dictionary}
              />
            </div>
          </div>
        )}
        {sale.mpesaAmount != null && (
          <div className="grid grid-cols-3 gap-4 py-4 text-sm lg:grid-cols-4">
            <div className="font-semibold">
              {dictionary.sale.fields.mpesaAmount}
            </div>
            <div className="col-span-2 flex items-baseline gap-4 lg:col-span-3">
              <span>
                {formatDecimal(sale.mpesaAmount?.toString(), context.locale, 2)}
              </span>
              <CopyToClipboardButton
                text={formatDecimal(
                  sale.mpesaAmount?.toString(),
                  context.locale, 2
                )}
                dictionary={context.dictionary}
              />
            </div>
          </div>
        )}
        {sale.invoiceAmount != null && (
          <div className="grid grid-cols-3 gap-4 py-4 text-sm lg:grid-cols-4">
            <div className="font-semibold">
              {dictionary.sale.fields.invoiceAmount}
            </div>
            <div className="col-span-2 flex items-baseline gap-4 lg:col-span-3">
              <span>
                {formatDecimal(sale.invoiceAmount?.toString(), context.locale, 2)}
              </span>
              <CopyToClipboardButton
                text={formatDecimal(
                  sale.invoiceAmount?.toString(),
                  context.locale, 2
                )}
                dictionary={context.dictionary}
              />
            </div>
          </div>
        )}
        {sale.customer != null && (
          <div className="grid grid-cols-3 gap-4 py-4 text-sm lg:grid-cols-4">
            <div className="font-semibold">
              {dictionary.sale.fields.customer}
            </div>
            <div className="col-span-2 flex items-baseline gap-4 lg:col-span-3">
              <CustomerLink customer={sale.customer} context={context} />
              <CopyToClipboardButton
                text={customerLabel(sale.customer, context.dictionary)}
                dictionary={context.dictionary}
              />
            </div>
          </div>
        )}
        {sale.station != null && (
          <div className="grid grid-cols-3 gap-4 py-4 text-sm lg:grid-cols-4">
            <div className="font-semibold">
              {dictionary.sale.fields.station}
            </div>
            <div className="col-span-2 flex items-baseline gap-4 lg:col-span-3">
              <StationLink station={sale.station} context={context} />
              <CopyToClipboardButton
                text={stationLabel(sale.station, context.dictionary)}
                dictionary={context.dictionary}
              />
            </div>
          </div>
        )}

        {sale.createdByMembership != null && (
          <div className="grid grid-cols-3 gap-4 py-4 text-sm lg:grid-cols-4">
            <div className="font-semibold">
              {dictionary.sale.fields.createdByMembership}
            </div>
            <div className="col-span-2 flex items-baseline gap-4 lg:col-span-3">
              <MembershipLink
                membership={sale.createdByMembership}
                context={context}
              />
              <CopyToClipboardButton
                text={membershipLabel(
                  sale.createdByMembership,
                  context.dictionary,
                )}
                dictionary={context.dictionary}
              />
            </div>
          </div>
        )}

        {sale.createdAt != null && (
          <div className="grid grid-cols-3 gap-4 py-4 text-sm lg:grid-cols-4">
            <div className="font-semibold">
              {dictionary.sale.fields.createdAt}
            </div>
            <div className="col-span-2 flex items-baseline gap-4 lg:col-span-3">
              <span>{formatDatetime(sale.createdAt, dictionary)}</span>
              <CopyToClipboardButton
                text={formatDatetime(sale.createdAt, dictionary)}
                dictionary={context.dictionary}
              />
            </div>
          </div>
        )}

        {sale.updatedByMembership != null && (
          <div className="grid grid-cols-3 gap-4 py-4 text-sm lg:grid-cols-4">
            <div className="font-semibold">
              {dictionary.sale.fields.updatedByMembership}
            </div>
            <div className="col-span-2 flex items-baseline gap-4 lg:col-span-3">
              <MembershipLink
                membership={sale.updatedByMembership}
                context={context}
              />
              <CopyToClipboardButton
                text={membershipLabel(
                  sale.updatedByMembership,
                  context.dictionary,
                )}
                dictionary={context.dictionary}
              />
            </div>
          </div>
        )}

        {sale.updatedAt != null && (
          <div className="grid grid-cols-3 gap-4 py-4 text-sm lg:grid-cols-4">
            <div className="font-semibold">
              {dictionary.sale.fields.updatedAt}
            </div>
            <div className="col-span-2 flex items-baseline gap-4 lg:col-span-3">
              <span>{formatDatetime(sale.updatedAt, dictionary)}</span>
              <CopyToClipboardButton
                text={formatDatetime(sale.updatedAt, dictionary)}
                dictionary={context.dictionary}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
