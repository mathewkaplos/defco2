'use client';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { CustomerWithRelationships } from 'src/features/customer/customerSchemas';
import { customerFindApiCall } from 'src/features/customer/customerApiCalls';
import { CustomerActions } from 'src/features/customer/components/CustomerActions';
import { customerPermissions } from 'src/features/customer/customerPermissions';
import Breadcrumb from 'src/shared/components/Breadcrumb';
import { CopyToClipboardButton } from 'src/shared/components/CopyToClipboardButton';
import { toast } from 'src/shared/components/ui/use-toast';
import { AppContext } from 'src/shared/controller/appContext';
import { formatDatetime } from 'src/shared/lib/formatDateTime';
import { enumeratorLabel } from 'src/shared/lib/enumeratorLabel';
import { rankLabel } from 'src/features/rank/rankLabel';
import { RankLink } from 'src/features/rank/components/RankLink';
import { vehicleLabel } from 'src/features/vehicle/vehicleLabel';
import { VehicleLink } from 'src/features/vehicle/components/VehicleLink';
import { saleLabel } from 'src/features/sale/saleLabel';
import { SaleLink } from 'src/features/sale/components/SaleLink';
import { cardLabel } from 'src/features/card/cardLabel';
import { CardLink } from 'src/features/card/components/CardLink';
import { voucherLabel } from 'src/features/voucher/voucherLabel';
import { VoucherLink } from 'src/features/voucher/components/VoucherLink';
import { customerLabel } from 'src/features/customer/customerLabel';
import { MembershipLink } from 'src/features/membership/components/MembershipLink';
import { membershipLabel } from 'src/features/membership/membershipLabel';

