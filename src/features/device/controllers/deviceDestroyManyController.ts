import { RouteConfig } from '@asteasolutions/zod-to-openapi';
import { deviceDestroyManyInputSchema } from 'src/features/device/deviceSchemas';
import { permissions } from 'src/features/permissions';
import { validateHasPermission } from 'src/features/security';
import { prismaAuth } from 'src/prisma';
import { AppContext } from 'src/shared/controller/appContext';
import Error400 from 'src/shared/errors/Error400';
import { formatTranslation } from 'src/translation/formatTranslation';

export const deviceDestroyManyApiDoc: RouteConfig = {
  method: 'delete',
  path: '/api/device',
  request: {
    query: deviceDestroyManyInputSchema,
  },
  responses: {
    200: {
      description: 'OK',
    },
  },
};

export async function deviceDestroyManyController(
  query: unknown,
  context: AppContext,
) {
  const { currentTenant } = validateHasPermission(
    permissions.deviceDestroy,
    context,
  );

  const { ids } = deviceDestroyManyInputSchema.parse(query);

  const prisma = prismaAuth(context);



  return await prisma.device.deleteMany({
    where: {
      id: { in: ids },
      tenantId: currentTenant.id,
    },
  });
}
