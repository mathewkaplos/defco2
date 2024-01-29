import { RouteConfig } from '@asteasolutions/zod-to-openapi';
import { customerDestroyManyInputSchema } from 'src/features/customer/customerSchemas';
import { permissions } from 'src/features/permissions';
import { validateHasPermission } from 'src/features/security';
import { prismaAuth } from 'src/prisma';
import { AppContext } from 'src/shared/controller/appContext';
import Error400 from 'src/shared/errors/Error400';
import { formatTranslation } from 'src/translation/formatTranslation';

export const customerDestroyManyApiDoc: RouteConfig = {
  method: 'delete',
  path: '/api/customer',
  request: {
    query: customerDestroyManyInputSchema,
  },
  responses: {
    200: {
      description: 'OK',
    },
  },
};

export async function customerDestroyManyController(
  query: unknown,
  context: AppContext,
) {
  const { currentTenant } = validateHasPermission(
    permissions.customerDestroy,
    context,
  );

  const { ids } = customerDestroyManyInputSchema.parse(query);

  const prisma = prismaAuth(context);



  return await prisma.customer.deleteMany({
    where: {
      id: { in: ids },
      tenantId: currentTenant.id,
    },
  });
}
