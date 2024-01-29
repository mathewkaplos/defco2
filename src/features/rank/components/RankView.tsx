'use client';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { RankWithRelationships } from 'src/features/rank/rankSchemas';
import { rankFindApiCall } from 'src/features/rank/rankApiCalls';
import { RankActions } from 'src/features/rank/components/RankActions';
import { rankPermissions } from 'src/features/rank/rankPermissions';
import Breadcrumb from 'src/shared/components/Breadcrumb';
import { CopyToClipboardButton } from 'src/shared/components/CopyToClipboardButton';
import { toast } from 'src/shared/components/ui/use-toast';
import { AppContext } from 'src/shared/controller/appContext';
import { formatDatetime } from 'src/shared/lib/formatDateTime';
import { customerLabel } from 'src/features/customer/customerLabel';
import { CustomerLink } from 'src/features/customer/components/CustomerLink';
import { rankLabel } from 'src/features/rank/rankLabel';
import { MembershipLink } from 'src/features/membership/components/MembershipLink';
import { membershipLabel } from 'src/features/membership/membershipLabel';

export function RankView({
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
    queryKey: ['rank', id],
    queryFn: async ({ signal }) => {
      return await rankFindApiCall(id, signal);
    },
    initialData: () =>
      (
        queryClient.getQueryData([
          'rank',
        ]) as Array<RankWithRelationships>
      )?.find((d) => d.id === id),
  });

  const rank = query.data;

  if (query.isSuccess && !rank) {
    router.push('/rank');
    return null;
  }

  if (query.isError) {
    toast({
      description:
        (query.error as any).message || dictionary.shared.errors.unknown,
      variant: 'destructive',
    });
    router.push('/rank');
    return null;
  }

  if (!rank) {
    return null;
  }

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex items-center justify-between">
        <Breadcrumb
          items={[
            [dictionary.rank.list.menu, '/rank'],
            [rankLabel(rank, dictionary)],
          ]}
        />
        <div className="flex gap-2">
          <RankActions mode="view" rank={rank} context={context} />
        </div>
      </div>

      <div className="my-6 divide-y border-t">
        {Boolean(rank.name) && (
          <div className="grid grid-cols-3 gap-4 py-4 text-sm lg:grid-cols-4">
            <div className="font-semibold">
              {dictionary.rank.fields.name}
            </div>
            <div className="col-span-2 flex items-baseline gap-4 lg:col-span-3">
              <span>{rank.name}</span>
              <CopyToClipboardButton
                text={rank.name}
                dictionary={context.dictionary}
              />
            </div>
          </div>
        )}
        {Boolean(rank.description) && (
          <div className="grid grid-cols-3 gap-4 py-4 text-sm lg:grid-cols-4">
            <div className="font-semibold">
              {dictionary.rank.fields.description}
            </div>
            <div className="col-span-2 flex items-baseline gap-4 lg:col-span-3">
              <span>{rank.description}</span>
              <CopyToClipboardButton
                text={rank.description}
                dictionary={context.dictionary}
              />
            </div>
          </div>
        )}
        {rank.customers?.length ? (<div className="grid grid-cols-3 gap-4 py-4 text-sm lg:grid-cols-4">
          <div className="font-semibold">
            {dictionary.rank.fields.customers}
          </div>
          <div className="col-span-2 flex flex-col gap-1">
            {rank.customers?.map((item) => {
              return (
                <div key={item?.id} className="flex items-center gap-4">
                  <CustomerLink
                    customer={item}
                    context={context}
                    className="whitespace-nowrap"
                  />
                  <CopyToClipboardButton
                    text={customerLabel(item, context.dictionary)}
                    dictionary={context.dictionary}
                  />
                </div>
              );
            })}
          </div>
        </div>): null}

        {rank.createdByMembership != null && (
          <div className="grid grid-cols-3 gap-4 py-4 text-sm lg:grid-cols-4">
            <div className="font-semibold">
              {dictionary.rank.fields.createdByMembership}
            </div>
            <div className="col-span-2 flex items-baseline gap-4 lg:col-span-3">
              <MembershipLink
                membership={rank.createdByMembership}
                context={context}
              />
              <CopyToClipboardButton
                text={membershipLabel(
                  rank.createdByMembership,
                  context.dictionary,
                )}
                dictionary={context.dictionary}
              />
            </div>
          </div>
        )}

        {rank.createdAt != null && (
          <div className="grid grid-cols-3 gap-4 py-4 text-sm lg:grid-cols-4">
            <div className="font-semibold">
              {dictionary.rank.fields.createdAt}
            </div>
            <div className="col-span-2 flex items-baseline gap-4 lg:col-span-3">
              <span>{formatDatetime(rank.createdAt, dictionary)}</span>
              <CopyToClipboardButton
                text={formatDatetime(rank.createdAt, dictionary)}
                dictionary={context.dictionary}
              />
            </div>
          </div>
        )}

        {rank.updatedByMembership != null && (
          <div className="grid grid-cols-3 gap-4 py-4 text-sm lg:grid-cols-4">
            <div className="font-semibold">
              {dictionary.rank.fields.updatedByMembership}
            </div>
            <div className="col-span-2 flex items-baseline gap-4 lg:col-span-3">
              <MembershipLink
                membership={rank.updatedByMembership}
                context={context}
              />
              <CopyToClipboardButton
                text={membershipLabel(
                  rank.updatedByMembership,
                  context.dictionary,
                )}
                dictionary={context.dictionary}
              />
            </div>
          </div>
        )}

        {rank.updatedAt != null && (
          <div className="grid grid-cols-3 gap-4 py-4 text-sm lg:grid-cols-4">
            <div className="font-semibold">
              {dictionary.rank.fields.updatedAt}
            </div>
            <div className="col-span-2 flex items-baseline gap-4 lg:col-span-3">
              <span>{formatDatetime(rank.updatedAt, dictionary)}</span>
              <CopyToClipboardButton
                text={formatDatetime(rank.updatedAt, dictionary)}
                dictionary={context.dictionary}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
