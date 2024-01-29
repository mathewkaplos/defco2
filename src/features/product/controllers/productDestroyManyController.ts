import { RouteConfig } from '@asteasolutions/zod-to-openapi';
import { productDestroyManyInputSchema } from 'src/features/product/productSchemas';
import { permissions } from 'src/features/permissions';
import { validateHasPermission } from 'src/features/security';
import { prismaAuth } from 'src/prisma';
import { AppContext } from 'src/shared/controller/appContext';
import Error400 from 'src/shared/errors/Error400';
import { formatTranslation } from 'src/translation/formatTranslation';

export const productDestroyManyApiDoc: RouteConfig = {
  method: 'delete',
  path: '/api/product',
  request: {
    query: productDestroyManyInputSchema,
  },
  responses: {
    200: {
      description: 'OK',
    },
  },
};

export async function productDestroyManyController(
  query: unknown,
  context: AppContext,
) {
  const { currentTenant } = validateHasPermission(
    permissions.productDestroy,
    context,
  );

  const { ids } = productDestroyManyInputSchema.parse(query);

  const prisma = prismaAuth(context);



  return await prisma.product.deleteMany({
    where: {
      id: { in: ids },
      tenantId: currentTenant.id,
    },
  });
}
