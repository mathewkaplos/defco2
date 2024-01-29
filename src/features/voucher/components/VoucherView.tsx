'use client';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { VoucherWithRelationships } from 'src/features/voucher/voucherSchemas';
import { voucherFindApiCall } from 'src/features/voucher/voucherApiCalls';
import { VoucherActions } from 'src/features/voucher/components/VoucherActions';
import { voucherPermissions } from 'src/features/voucher/voucherPermissions';
import Breadcrumb from 'src/shared/components/Breadcrumb';
import { CopyToClipboardButton } from 'src/shared/components/CopyToClipboardButton';
import { toast } from 'src/shared/components/ui/use-toast';
import { AppContext } from 'src/shared/controller/appContext';
import { formatDatetime } from 'src/shared/lib/formatDateTime';
import { formatDate } from 'src/shared/lib/formatDate';
import { formatDecimal } from 'src/shared/lib/formatDecimal';
import { customerLabel } from 'src/features/customer/customerLabel';
import { CustomerLink } from 'src/features/customer/components/CustomerLink';
import { vehicleLabel } from 'src/features/vehicle/vehicleLabel';
import { VehicleLink } from 'src/features/vehicle/components/VehicleLink';
import { voucherLabel } from 'src/features/voucher/voucherLabel';
import { MembershipLink } from 'src/features/membership/components/MembershipLink';
import { membershipLabel } from 'src/features/membership/membershipLabel';

