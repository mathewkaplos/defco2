'use client';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { DispenserWithRelationships } from 'src/features/dispenser/dispenserSchemas';
import { dispenserFindApiCall } from 'src/features/dispenser/dispenserApiCalls';
import { DispenserActions } from 'src/features/dispenser/components/DispenserActions';
import { dispenserPermissions } from 'src/features/dispenser/dispenserPermissions';
import Breadcrumb from 'src/shared/components/Breadcrumb';
import { CopyToClipboardButton } from 'src/shared/components/CopyToClipboardButton';
import { toast } from 'src/shared/components/ui/use-toast';
import { AppContext } from 'src/shared/controller/appContext';
import { formatDatetime } from 'src/shared/lib/formatDateTime';
import { enumeratorLabel } from 'src/shared/lib/enumeratorLabel';
import { stationLabel } from 'src/features/station/stationLabel';
import { StationLink } from 'src/features/station/components/StationLink';
import { dispenserLabel } from 'src/features/dispenser/dispenserLabel';
import { MembershipLink } from 'src/features/membership/components/MembershipLink';
import { membershipLabel } from 'src/features/membership/membershipLabel';

export function DispenserView({
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
    queryKey: ['dispenser', id],
    queryFn: async ({ signal }) => {
      return await dispenserFindApiCall(id, signal);
    },
    initialData: () =>
      (
        queryClient.getQueryData([
          'dispenser',
        ]) as Array<DispenserWithRelationships>
      )?.find((d) => d.id === id),
  });

  const dispenser = query.data;

  if (query.isSuccess && !dispenser) {
    router.push('/dispenser');
    return null;
  }

  if (query.isError) {
    toast({
      description:
        (query.error as any).message || dictionary.shared.errors.unknown,
      variant: 'destructive',
    });
    router.push('/dispenser');
    return null;
  }

  if (!dispenser) {
    return null;
  }

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex items-center justify-between">
        <Breadcrumb
          items={[
            [dictionary.dispenser.list.menu, '/dispenser'],
            [dispenserLabel(dispenser, dictionary)],
          ]}
        />
        <div className="flex gap-2">
          <DispenserActions mode="view" dispenser={dispenser} context={context} />
        </div>
      </div>

      <div className="my-6 divide-y border-t">
        {Boolean(dispenser.name) && (
          <div className="grid grid-cols-3 gap-4 py-4 text-sm lg:grid-cols-4">
            <div className="font-semibold">
              {dictionary.dispenser.fields.name}
            </div>
            <div className="col-span-2 flex items-baseline gap-4 lg:col-span-3">
              <span>{dispenser.name}</span>
              <CopyToClipboardButton
                text={dispenser.name}
                dictionary={context.dictionary}
              />
            </div>
          </div>
        )}
        {Boolean(dispenser.model) && (
          <div className="grid grid-cols-3 gap-4 py-4 text-sm lg:grid-cols-4">
            <div className="font-semibold">
              {dictionary.dispenser.fields.model}
            </div>
            <div className="col-span-2 flex items-baseline gap-4 lg:col-span-3">
              <span>{dispenser.model}</span>
              <CopyToClipboardButton
                text={dispenser.model}
                dictionary={context.dictionary}
              />
            </div>
          </div>
        )}
        {dispenser.fuelType != null && (
          <div className="grid grid-cols-3 gap-4 py-4 text-sm lg:grid-cols-4">
            <div className="font-semibold">
              {dictionary.dispenser.fields.fuelType}
            </div>
            <div className="col-span-2 flex items-baseline gap-4 lg:col-span-3">
              <span>
                {enumeratorLabel(
                  dictionary.dispenser.enumerators.fuelType,
                  dispenser.fuelType,
                )}
              </span>
              <CopyToClipboardButton
                text={enumeratorLabel(
                  dictionary.dispenser.enumerators.fuelType,
                  dispenser.fuelType,
                )}
                dictionary={context.dictionary}
              />
            </div>
          </div>
        )}
        {dispenser.station != null && (
          <div className="grid grid-cols-3 gap-4 py-4 text-sm lg:grid-cols-4">
            <div className="font-semibold">
              {dictionary.dispenser.fields.station}
            </div>
            <div className="col-span-2 flex items-baseline gap-4 lg:col-span-3">
              <StationLink station={dispenser.station} context={context} />
              <CopyToClipboardButton
                text={stationLabel(dispenser.station, context.dictionary)}
                dictionary={context.dictionary}
              />
            </div>
          </div>
        )}

        {dispenser.createdByMembership != null && (
          <div className="grid grid-cols-3 gap-4 py-4 text-sm lg:grid-cols-4">
            <div className="font-semibold">
              {dictionary.dispenser.fields.createdByMembership}
            </div>
            <div className="col-span-2 flex items-baseline gap-4 lg:col-span-3">
              <MembershipLink
                membership={dispenser.createdByMembership}
                context={context}
              />
              <CopyToClipboardButton
                text={membershipLabel(
                  dispenser.createdByMembership,
                  context.dictionary,
                )}
                dictionary={context.dictionary}
              />
            </div>
          </div>
        )}

        {dispenser.createdAt != null && (
          <div className="grid grid-cols-3 gap-4 py-4 text-sm lg:grid-cols-4">
            <div className="font-semibold">
              {dictionary.dispenser.fields.createdAt}
            </div>
            <div className="col-span-2 flex items-baseline gap-4 lg:col-span-3">
              <span>{formatDatetime(dispenser.createdAt, dictionary)}</span>
              <CopyToClipboardButton
                text={formatDatetime(dispenser.createdAt, dictionary)}
                dictionary={context.dictionary}
              />
            </div>
          </div>
        )}

        {dispenser.updatedByMembership != null && (
          <div className="grid grid-cols-3 gap-4 py-4 text-sm lg:grid-cols-4">
            <div className="font-semibold">
              {dictionary.dispenser.fields.updatedByMembership}
            </div>
            <div className="col-span-2 flex items-baseline gap-4 lg:col-span-3">
              <MembershipLink
                membership={dispenser.updatedByMembership}
                context={context}
              />
              <CopyToClipboardButton
                text={membershipLabel(
                  dispenser.updatedByMembership,
                  context.dictionary,
                )}
                dictionary={context.dictionary}
              />
            </div>
          </div>
        )}

        {dispenser.updatedAt != null && (
          <div className="grid grid-cols-3 gap-4 py-4 text-sm lg:grid-cols-4">
            <div className="font-semibold">
              {dictionary.dispenser.fields.updatedAt}
            </div>
            <div className="col-span-2 flex items-baseline gap-4 lg:col-span-3">
              <span>{formatDatetime(dispenser.updatedAt, dictionary)}</span>
              <CopyToClipboardButton
                text={formatDatetime(dispenser.updatedAt, dictionary)}
                dictionary={context.dictionary}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
