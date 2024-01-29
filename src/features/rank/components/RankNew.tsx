'use client';

import { Rank } from '@prisma/client';
import { useRouter } from 'next/navigation';
import React from 'react';
import { RankForm } from 'src/features/rank/components/RankForm';
import { AppContext } from 'src/shared/controller/appContext';

export default function RankNew({ context }: { context: AppContext }) {
  const router = useRouter();

  return (
    <RankForm
      context={context}
      onSuccess={(rank: Rank) =>
        router.push(`/rank/${rank.id}`)
      }
      onCancel={() => router.push('/rank')}
    />
  );
}
