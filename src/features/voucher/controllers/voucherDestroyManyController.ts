import { RouteConfig } from '@asteasolutions/zod-to-openapi';
import { voucherDestroyManyInputSchema } from 'src/features/voucher/voucherSchemas';
import { permissions } from 'src/features/permissions';
import { validateHasPermission } from 'src/features/security';
import { prismaAuth } from 'src/prisma';
import { AppContext } from 'src/shared/controller/appContext';
import Error400 from 'src/shared/errors/Error400';
import { formatTranslation } from 'src/translation/formatTranslation';

export const voucherDestroyManyApiDoc: RouteConfig = {
  method: 'delete',
  path: '/api/voucher',
  request: {
    query: voucherDestroyManyInputSchema,
  },
  responses: {
    200: {
      description: 'OK',
    },
  },
};

export async function voucherDestroyManyController(
  query: unknown,
  context: AppContext,
) {
  const { currentTenant } = validateHasPermission(
    permissions.voucherDestroy,
    context,
  );

  const { ids } = voucherDestroyManyInputSchema.parse(query);

  const prisma = prismaAuth(context);



  return await prisma.voucher.deleteMany({
    where: {
      id: { in: ids },
      tenantId: currentTenant.id,
    },
  });
}
