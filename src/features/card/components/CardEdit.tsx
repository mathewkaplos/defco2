'use client';

import { Card } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { CardForm } from 'src/features/card/components/CardForm';
import { cardFindApiCall } from 'src/features/card/cardApiCalls';
import { cardLabel } from 'src/features/card/cardLabel';
import { CardWithRelationships } from 'src/features/card/cardSchemas';
import Breadcrumb from 'src/shared/components/Breadcrumb';
import { toast } from 'src/shared/components/ui/use-toast';
import { AppContext } from 'src/shared/controller/appContext';
import { Logger } from 'src/shared/lib/Logger';

export default function CardEdit({
  context,
  id,
}: {
  context: AppContext;
  id: string;
}) {
  const dictionary = context.dictionary;
  const router = useRouter();
  const [card, setCard] = useState<CardWithRelationships>();

  useEffect(() => {
    async function doFetch() {
      try {
        setCard(undefined);
        const card = await cardFindApiCall(id);

        if (!card) {
          router.push('/card');
        }

        setCard(card);
      } catch (error: any) {
        Logger.error(error);
        toast({
          description: error.message || dictionary.shared.errors.unknown,
          variant: 'destructive',
        });
        router.push('/card');
      }
    }

    doFetch();
  }, [id, router, dictionary.shared.errors.unknown]);

  if (!card) {
    return null;
  }

  return (
    <div className="flex flex-1 flex-col">
      <Breadcrumb
        items={[
          [dictionary.card.list.menu, '/card'],
          [cardLabel(card, context.dictionary), `/card/${card?.id}`],
          [dictionary.card.edit.menu],
        ]}
      />
      <div className="my-10">
        <CardForm
          context={context}
          card={card}
          onSuccess={(card: Card) => router.push(`/card/${card.id}`)}
          onCancel={() => router.push('/card')}
        />
      </div>
    </div>
  );
}
