import { RouteConfig } from '@asteasolutions/zod-to-openapi';
import { saleDestroyManyInputSchema } from 'src/features/sale/saleSchemas';
import { permissions } from 'src/features/permissions';
import { validateHasPermission } from 'src/features/security';
import { prismaAuth } from 'src/prisma';
import { AppContext } from 'src/shared/controller/appContext';
import Error400 from 'src/shared/errors/Error400';
import { formatTranslation } from 'src/translation/formatTranslation';

export const saleDestroyManyApiDoc: RouteConfig = {
  method: 'delete',
  path: '/api/sale',
  request: {
    query: saleDestroyManyInputSchema,
  },
  responses: {
    200: {
      description: 'OK',
    },
  },
};

export async function saleDestroyManyController(
  query: unknown,
  context: AppContext,
) {
  const { currentTenant } = validateHasPermission(
    permissions.saleDestroy,
    context,
  );

  const { ids } = saleDestroyManyInputSchema.parse(query);

  const prisma = prismaAuth(context);



  return await prisma.sale.deleteMany({
    where: {
      id: { in: ids },
      tenantId: currentTenant.id,
    },
  });
}
