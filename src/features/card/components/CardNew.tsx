'use client';

import { Card } from '@prisma/client';
import { useRouter } from 'next/navigation';
import React from 'react';
import { CardForm } from 'src/features/card/components/CardForm';
import { AppContext } from 'src/shared/controller/appContext';

export default function CardNew({ context }: { context: AppContext }) {
  const router = useRouter();

  return (
    <CardForm
      context={context}
      onSuccess={(card: Card) =>
        router.push(`/card/${card.id}`)
      }
      onCancel={() => router.push('/card')}
    />
  );
}
