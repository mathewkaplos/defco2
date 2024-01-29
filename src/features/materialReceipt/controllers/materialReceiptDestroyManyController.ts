import { RouteConfig } from '@asteasolutions/zod-to-openapi';
import { materialReceiptDestroyManyInputSchema } from 'src/features/materialReceipt/materialReceiptSchemas';
import { permissions } from 'src/features/permissions';
import { validateHasPermission } from 'src/features/security';
import { prismaAuth } from 'src/prisma';
import { AppContext } from 'src/shared/controller/appContext';
import Error400 from 'src/shared/errors/Error400';
import { formatTranslation } from 'src/translation/formatTranslation';

export const materialReceiptDestroyManyApiDoc: RouteConfig = {
  method: 'delete',
  path: '/api/material-receipt',
  request: {
    query: materialReceiptDestroyManyInputSchema,
  },
  responses: {
    200: {
      description: 'OK',
    },
  },
};

export async function materialReceiptDestroyManyController(
  query: unknown,
  context: AppContext,
) {
  const { currentTenant } = validateHasPermission(
    permissions.materialReceiptDestroy,
    context,
  );

  const { ids } = materialReceiptDestroyManyInputSchema.parse(query);

  const prisma = prismaAuth(context);



  return await prisma.materialReceipt.deleteMany({
    where: {
      id: { in: ids },
      tenantId: currentTenant.id,
    },
  });
}
