import { RouteConfig } from '@asteasolutions/zod-to-openapi';
import { rankDestroyManyInputSchema } from 'src/features/rank/rankSchemas';
import { permissions } from 'src/features/permissions';
import { validateHasPermission } from 'src/features/security';
import { prismaAuth } from 'src/prisma';
import { AppContext } from 'src/shared/controller/appContext';
import Error400 from 'src/shared/errors/Error400';
import { formatTranslation } from 'src/translation/formatTranslation';

export const rankDestroyManyApiDoc: RouteConfig = {
  method: 'delete',
  path: '/api/rank',
  request: {
    query: rankDestroyManyInputSchema,
  },
  responses: {
    200: {
      description: 'OK',
    },
  },
};

export async function rankDestroyManyController(
  query: unknown,
  context: AppContext,
) {
  const { currentTenant } = validateHasPermission(
    permissions.rankDestroy,
    context,
  );

  const { ids } = rankDestroyManyInputSchema.parse(query);

  const prisma = prismaAuth(context);



  return await prisma.rank.deleteMany({
    where: {
      id: { in: ids },
      tenantId: currentTenant.id,
    },
  });
}
