'use client';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { VehicleWithRelationships } from 'src/features/vehicle/vehicleSchemas';
import { vehicleFindApiCall } from 'src/features/vehicle/vehicleApiCalls';
import { VehicleActions } from 'src/features/vehicle/components/VehicleActions';
import { vehiclePermissions } from 'src/features/vehicle/vehiclePermissions';
import Breadcrumb from 'src/shared/components/Breadcrumb';
import { CopyToClipboardButton } from 'src/shared/components/CopyToClipboardButton';
import { toast } from 'src/shared/components/ui/use-toast';
import { AppContext } from 'src/shared/controller/appContext';
import { formatDatetime } from 'src/shared/lib/formatDateTime';
import { customerLabel } from 'src/features/customer/customerLabel';
import { CustomerLink } from 'src/features/customer/components/CustomerLink';
import { membershipLabel } from 'src/features/membership/membershipLabel';
import { MembershipLink } from 'src/features/membership/components/MembershipLink';
import { voucherLabel } from 'src/features/voucher/voucherLabel';
import { VoucherLink } from 'src/features/voucher/components/VoucherLink';
import { vehicleLabel } from 'src/features/vehicle/vehicleLabel';

export function VehicleView({
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
    queryKey: ['vehicle', id],
    queryFn: async ({ signal }) => {
      return await vehicleFindApiCall(id, signal);
    },
    initialData: () =>
      (
        queryClient.getQueryData([
          'vehicle',
        ]) as Array<VehicleWithRelationships>
      )?.find((d) => d.id === id),
  });

  const vehicle = query.data;

  if (query.isSuccess && !vehicle) {
    router.push('/vehicle');
    return null;
  }

  if (query.isError) {
    toast({
      description:
        (query.error as any).message || dictionary.shared.errors.unknown,
      variant: 'destructive',
    });
    router.push('/vehicle');
    return null;
  }

  if (!vehicle) {
    return null;
  }

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex items-center justify-between">
        <Breadcrumb
          items={[
            [dictionary.vehicle.list.menu, '/vehicle'],
            [vehicleLabel(vehicle, dictionary)],
          ]}
        />
        <div className="flex gap-2">
          <VehicleActions mode="view" vehicle={vehicle} context={context} />
        </div>
      </div>

      <div className="my-6 divide-y border-t">
        {Boolean(vehicle.make) && (
          <div className="grid grid-cols-3 gap-4 py-4 text-sm lg:grid-cols-4">
            <div className="font-semibold">
              {dictionary.vehicle.fields.make}
            </div>
            <div className="col-span-2 flex items-baseline gap-4 lg:col-span-3">
              <span>{vehicle.make}</span>
              <CopyToClipboardButton
                text={vehicle.make}
                dictionary={context.dictionary}
              />
            </div>
          </div>
        )}
        {Boolean(vehicle.regNo) && (
          <div className="grid grid-cols-3 gap-4 py-4 text-sm lg:grid-cols-4">
            <div className="font-semibold">
              {dictionary.vehicle.fields.regNo}
            </div>
            <div className="col-span-2 flex items-baseline gap-4 lg:col-span-3">
              <span>{vehicle.regNo}</span>
              <CopyToClipboardButton
                text={vehicle.regNo}
                dictionary={context.dictionary}
              />
            </div>
          </div>
        )}
        {vehicle.cc != null && (
          <div className="grid grid-cols-3 gap-4 py-4 text-sm lg:grid-cols-4">
            <div className="font-semibold">
              {dictionary.vehicle.fields.cc}
            </div>
            <div className="col-span-2 flex items-baseline gap-4 lg:col-span-3">
              <span>{vehicle.cc}</span>
              <CopyToClipboardButton
                text={vehicle.cc.toString()}
                dictionary={context.dictionary}
              />
            </div>
          </div>
        )}
        {vehicle.fullTank != null && (
          <div className="grid grid-cols-3 gap-4 py-4 text-sm lg:grid-cols-4">
            <div className="font-semibold">
              {dictionary.vehicle.fields.fullTank}
            </div>
            <div className="col-span-2 flex items-baseline gap-4 lg:col-span-3">
              <span>{vehicle.fullTank}</span>
              <CopyToClipboardButton
                text={vehicle.fullTank.toString()}
                dictionary={context.dictionary}
              />
            </div>
          </div>
        )}
        {vehicle.approved != null && (
          <div className="grid grid-cols-3 gap-4 py-4 text-sm lg:grid-cols-4">
            <div className="font-semibold">
              {dictionary.vehicle.fields.approved}
            </div>
            <div className="col-span-2 flex items-baseline gap-4 lg:col-span-3">
              <span>
                {vehicle.approved
                  ? dictionary.shared.yes
                  : dictionary.shared.no}
              </span>
              <CopyToClipboardButton
                text={
                  vehicle.approved
                    ? dictionary.shared.yes
                    : dictionary.shared.no
                }
                dictionary={context.dictionary}
              />
            </div>
          </div>
        )}
        {vehicle.customer != null && (
          <div className="grid grid-cols-3 gap-4 py-4 text-sm lg:grid-cols-4">
            <div className="font-semibold">
              {dictionary.vehicle.fields.customer}
            </div>
            <div className="col-span-2 flex items-baseline gap-4 lg:col-span-3">
              <CustomerLink customer={vehicle.customer} context={context} />
              <CopyToClipboardButton
                text={customerLabel(vehicle.customer, context.dictionary)}
                dictionary={context.dictionary}
              />
            </div>
          </div>
        )}
        {vehicle.approvedBy != null && (
          <div className="grid grid-cols-3 gap-4 py-4 text-sm lg:grid-cols-4">
            <div className="font-semibold">
              {dictionary.vehicle.fields.approvedBy}
            </div>
            <div className="col-span-2 flex items-baseline gap-4 lg:col-span-3">
              <MembershipLink membership={vehicle.approvedBy} context={context} />
              <CopyToClipboardButton
                text={membershipLabel(vehicle.approvedBy, context.dictionary)}
                dictionary={context.dictionary}
              />
            </div>
          </div>
        )}
        {vehicle.vouchers?.length ? (<div className="grid grid-cols-3 gap-4 py-4 text-sm lg:grid-cols-4">
          <div className="font-semibold">
            {dictionary.vehicle.fields.vouchers}
          </div>
          <div className="col-span-2 flex flex-col gap-1">
            {vehicle.vouchers?.map((item) => {
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

        {vehicle.createdByMembership != null && (
          <div className="grid grid-cols-3 gap-4 py-4 text-sm lg:grid-cols-4">
            <div className="font-semibold">
              {dictionary.vehicle.fields.createdByMembership}
            </div>
            <div className="col-span-2 flex items-baseline gap-4 lg:col-span-3">
              <MembershipLink
                membership={vehicle.createdByMembership}
                context={context}
              />
              <CopyToClipboardButton
                text={membershipLabel(
                  vehicle.createdByMembership,
                  context.dictionary,
                )}
                dictionary={context.dictionary}
              />
            </div>
          </div>
        )}

        {vehicle.createdAt != null && (
          <div className="grid grid-cols-3 gap-4 py-4 text-sm lg:grid-cols-4">
            <div className="font-semibold">
              {dictionary.vehicle.fields.createdAt}
            </div>
            <div className="col-span-2 flex items-baseline gap-4 lg:col-span-3">
              <span>{formatDatetime(vehicle.createdAt, dictionary)}</span>
              <CopyToClipboardButton
                text={formatDatetime(vehicle.createdAt, dictionary)}
                dictionary={context.dictionary}
              />
            </div>
          </div>
        )}

        {vehicle.updatedByMembership != null && (
          <div className="grid grid-cols-3 gap-4 py-4 text-sm lg:grid-cols-4">
            <div className="font-semibold">
              {dictionary.vehicle.fields.updatedByMembership}
            </div>
            <div className="col-span-2 flex items-baseline gap-4 lg:col-span-3">
              <MembershipLink
                membership={vehicle.updatedByMembership}
                context={context}
              />
              <CopyToClipboardButton
                text={membershipLabel(
                  vehicle.updatedByMembership,
                  context.dictionary,
                )}
                dictionary={context.dictionary}
              />
            </div>
          </div>
        )}

        {vehicle.updatedAt != null && (
          <div className="grid grid-cols-3 gap-4 py-4 text-sm lg:grid-cols-4">
            <div className="font-semibold">
              {dictionary.vehicle.fields.updatedAt}
            </div>
            <div className="col-span-2 flex items-baseline gap-4 lg:col-span-3">
              <span>{formatDatetime(vehicle.updatedAt, dictionary)}</span>
              <CopyToClipboardButton
                text={formatDatetime(vehicle.updatedAt, dictionary)}
                dictionary={context.dictionary}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
