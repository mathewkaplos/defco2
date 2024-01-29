'use client';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { DeviceWithRelationships } from 'src/features/device/deviceSchemas';
import { deviceFindApiCall } from 'src/features/device/deviceApiCalls';
import { DeviceActions } from 'src/features/device/components/DeviceActions';
import { devicePermissions } from 'src/features/device/devicePermissions';
import Breadcrumb from 'src/shared/components/Breadcrumb';
import { CopyToClipboardButton } from 'src/shared/components/CopyToClipboardButton';
import { toast } from 'src/shared/components/ui/use-toast';
import { AppContext } from 'src/shared/controller/appContext';
import { formatDatetime } from 'src/shared/lib/formatDateTime';
import { stationLabel } from 'src/features/station/stationLabel';
import { StationLink } from 'src/features/station/components/StationLink';
import { deviceLabel } from 'src/features/device/deviceLabel';
import { MembershipLink } from 'src/features/membership/components/MembershipLink';
import { membershipLabel } from 'src/features/membership/membershipLabel';

export function DeviceView({
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
    queryKey: ['device', id],
    queryFn: async ({ signal }) => {
      return await deviceFindApiCall(id, signal);
    },
    initialData: () =>
      (
        queryClient.getQueryData([
          'device',
        ]) as Array<DeviceWithRelationships>
      )?.find((d) => d.id === id),
  });

  const device = query.data;

  if (query.isSuccess && !device) {
    router.push('/device');
    return null;
  }

  if (query.isError) {
    toast({
      description:
        (query.error as any).message || dictionary.shared.errors.unknown,
      variant: 'destructive',
    });
    router.push('/device');
    return null;
  }

  if (!device) {
    return null;
  }

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex items-center justify-between">
        <Breadcrumb
          items={[
            [dictionary.device.list.menu, '/device'],
            [deviceLabel(device, dictionary)],
          ]}
        />
        <div className="flex gap-2">
          <DeviceActions mode="view" device={device} context={context} />
        </div>
      </div>

      <div className="my-6 divide-y border-t">
        {Boolean(device.deviceId) && (
          <div className="grid grid-cols-3 gap-4 py-4 text-sm lg:grid-cols-4">
            <div className="font-semibold">
              {dictionary.device.fields.deviceId}
            </div>
            <div className="col-span-2 flex items-baseline gap-4 lg:col-span-3">
              <span>{device.deviceId}</span>
              <CopyToClipboardButton
                text={device.deviceId}
                dictionary={context.dictionary}
              />
            </div>
          </div>
        )}
        {Boolean(device.description) && (
          <div className="grid grid-cols-3 gap-4 py-4 text-sm lg:grid-cols-4">
            <div className="font-semibold">
              {dictionary.device.fields.description}
            </div>
            <div className="col-span-2 flex items-baseline gap-4 lg:col-span-3">
              <span>{device.description}</span>
              <CopyToClipboardButton
                text={device.description}
                dictionary={context.dictionary}
              />
            </div>
          </div>
        )}
        {device.station != null && (
          <div className="grid grid-cols-3 gap-4 py-4 text-sm lg:grid-cols-4">
            <div className="font-semibold">
              {dictionary.device.fields.station}
            </div>
            <div className="col-span-2 flex items-baseline gap-4 lg:col-span-3">
              <StationLink station={device.station} context={context} />
              <CopyToClipboardButton
                text={stationLabel(device.station, context.dictionary)}
                dictionary={context.dictionary}
              />
            </div>
          </div>
        )}

        {device.createdByMembership != null && (
          <div className="grid grid-cols-3 gap-4 py-4 text-sm lg:grid-cols-4">
            <div className="font-semibold">
              {dictionary.device.fields.createdByMembership}
            </div>
            <div className="col-span-2 flex items-baseline gap-4 lg:col-span-3">
              <MembershipLink
                membership={device.createdByMembership}
                context={context}
              />
              <CopyToClipboardButton
                text={membershipLabel(
                  device.createdByMembership,
                  context.dictionary,
                )}
                dictionary={context.dictionary}
              />
            </div>
          </div>
        )}

        {device.createdAt != null && (
          <div className="grid grid-cols-3 gap-4 py-4 text-sm lg:grid-cols-4">
            <div className="font-semibold">
              {dictionary.device.fields.createdAt}
            </div>
            <div className="col-span-2 flex items-baseline gap-4 lg:col-span-3">
              <span>{formatDatetime(device.createdAt, dictionary)}</span>
              <CopyToClipboardButton
                text={formatDatetime(device.createdAt, dictionary)}
                dictionary={context.dictionary}
              />
            </div>
          </div>
        )}

        {device.updatedByMembership != null && (
          <div className="grid grid-cols-3 gap-4 py-4 text-sm lg:grid-cols-4">
            <div className="font-semibold">
              {dictionary.device.fields.updatedByMembership}
            </div>
            <div className="col-span-2 flex items-baseline gap-4 lg:col-span-3">
              <MembershipLink
                membership={device.updatedByMembership}
                context={context}
              />
              <CopyToClipboardButton
                text={membershipLabel(
                  device.updatedByMembership,
                  context.dictionary,
                )}
                dictionary={context.dictionary}
              />
            </div>
          </div>
        )}

        {device.updatedAt != null && (
          <div className="grid grid-cols-3 gap-4 py-4 text-sm lg:grid-cols-4">
            <div className="font-semibold">
              {dictionary.device.fields.updatedAt}
            </div>
            <div className="col-span-2 flex items-baseline gap-4 lg:col-span-3">
              <span>{formatDatetime(device.updatedAt, dictionary)}</span>
              <CopyToClipboardButton
                text={formatDatetime(device.updatedAt, dictionary)}
                dictionary={context.dictionary}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
