'use client';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { StationWithRelationships } from 'src/features/station/stationSchemas';
import { stationFindApiCall } from 'src/features/station/stationApiCalls';
import { StationActions } from 'src/features/station/components/StationActions';
import { stationPermissions } from 'src/features/station/stationPermissions';
import Breadcrumb from 'src/shared/components/Breadcrumb';
import { CopyToClipboardButton } from 'src/shared/components/CopyToClipboardButton';
import { toast } from 'src/shared/components/ui/use-toast';
import { AppContext } from 'src/shared/controller/appContext';
import { formatDatetime } from 'src/shared/lib/formatDateTime';
import { membershipLabel } from 'src/features/membership/membershipLabel';
import { MembershipLink } from 'src/features/membership/components/MembershipLink';
import { dispenserLabel } from 'src/features/dispenser/dispenserLabel';
import { DispenserLink } from 'src/features/dispenser/components/DispenserLink';
import { tankLabel } from 'src/features/tank/tankLabel';
import { TankLink } from 'src/features/tank/components/TankLink';
import { saleLabel } from 'src/features/sale/saleLabel';
import { SaleLink } from 'src/features/sale/components/SaleLink';
import { deviceLabel } from 'src/features/device/deviceLabel';
import { DeviceLink } from 'src/features/device/components/DeviceLink';
import { stationLabel } from 'src/features/station/stationLabel';