export function CustomerView({
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
    queryKey: ['customer', id],
    queryFn: async ({ signal }) => {
      return await customerFindApiCall(id, signal);
    },
    initialData: () =>
      (
        queryClient.getQueryData([
          'customer',
        ]) as Array<CustomerWithRelationships>
      )?.find((d) => d.id === id),
  });

  const customer = query.data;

  if (query.isSuccess && !customer) {
    router.push('/customer');
    return null;
  }

  if (query.isError) {
    toast({
      description:
        (query.error as any).message || dictionary.shared.errors.unknown,
      variant: 'destructive',
    });
    router.push('/customer');
    return null;
  }

  if (!customer) {
    return null;
  }

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex items-center justify-between">
        <Breadcrumb
          items={[
            [dictionary.customer.list.menu, '/customer'],
            [customerLabel(customer, dictionary)],
          ]}
        />
        <div className="flex gap-2">
          <CustomerActions mode="view" customer={customer} context={context} />
        </div>
      </div>

      <div className="my-6 divide-y border-t">
        {Boolean(customer.firstName) && (
          <div className="grid grid-cols-3 gap-4 py-4 text-sm lg:grid-cols-4">
            <div className="font-semibold">
              {dictionary.customer.fields.firstName}
            </div>
            <div className="col-span-2 flex items-baseline gap-4 lg:col-span-3">
              <span>{customer.firstName}</span>
              <CopyToClipboardButton
                text={customer.firstName}
                dictionary={context.dictionary}
              />
            </div>
          </div>
        )}
        {Boolean(customer.lastName) && (
          <div className="grid grid-cols-3 gap-4 py-4 text-sm lg:grid-cols-4">
            <div className="font-semibold">
              {dictionary.customer.fields.lastName}
            </div>
            <div className="col-span-2 flex items-baseline gap-4 lg:col-span-3">
              <span>{customer.lastName}</span>
              <CopyToClipboardButton
                text={customer.lastName}
                dictionary={context.dictionary}
              />
            </div>
          </div>
        )}
        {Boolean(customer.otherNames) && (
          <div className="grid grid-cols-3 gap-4 py-4 text-sm lg:grid-cols-4">
            <div className="font-semibold">
              {dictionary.customer.fields.otherNames}
            </div>
            <div className="col-span-2 flex items-baseline gap-4 lg:col-span-3">
              <span>{customer.otherNames}</span>
              <CopyToClipboardButton
                text={customer.otherNames}
                dictionary={context.dictionary}
              />
            </div>
          </div>
        )}
        {customer.gender != null && (
          <div className="grid grid-cols-3 gap-4 py-4 text-sm lg:grid-cols-4">
            <div className="font-semibold">
              {dictionary.customer.fields.gender}
            </div>
            <div className="col-span-2 flex items-baseline gap-4 lg:col-span-3">
              <span>
                {enumeratorLabel(
                  dictionary.customer.enumerators.gender,
                  customer.gender,
                )}
              </span>
              <CopyToClipboardButton
                text={enumeratorLabel(
                  dictionary.customer.enumerators.gender,
                  customer.gender,
                )}
                dictionary={context.dictionary}
              />
            </div>
          </div>
        )}
        {Boolean(customer.serviceNo) && (
          <div className="grid grid-cols-3 gap-4 py-4 text-sm lg:grid-cols-4">
            <div className="font-semibold">
              {dictionary.customer.fields.serviceNo}
            </div>
            <div className="col-span-2 flex items-baseline gap-4 lg:col-span-3">
              <span>{customer.serviceNo}</span>
              <CopyToClipboardButton
                text={customer.serviceNo}
                dictionary={context.dictionary}
              />
            </div>
          </div>
        )}
        {customer.entitledCards != null && (
          <div className="grid grid-cols-3 gap-4 py-4 text-sm lg:grid-cols-4">
            <div className="font-semibold">
              {dictionary.customer.fields.entitledCards}
            </div>
            <div className="col-span-2 flex items-baseline gap-4 lg:col-span-3">
              <span>{customer.entitledCards}</span>
              <CopyToClipboardButton
                text={customer.entitledCards.toString()}
                dictionary={context.dictionary}
              />
            </div>
          </div>
        )}
        {customer.status != null && (
          <div className="grid grid-cols-3 gap-4 py-4 text-sm lg:grid-cols-4">
            <div className="font-semibold">
              {dictionary.customer.fields.status}
            </div>
            <div className="col-span-2 flex items-baseline gap-4 lg:col-span-3">
              <span>
                {enumeratorLabel(
                  dictionary.customer.enumerators.status,
                  customer.status,
                )}
              </span>
              <CopyToClipboardButton
                text={enumeratorLabel(
                  dictionary.customer.enumerators.status,
                  customer.status,
                )}
                dictionary={context.dictionary}
              />
            </div>
          </div>
        )}
        {customer.rank != null && (
          <div className="grid grid-cols-3 gap-4 py-4 text-sm lg:grid-cols-4">
            <div className="font-semibold">
              {dictionary.customer.fields.rank}
            </div>
            <div className="col-span-2 flex items-baseline gap-4 lg:col-span-3">
              <RankLink rank={customer.rank} context={context} />
              <CopyToClipboardButton
                text={rankLabel(customer.rank, context.dictionary)}
                dictionary={context.dictionary}
              />
            </div>
          </div>
        )}
        {customer.vehicles?.length ? (<div className="grid grid-cols-3 gap-4 py-4 text-sm lg:grid-cols-4">
          <div className="font-semibold">
            {dictionary.customer.fields.vehicles}
          </div>
          <div className="col-span-2 flex flex-col gap-1">
            {customer.vehicles?.map((item) => {
              return (
                <div key={item?.id} className="flex items-center gap-4">
                  <VehicleLink
                    vehicle={item}
                    context={context}
                    className="whitespace-nowrap"
                  />
                  <CopyToClipboardButton
                    text={vehicleLabel(item, context.dictionary)}
                    dictionary={context.dictionary}
                  />
                </div>
              );
            })}
          </div>
        </div>): null}
        {customer.sales?.length ? (<div className="grid grid-cols-3 gap-4 py-4 text-sm lg:grid-cols-4">
          <div className="font-semibold">
            {dictionary.customer.fields.sales}
          </div>
          <div className="col-span-2 flex flex-col gap-1">
            {customer.sales?.map((item) => {
              return (
                <div key={item?.id} className="flex items-center gap-4">
                  <SaleLink
                    sale={item}
                    context={context}
                    className="whitespace-nowrap"
                  />
                  <CopyToClipboardButton
                    text={saleLabel(item, context.dictionary)}
                    dictionary={context.dictionary}
                  />
                </div>
              );
            })}
          </div>
        </div>): null}
        {customer.cards?.length ? (<div className="grid grid-cols-3 gap-4 py-4 text-sm lg:grid-cols-4">
          <div className="font-semibold">
            {dictionary.customer.fields.cards}
          </div>
          <div className="col-span-2 flex flex-col gap-1">
            {customer.cards?.map((item) => {
              return (
                <div key={item?.id} className="flex items-center gap-4">
                  <CardLink
                    card={item}
                    context={context}
                    className="whitespace-nowrap"
                  />
                  <CopyToClipboardButton
                    text={cardLabel(item, context.dictionary)}
                    dictionary={context.dictionary}
                  />
                </div>
              );
            })}
          </div>
        </div>): null}
        {customer.vouchers?.length ? (<div className="grid grid-cols-3 gap-4 py-4 text-sm lg:grid-cols-4">
          <div className="font-semibold">
            {dictionary.customer.fields.vouchers}
          </div>
          <div className="col-span-2 flex flex-col gap-1">
            {customer.vouchers?.map((item) => {
              return (
                <div key={item?.id} className="flex items-center gap-4">
                  <VoucherLink
                    voucher={item}
                    context={context}
                    className="whitespace-nowrap"
                  />
                  <CopyToClipboardButton
                    text={voucherLabel(item, context.dictionary)}
                    dictionary={context.dictionary}
                  />
                </div>
              );
            })}
          </div>
        </div>): null}

        {customer.createdByMembership != null && (
          <div className="grid grid-cols-3 gap-4 py-4 text-sm lg:grid-cols-4">
            <div className="font-semibold">
              {dictionary.customer.fields.createdByMembership}
            </div>
            <div className="col-span-2 flex items-baseline gap-4 lg:col-span-3">
              <MembershipLink
                membership={customer.createdByMembership}
                context={context}
              />
              <CopyToClipboardButton
                text={membershipLabel(
                  customer.createdByMembership,
                  context.dictionary,
                )}
                dictionary={context.dictionary}
              />
            </div>
          </div>
        )}

        {customer.createdAt != null && (
          <div className="grid grid-cols-3 gap-4 py-4 text-sm lg:grid-cols-4">
            <div className="font-semibold">
              {dictionary.customer.fields.createdAt}
            </div>
            <div className="col-span-2 flex items-baseline gap-4 lg:col-span-3">
              <span>{formatDatetime(customer.createdAt, dictionary)}</span>
              <CopyToClipboardButton
                text={formatDatetime(customer.createdAt, dictionary)}
                dictionary={context.dictionary}
              />
            </div>
          </div>
        )}

        {customer.updatedByMembership != null && (
          <div className="grid grid-cols-3 gap-4 py-4 text-sm lg:grid-cols-4">
            <div className="font-semibold">
              {dictionary.customer.fields.updatedByMembership}
            </div>
            <div className="col-span-2 flex items-baseline gap-4 lg:col-span-3">
              <MembershipLink
                membership={customer.updatedByMembership}
                context={context}
              />
              <CopyToClipboardButton
                text={membershipLabel(
                  customer.updatedByMembership,
                  context.dictionary,
                )}
                dictionary={context.dictionary}
              />
            </div>
          </div>
        )}

        {customer.updatedAt != null && (
          <div className="grid grid-cols-3 gap-4 py-4 text-sm lg:grid-cols-4">
            <div className="font-semibold">
              {dictionary.customer.fields.updatedAt}
            </div>
            <div className="col-span-2 flex items-baseline gap-4 lg:col-span-3">
              <span>{formatDatetime(customer.updatedAt, dictionary)}</span>
              <CopyToClipboardButton
                text={formatDatetime(customer.updatedAt, dictionary)}
                dictionary={context.dictionary}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
