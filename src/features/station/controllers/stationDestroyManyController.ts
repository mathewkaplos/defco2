import { RouteConfig } from '@asteasolutions/zod-to-openapi';
import { stationDestroyManyInputSchema } from 'src/features/station/stationSchemas';
import { permissions } from 'src/features/permissions';
import { validateHasPermission } from 'src/features/security';
import { prismaAuth } from 'src/prisma';
import { AppContext } from 'src/shared/controller/appContext';
import Error400 from 'src/shared/errors/Error400';
import { formatTranslation } from 'src/translation/formatTranslation';

export const stationDestroyManyApiDoc: RouteConfig = {
  method: 'delete',
  path: '/api/station',
  request: {
    query: stationDestroyManyInputSchema,
  },
  responses: {
    200: {
      description: 'OK',
    },
  },
};

export async function stationDestroyManyController(
  query: unknown,
  context: AppContext,
) {
  const { currentTenant } = validateHasPermission(
    permissions.stationDestroy,
    context,
  );

  const { ids } = stationDestroyManyInputSchema.parse(query);

  const prisma = prismaAuth(context);



  return await prisma.station.deleteMany({
    where: {
      id: { in: ids },
      tenantId: currentTenant.id,
    },
  });
}
