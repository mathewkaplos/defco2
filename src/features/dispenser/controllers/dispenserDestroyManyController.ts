import { RouteConfig } from '@asteasolutions/zod-to-openapi';
import { dispenserDestroyManyInputSchema } from 'src/features/dispenser/dispenserSchemas';
import { permissions } from 'src/features/permissions';
import { validateHasPermission } from 'src/features/security';
import { prismaAuth } from 'src/prisma';
import { AppContext } from 'src/shared/controller/appContext';
import Error400 from 'src/shared/errors/Error400';
import { formatTranslation } from 'src/translation/formatTranslation';

export const dispenserDestroyManyApiDoc: RouteConfig = {
  method: 'delete',
  path: '/api/dispenser',
  request: {
    query: dispenserDestroyManyInputSchema,
  },
  responses: {
    200: {
      description: 'OK',
    },
  },
};

export async function dispenserDestroyManyController(
  query: unknown,
  context: AppContext,
) {
  const { currentTenant } = validateHasPermission(
    permissions.dispenserDestroy,
    context,
  );

  const { ids } = dispenserDestroyManyInputSchema.parse(query);

  const prisma = prismaAuth(context);



  return await prisma.dispenser.deleteMany({
    where: {
      id: { in: ids },
      tenantId: currentTenant.id,
    },
  });
}