export function VoucherView({
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
    queryKey: ['voucher', id],
    queryFn: async ({ signal }) => {
      return await voucherFindApiCall(id, signal);
    },
    initialData: () =>
      (
        queryClient.getQueryData([
          'voucher',
        ]) as Array<VoucherWithRelationships>
      )?.find((d) => d.id === id),
  });

  const voucher = query.data;

  if (query.isSuccess && !voucher) {
    router.push('/voucher');
    return null;
  }

  if (query.isError) {
    toast({
      description:
        (query.error as any).message || dictionary.shared.errors.unknown,
      variant: 'destructive',
    });
    router.push('/voucher');
    return null;
  }

  if (!voucher) {
    return null;
  }

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex items-center justify-between">
        <Breadcrumb
          items={[
            [dictionary.voucher.list.menu, '/voucher'],
            [voucherLabel(voucher, dictionary)],
          ]}
        />
        <div className="flex gap-2">
          <VoucherActions mode="view" voucher={voucher} context={context} />
        </div>
      </div>

      <div className="my-6 divide-y border-t">
        {voucher.date1 != null && (
          <div className="grid grid-cols-3 gap-4 py-4 text-sm lg:grid-cols-4">
            <div className="font-semibold">
              {dictionary.voucher.fields.date1}
            </div>
            <div className="col-span-2 flex items-baseline gap-4 lg:col-span-3">
              <span>{formatDate(voucher.date1, dictionary)}</span>
              <CopyToClipboardButton
                text={formatDate(voucher.date1, dictionary)}
                dictionary={context.dictionary}
              />
            </div>
          </div>
        )}
        {Boolean(voucher.voucherNo) && (
          <div className="grid grid-cols-3 gap-4 py-4 text-sm lg:grid-cols-4">
            <div className="font-semibold">
              {dictionary.voucher.fields.voucherNo}
            </div>
            <div className="col-span-2 flex items-baseline gap-4 lg:col-span-3">
              <span>{voucher.voucherNo}</span>
              <CopyToClipboardButton
                text={voucher.voucherNo}
                dictionary={context.dictionary}
              />
            </div>
          </div>
        )}
        {Boolean(voucher.indentNo) && (
          <div className="grid grid-cols-3 gap-4 py-4 text-sm lg:grid-cols-4">
            <div className="font-semibold">
              {dictionary.voucher.fields.indentNo}
            </div>
            <div className="col-span-2 flex items-baseline gap-4 lg:col-span-3">
              <span>{voucher.indentNo}</span>
              <CopyToClipboardButton
                text={voucher.indentNo}
                dictionary={context.dictionary}
              />
            </div>
          </div>
        )}
        {Boolean(voucher.approvedBy) && (
          <div className="grid grid-cols-3 gap-4 py-4 text-sm lg:grid-cols-4">
            <div className="font-semibold">
              {dictionary.voucher.fields.approvedBy}
            </div>
            <div className="col-span-2 flex items-baseline gap-4 lg:col-span-3">
              <span>{voucher.approvedBy}</span>
              <CopyToClipboardButton
                text={voucher.approvedBy}
                dictionary={context.dictionary}
              />
            </div>
          </div>
        )}
        {voucher.qty != null && (
          <div className="grid grid-cols-3 gap-4 py-4 text-sm lg:grid-cols-4">
            <div className="font-semibold">
              {dictionary.voucher.fields.qty}
            </div>
            <div className="col-span-2 flex items-baseline gap-4 lg:col-span-3">
              <span>
                {formatDecimal(voucher.qty?.toString(), context.locale, 2)}
              </span>
              <CopyToClipboardButton
                text={formatDecimal(
                  voucher.qty?.toString(),
                  context.locale, 2
                )}
                dictionary={context.dictionary}
              />
            </div>
          </div>
        )}
        {voucher.amount != null && (
          <div className="grid grid-cols-3 gap-4 py-4 text-sm lg:grid-cols-4">
            <div className="font-semibold">
              {dictionary.voucher.fields.amount}
            </div>
            <div className="col-span-2 flex items-baseline gap-4 lg:col-span-3">
              <span>
                {formatDecimal(voucher.amount?.toString(), context.locale, 2)}
              </span>
              <CopyToClipboardButton
                text={formatDecimal(
                  voucher.amount?.toString(),
                  context.locale, 2
                )}
                dictionary={context.dictionary}
              />
            </div>
          </div>
        )}
        {voucher.customer != null && (
          <div className="grid grid-cols-3 gap-4 py-4 text-sm lg:grid-cols-4">
            <div className="font-semibold">
              {dictionary.voucher.fields.customer}
            </div>
            <div className="col-span-2 flex items-baseline gap-4 lg:col-span-3">
              <CustomerLink customer={voucher.customer} context={context} />
              <CopyToClipboardButton
                text={customerLabel(voucher.customer, context.dictionary)}
                dictionary={context.dictionary}
              />
            </div>
          </div>
        )}
        {voucher.vehicle != null && (
          <div className="grid grid-cols-3 gap-4 py-4 text-sm lg:grid-cols-4">
            <div className="font-semibold">
              {dictionary.voucher.fields.vehicle}
            </div>
            <div className="col-span-2 flex items-baseline gap-4 lg:col-span-3">
              <VehicleLink vehicle={voucher.vehicle} context={context} />
              <CopyToClipboardButton
                text={vehicleLabel(voucher.vehicle, context.dictionary)}
                dictionary={context.dictionary}
              />
            </div>
          </div>
        )}

        {voucher.createdByMembership != null && (
          <div className="grid grid-cols-3 gap-4 py-4 text-sm lg:grid-cols-4">
            <div className="font-semibold">
              {dictionary.voucher.fields.createdByMembership}
            </div>
            <div className="col-span-2 flex items-baseline gap-4 lg:col-span-3">
              <MembershipLink
                membership={voucher.createdByMembership}
                context={context}
              />
              <CopyToClipboardButton
                text={membershipLabel(
                  voucher.createdByMembership,
                  context.dictionary,
                )}
                dictionary={context.dictionary}
              />
            </div>
          </div>
        )}

        {voucher.createdAt != null && (
          <div className="grid grid-cols-3 gap-4 py-4 text-sm lg:grid-cols-4">
            <div className="font-semibold">
              {dictionary.voucher.fields.createdAt}
            </div>
            <div className="col-span-2 flex items-baseline gap-4 lg:col-span-3">
              <span>{formatDatetime(voucher.createdAt, dictionary)}</span>
              <CopyToClipboardButton
                text={formatDatetime(voucher.createdAt, dictionary)}
                dictionary={context.dictionary}
              />
            </div>
          </div>
        )}

        {voucher.updatedByMembership != null && (
          <div className="grid grid-cols-3 gap-4 py-4 text-sm lg:grid-cols-4">
            <div className="font-semibold">
              {dictionary.voucher.fields.updatedByMembership}
            </div>
            <div className="col-span-2 flex items-baseline gap-4 lg:col-span-3">
              <MembershipLink
                membership={voucher.updatedByMembership}
                context={context}
              />
              <CopyToClipboardButton
                text={membershipLabel(
                  voucher.updatedByMembership,
                  context.dictionary,
                )}
                dictionary={context.dictionary}
              />
            </div>
          </div>
        )}

        {voucher.updatedAt != null && (
          <div className="grid grid-cols-3 gap-4 py-4 text-sm lg:grid-cols-4">
            <div className="font-semibold">
              {dictionary.voucher.fields.updatedAt}
            </div>
            <div className="col-span-2 flex items-baseline gap-4 lg:col-span-3">
              <span>{formatDatetime(voucher.updatedAt, dictionary)}</span>
              <CopyToClipboardButton
                text={formatDatetime(voucher.updatedAt, dictionary)}
                dictionary={context.dictionary}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
