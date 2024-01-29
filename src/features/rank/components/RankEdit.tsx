'use client';

import { Rank } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { RankForm } from 'src/features/rank/components/RankForm';
import { rankFindApiCall } from 'src/features/rank/rankApiCalls';
import { rankLabel } from 'src/features/rank/rankLabel';
import { RankWithRelationships } from 'src/features/rank/rankSchemas';
import Breadcrumb from 'src/shared/components/Breadcrumb';
import { toast } from 'src/shared/components/ui/use-toast';
import { AppContext } from 'src/shared/controller/appContext';
import { Logger } from 'src/shared/lib/Logger';

export default function RankEdit({
  context,
  id,
}: {
  context: AppContext;
  id: string;
}) {
  const dictionary = context.dictionary;
  const router = useRouter();
  const [rank, setRank] = useState<RankWithRelationships>();

  useEffect(() => {
    async function doFetch() {
      try {
        setRank(undefined);
        const rank = await rankFindApiCall(id);

        if (!rank) {
          router.push('/rank');
        }

        setRank(rank);
      } catch (error: any) {
        Logger.error(error);
        toast({
          description: error.message || dictionary.shared.errors.unknown,
          variant: 'destructive',
        });
        router.push('/rank');
      }
    }

    doFetch();
  }, [id, router, dictionary.shared.errors.unknown]);

  if (!rank) {
    return null;
  }

  return (
    <div className="flex flex-1 flex-col">
      <Breadcrumb
        items={[
          [dictionary.rank.list.menu, '/rank'],
          [rankLabel(rank, context.dictionary), `/rank/${rank?.id}`],
          [dictionary.rank.edit.menu],
        ]}
      />
      <div className="my-10">
        <RankForm
          context={context}
          rank={rank}
          onSuccess={(rank: Rank) => router.push(`/rank/${rank.id}`)}
          onCancel={() => router.push('/rank')}
        />
      </div>
    </div>
  );
}
