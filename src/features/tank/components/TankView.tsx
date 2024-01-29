'use client';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { TankWithRelationships } from 'src/features/tank/tankSchemas';
import { tankFindApiCall } from 'src/features/tank/tankApiCalls';
import { TankActions } from 'src/features/tank/components/TankActions';
import { tankPermissions } from 'src/features/tank/tankPermissions';
import Breadcrumb from 'src/shared/components/Breadcrumb';
import { CopyToClipboardButton } from 'src/shared/components/CopyToClipboardButton';
import { toast } from 'src/shared/components/ui/use-toast';
import { AppContext } from 'src/shared/controller/appContext';
import { formatDatetime } from 'src/shared/lib/formatDateTime';
import { stationLabel } from 'src/features/station/stationLabel';
import { StationLink } from 'src/features/station/components/StationLink';
import { tankLabel } from 'src/features/tank/tankLabel';
import { MembershipLink } from 'src/features/membership/components/MembershipLink';
import { membershipLabel } from 'src/features/membership/membershipLabel';

export function TankView({
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
    queryKey: ['tank', id],
    queryFn: async ({ signal }) => {
      return await tankFindApiCall(id, signal);
    },
    initialData: () =>
      (
        queryClient.getQueryData([
          'tank',
        ]) as Array<TankWithRelationships>
      )?.find((d) => d.id === id),
  });

  const tank = query.data;

  if (query.isSuccess && !tank) {
    router.push('/tank');
    return null;
  }

  if (query.isError) {
    toast({
      description:
        (query.error as any).message || dictionary.shared.errors.unknown,
      variant: 'destructive',
    });
    router.push('/tank');
    return null;
  }

  if (!tank) {
    return null;
  }

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex items-center justify-between">
        <Breadcrumb
          items={[
            [dictionary.tank.list.menu, '/tank'],
            [tankLabel(tank, dictionary)],
          ]}
        />
        <div className="flex gap-2">
          <TankActions mode="view" tank={tank} context={context} />
        </div>
      </div>

      <div className="my-6 divide-y border-t">
        {Boolean(tank.name) && (
          <div className="grid grid-cols-3 gap-4 py-4 text-sm lg:grid-cols-4">
            <div className="font-semibold">
              {dictionary.tank.fields.name}
            </div>
            <div className="col-span-2 flex items-baseline gap-4 lg:col-span-3">
              <span>{tank.name}</span>
              <CopyToClipboardButton
                text={tank.name}
                dictionary={context.dictionary}
              />
            </div>
          </div>
        )}
        {tank.capacity != null && (
          <div className="grid grid-cols-3 gap-4 py-4 text-sm lg:grid-cols-4">
            <div className="font-semibold">
              {dictionary.tank.fields.capacity}
            </div>
            <div className="col-span-2 flex items-baseline gap-4 lg:col-span-3">
              <span>{tank.capacity}</span>
              <CopyToClipboardButton
                text={tank.capacity.toString()}
                dictionary={context.dictionary}
              />
            </div>
          </div>
        )}
        {tank.station != null && (
          <div className="grid grid-cols-3 gap-4 py-4 text-sm lg:grid-cols-4">
            <div className="font-semibold">
              {dictionary.tank.fields.station}
            </div>
            <div className="col-span-2 flex items-baseline gap-4 lg:col-span-3">
              <StationLink station={tank.station} context={context} />
              <CopyToClipboardButton
                text={stationLabel(tank.station, context.dictionary)}
                dictionary={context.dictionary}
              />
            </div>
          </div>
        )}

        {tank.createdByMembership != null && (
          <div className="grid grid-cols-3 gap-4 py-4 text-sm lg:grid-cols-4">
            <div className="font-semibold">
              {dictionary.tank.fields.createdByMembership}
            </div>
            <div className="col-span-2 flex items-baseline gap-4 lg:col-span-3">
              <MembershipLink
                membership={tank.createdByMembership}
                context={context}
              />
              <CopyToClipboardButton
                text={membershipLabel(
                  tank.createdByMembership,
                  context.dictionary,
                )}
                dictionary={context.dictionary}
              />
            </div>
          </div>
        )}

        {tank.createdAt != null && (
          <div className="grid grid-cols-3 gap-4 py-4 text-sm lg:grid-cols-4">
            <div className="font-semibold">
              {dictionary.tank.fields.createdAt}
            </div>
            <div className="col-span-2 flex items-baseline gap-4 lg:col-span-3">
              <span>{formatDatetime(tank.createdAt, dictionary)}</span>
              <CopyToClipboardButton
                text={formatDatetime(tank.createdAt, dictionary)}
                dictionary={context.dictionary}
              />
            </div>
          </div>
        )}

        {tank.updatedByMembership != null && (
          <div className="grid grid-cols-3 gap-4 py-4 text-sm lg:grid-cols-4">
            <div className="font-semibold">
              {dictionary.tank.fields.updatedByMembership}
            </div>
            <div className="col-span-2 flex items-baseline gap-4 lg:col-span-3">
              <MembershipLink
                membership={tank.updatedByMembership}
                context={context}
              />
              <CopyToClipboardButton
                text={membershipLabel(
                  tank.updatedByMembership,
                  context.dictionary,
                )}
                dictionary={context.dictionary}
              />
            </div>
          </div>
        )}

        {tank.updatedAt != null && (
          <div className="grid grid-cols-3 gap-4 py-4 text-sm lg:grid-cols-4">
            <div className="font-semibold">
              {dictionary.tank.fields.updatedAt}
            </div>
            <div className="col-span-2 flex items-baseline gap-4 lg:col-span-3">
              <span>{formatDatetime(tank.updatedAt, dictionary)}</span>
              <CopyToClipboardButton
                text={formatDatetime(tank.updatedAt, dictionary)}
                dictionary={context.dictionary}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
