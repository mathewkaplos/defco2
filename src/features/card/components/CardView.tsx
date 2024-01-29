'use client';

import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { CardWithRelationships } from 'src/features/card/cardSchemas';
import { cardFindApiCall } from 'src/features/card/cardApiCalls';
import { CardActions } from 'src/features/card/components/CardActions';
import { cardPermissions } from 'src/features/card/cardPermissions';
import Breadcrumb from 'src/shared/components/Breadcrumb';
import { CopyToClipboardButton } from 'src/shared/components/CopyToClipboardButton';
import { toast } from 'src/shared/components/ui/use-toast';
import { AppContext } from 'src/shared/controller/appContext';
import { formatDatetime } from 'src/shared/lib/formatDateTime';
import { formatDate } from 'src/shared/lib/formatDate';
import { customerLabel } from 'src/features/customer/customerLabel';
import { CustomerLink } from 'src/features/customer/components/CustomerLink';
import { cardLabel } from 'src/features/card/cardLabel';
import { MembershipLink } from 'src/features/membership/components/MembershipLink';
import { membershipLabel } from 'src/features/membership/membershipLabel';

export function CardView({
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
    queryKey: ['card', id],
    queryFn: async ({ signal }) => {
      return await cardFindApiCall(id, signal);
    },
    initialData: () =>
      (
        queryClient.getQueryData([
          'card',
        ]) as Array<CardWithRelationships>
      )?.find((d) => d.id === id),
  });

  const card = query.data;

  if (query.isSuccess && !card) {
    router.push('/card');
    return null;
  }

  if (query.isError) {
    toast({
      description:
        (query.error as any).message || dictionary.shared.errors.unknown,
      variant: 'destructive',
    });
    router.push('/card');
    return null;
  }

  if (!card) {
    return null;
  }

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex items-center justify-between">
        <Breadcrumb
          items={[
            [dictionary.card.list.menu, '/card'],
            [cardLabel(card, dictionary)],
          ]}
        />
        <div className="flex gap-2">
          <CardActions mode="view" card={card} context={context} />
        </div>
      </div>

      <div className="my-6 divide-y border-t">
        {Boolean(card.cardNo) && (
          <div className="grid grid-cols-3 gap-4 py-4 text-sm lg:grid-cols-4">
            <div className="font-semibold">
              {dictionary.card.fields.cardNo}
            </div>
            <div className="col-span-2 flex items-baseline gap-4 lg:col-span-3">
              <span>{card.cardNo}</span>
              <CopyToClipboardButton
                text={card.cardNo}
                dictionary={context.dictionary}
              />
            </div>
          </div>
        )}
        {card.isActive != null && (
          <div className="grid grid-cols-3 gap-4 py-4 text-sm lg:grid-cols-4">
            <div className="font-semibold">
              {dictionary.card.fields.isActive}
            </div>
            <div className="col-span-2 flex items-baseline gap-4 lg:col-span-3">
              <span>
                {card.isActive
                  ? dictionary.shared.yes
                  : dictionary.shared.no}
              </span>
              <CopyToClipboardButton
                text={
                  card.isActive
                    ? dictionary.shared.yes
                    : dictionary.shared.no
                }
                dictionary={context.dictionary}
              />
            </div>
          </div>
        )}
        {card.issueDate != null && (
          <div className="grid grid-cols-3 gap-4 py-4 text-sm lg:grid-cols-4">
            <div className="font-semibold">
              {dictionary.card.fields.issueDate}
            </div>
            <div className="col-span-2 flex items-baseline gap-4 lg:col-span-3">
              <span>{formatDate(card.issueDate, dictionary)}</span>
              <CopyToClipboardButton
                text={formatDate(card.issueDate, dictionary)}
                dictionary={context.dictionary}
              />
            </div>
          </div>
        )}
        {card.deactivationDate != null && (
          <div className="grid grid-cols-3 gap-4 py-4 text-sm lg:grid-cols-4">
            <div className="font-semibold">
              {dictionary.card.fields.deactivationDate}
            </div>
            <div className="col-span-2 flex items-baseline gap-4 lg:col-span-3">
              <span>{formatDate(card.deactivationDate, dictionary)}</span>
              <CopyToClipboardButton
                text={formatDate(card.deactivationDate, dictionary)}
                dictionary={context.dictionary}
              />
            </div>
          </div>
        )}
        {card.customer != null && (
          <div className="grid grid-cols-3 gap-4 py-4 text-sm lg:grid-cols-4">
            <div className="font-semibold">
              {dictionary.card.fields.customer}
            </div>
            <div className="col-span-2 flex items-baseline gap-4 lg:col-span-3">
              <CustomerLink customer={card.customer} context={context} />
              <CopyToClipboardButton
                text={customerLabel(card.customer, context.dictionary)}
                dictionary={context.dictionary}
              />
            </div>
          </div>
        )}

        {card.createdByMembership != null && (
          <div className="grid grid-cols-3 gap-4 py-4 text-sm lg:grid-cols-4">
            <div className="font-semibold">
              {dictionary.card.fields.createdByMembership}
            </div>
            <div className="col-span-2 flex items-baseline gap-4 lg:col-span-3">
              <MembershipLink
                membership={card.createdByMembership}
                context={context}
              />
              <CopyToClipboardButton
                text={membershipLabel(
                  card.createdByMembership,
                  context.dictionary,
                )}
                dictionary={context.dictionary}
              />
            </div>
          </div>
        )}

        {card.createdAt != null && (
          <div className="grid grid-cols-3 gap-4 py-4 text-sm lg:grid-cols-4">
            <div className="font-semibold">
              {dictionary.card.fields.createdAt}
            </div>
            <div className="col-span-2 flex items-baseline gap-4 lg:col-span-3">
              <span>{formatDatetime(card.createdAt, dictionary)}</span>
              <CopyToClipboardButton
                text={formatDatetime(card.createdAt, dictionary)}
                dictionary={context.dictionary}
              />
            </div>
          </div>
        )}

        {card.updatedByMembership != null && (
          <div className="grid grid-cols-3 gap-4 py-4 text-sm lg:grid-cols-4">
            <div className="font-semibold">
              {dictionary.card.fields.updatedByMembership}
            </div>
            <div className="col-span-2 flex items-baseline gap-4 lg:col-span-3">
              <MembershipLink
                membership={card.updatedByMembership}
                context={context}
              />
              <CopyToClipboardButton
                text={membershipLabel(
                  card.updatedByMembership,
                  context.dictionary,
                )}
                dictionary={context.dictionary}
              />
            </div>
          </div>
        )}

        {card.updatedAt != null && (
          <div className="grid grid-cols-3 gap-4 py-4 text-sm lg:grid-cols-4">
            <div className="font-semibold">
              {dictionary.card.fields.updatedAt}
            </div>
            <div className="col-span-2 flex items-baseline gap-4 lg:col-span-3">
              <span>{formatDatetime(card.updatedAt, dictionary)}</span>
              <CopyToClipboardButton
                text={formatDatetime(card.updatedAt, dictionary)}
                dictionary={context.dictionary}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