export function StationView({
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
    queryKey: ['station', id],
    queryFn: async ({ signal }) => {
      return await stationFindApiCall(id, signal);
    },
    initialData: () =>
      (
        queryClient.getQueryData([
          'station',
        ]) as Array<StationWithRelationships>
      )?.find((d) => d.id === id),
  });

  const station = query.data;

  if (query.isSuccess && !station) {
    router.push('/station');
    return null;
  }

  if (query.isError) {
    toast({
      description:
        (query.error as any).message || dictionary.shared.errors.unknown,
      variant: 'destructive',
    });
    router.push('/station');
    return null;
  }

  if (!station) {
    return null;
  }

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex items-center justify-between">
        <Breadcrumb
          items={[
            [dictionary.station.list.menu, '/station'],
            [stationLabel(station, dictionary)],
          ]}
        />
        <div className="flex gap-2">
          <StationActions mode="view" station={station} context={context} />
        </div>
      </div>

      <div className="my-6 divide-y border-t">
        {Boolean(station.name) && (
          <div className="grid grid-cols-3 gap-4 py-4 text-sm lg:grid-cols-4">
            <div className="font-semibold">
              {dictionary.station.fields.name}
            </div>
            <div className="col-span-2 flex items-baseline gap-4 lg:col-span-3">
              <span>{station.name}</span>
              <CopyToClipboardButton
                text={station.name}
                dictionary={context.dictionary}
              />
            </div>
          </div>
        )}
        {Boolean(station.description) && (
          <div className="grid grid-cols-3 gap-4 py-4 text-sm lg:grid-cols-4">
            <div className="font-semibold">
              {dictionary.station.fields.description}
            </div>
            <div className="col-span-2 flex items-baseline gap-4 lg:col-span-3">
              <span>{station.description}</span>
              <CopyToClipboardButton
                text={station.description}
                dictionary={context.dictionary}
              />
            </div>
          </div>
        )}
        {Boolean(station.location) && (
          <div className="grid grid-cols-3 gap-4 py-4 text-sm lg:grid-cols-4">
            <div className="font-semibold">
              {dictionary.station.fields.location}
            </div>
            <div className="col-span-2 flex items-baseline gap-4 lg:col-span-3">
              <span>{station.location}</span>
              <CopyToClipboardButton
                text={station.location}
                dictionary={context.dictionary}
              />
            </div>
          </div>
        )}
        {station.supervisor != null && (
          <div className="grid grid-cols-3 gap-4 py-4 text-sm lg:grid-cols-4">
            <div className="font-semibold">
              {dictionary.station.fields.supervisor}
            </div>
            <div className="col-span-2 flex items-baseline gap-4 lg:col-span-3">
              <MembershipLink membership={station.supervisor} context={context} />
              <CopyToClipboardButton
                text={membershipLabel(station.supervisor, context.dictionary)}
                dictionary={context.dictionary}
              />
            </div>
          </div>
        )}
        {station.dispensers?.length ? (<div className="grid grid-cols-3 gap-4 py-4 text-sm lg:grid-cols-4">
          <div className="font-semibold">
            {dictionary.station.fields.dispensers}
          </div>
          <div className="col-span-2 flex flex-col gap-1">
            {station.dispensers?.map((item) => {
              return (
                <div key={item?.id} className="flex items-center gap-4">
                  <DispenserLink
                    dispenser={item}
                    context={context}
                    className="whitespace-nowrap"
                  />
                  <CopyToClipboardButton
                    text={dispenserLabel(item, context.dictionary)}
                    dictionary={context.dictionary}
                  />
                </div>
              );
            })}
          </div>
        </div>): null}
        {station.tanks?.length ? (<div className="grid grid-cols-3 gap-4 py-4 text-sm lg:grid-cols-4">
          <div className="font-semibold">
            {dictionary.station.fields.tanks}
          </div>
          <div className="col-span-2 flex flex-col gap-1">
            {station.tanks?.map((item) => {
              return (
                <div key={item?.id} className="flex items-center gap-4">
                  <TankLink
                    tank={item}
                    context={context}
                    className="whitespace-nowrap"
                  />
                  <CopyToClipboardButton
                    text={tankLabel(item, context.dictionary)}
                    dictionary={context.dictionary}
                  />
                </div>
              );
            })}
          </div>
        </div>): null}
        {station.sales?.length ? (<div className="grid grid-cols-3 gap-4 py-4 text-sm lg:grid-cols-4">
          <div className="font-semibold">
            {dictionary.station.fields.sales}
          </div>
          <div className="col-span-2 flex flex-col gap-1">
            {station.sales?.map((item) => {
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
        {station.devices?.length ? (<div className="grid grid-cols-3 gap-4 py-4 text-sm lg:grid-cols-4">
          <div className="font-semibold">
            {dictionary.station.fields.devices}
          </div>
          <div className="col-span-2 flex flex-col gap-1">
            {station.devices?.map((item) => {
              return (
                <div key={item?.id} className="flex items-center gap-4">
                  <DeviceLink
                    device={item}
                    context={context}
                    className="whitespace-nowrap"
                  />
                  <CopyToClipboardButton
                    text={deviceLabel(item, context.dictionary)}
                    dictionary={context.dictionary}
                  />
                </div>
              );
            })}
          </div>
        </div>): null}

        {station.createdByMembership != null && (
          <div className="grid grid-cols-3 gap-4 py-4 text-sm lg:grid-cols-4">
            <div className="font-semibold">
              {dictionary.station.fields.createdByMembership}
            </div>
            <div className="col-span-2 flex items-baseline gap-4 lg:col-span-3">
              <MembershipLink
                membership={station.createdByMembership}
                context={context}
              />
              <CopyToClipboardButton
                text={membershipLabel(
                  station.createdByMembership,
                  context.dictionary,
                )}
                dictionary={context.dictionary}
              />
            </div>
          </div>
        )}

        {station.createdAt != null && (
          <div className="grid grid-cols-3 gap-4 py-4 text-sm lg:grid-cols-4">
            <div className="font-semibold">
              {dictionary.station.fields.createdAt}
            </div>
            <div className="col-span-2 flex items-baseline gap-4 lg:col-span-3">
              <span>{formatDatetime(station.createdAt, dictionary)}</span>
              <CopyToClipboardButton
                text={formatDatetime(station.createdAt, dictionary)}
                dictionary={context.dictionary}
              />
            </div>
          </div>
        )}

        {station.updatedByMembership != null && (
          <div className="grid grid-cols-3 gap-4 py-4 text-sm lg:grid-cols-4">
            <div className="font-semibold">
              {dictionary.station.fields.updatedByMembership}
            </div>
            <div className="col-span-2 flex items-baseline gap-4 lg:col-span-3">
              <MembershipLink
                membership={station.updatedByMembership}
                context={context}
              />
              <CopyToClipboardButton
                text={membershipLabel(
                  station.updatedByMembership,
                  context.dictionary,
                )}
                dictionary={context.dictionary}
              />
            </div>
          </div>
        )}

        {station.updatedAt != null && (
          <div className="grid grid-cols-3 gap-4 py-4 text-sm lg:grid-cols-4">
            <div className="font-semibold">
              {dictionary.station.fields.updatedAt}
            </div>
            <div className="col-span-2 flex items-baseline gap-4 lg:col-span-3">
              <span>{formatDatetime(station.updatedAt, dictionary)}</span>
              <CopyToClipboardButton
                text={formatDatetime(station.updatedAt, dictionary)}
                dictionary={context.dictionary}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
