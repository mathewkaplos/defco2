import { RouteConfig } from '@asteasolutions/zod-to-openapi';
import { tankDestroyManyInputSchema } from 'src/features/tank/tankSchemas';
import { permissions } from 'src/features/permissions';
import { validateHasPermission } from 'src/features/security';
import { prismaAuth } from 'src/prisma';
import { AppContext } from 'src/shared/controller/appContext';
import Error400 from 'src/shared/errors/Error400';
import { formatTranslation } from 'src/translation/formatTranslation';

export const tankDestroyManyApiDoc: RouteConfig = {
  method: 'delete',
  path: '/api/tank',
  request: {
    query: tankDestroyManyInputSchema,
  },
  responses: {
    200: {
      description: 'OK',
    },
  },
};

export async function tankDestroyManyController(
  query: unknown,
  context: AppContext,
) {
  const { currentTenant } = validateHasPermission(
    permissions.tankDestroy,
    context,
  );

  const { ids } = tankDestroyManyInputSchema.parse(query);

  const prisma = prismaAuth(context);



  return await prisma.tank.deleteMany({
    where: {
      id: { in: ids },
      tenantId: currentTenant.id,
    },
  });
}
