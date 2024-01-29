'use client';

import { materialReceiptFindManyApiCall } from 'src/features/materialReceipt/materialReceiptApiCalls';
import DashboardCountCard from 'src/features/dashboard/components/DashboardCountCard';
import { permissions } from 'src/features/permissions';
import { hasPermission } from 'src/features/security';
import { AppContext } from 'src/shared/controller/appContext';
import { LuLayoutGrid } from 'react-icons/lu';

export function MaterialReceiptDashboardCard({ context }: { context: AppContext }) {
  const { dictionary } = context;

  if (!hasPermission(permissions.materialReceiptRead, context)) {
    return null;
  }

  return (
    <DashboardCountCard
      queryFn={async (signal?: AbortSignal) => {
        const { count } = await materialReceiptFindManyApiCall(
          {
            take: 1,
            orderBy: {
              createdAt: 'desc',
            },
          },
          signal,
        );

        return count;
      }}
      id="materialReceiptDashboardCard"
      queryKey={['materialReceipt', 'count']}
      title={dictionary.materialReceipt.dashboardCard.title}
      Icon={LuLayoutGrid}
    />
  );
}
