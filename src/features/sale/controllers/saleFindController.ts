import { RouteConfig } from '@asteasolutions/zod-to-openapi';
import { saleFindSchema } from 'src/features/sale/saleSchemas';
import { permissions } from 'src/features/permissions';
import { validateHasPermission } from 'src/features/security';
import { prismaAuth } from 'src/prisma';
import { AppContext } from 'src/shared/controller/appContext';
import { filePopulateDownloadUrlInTree } from 'src/features/file/fileService';

export const saleFindApiDoc: RouteConfig = {
  method: 'get',
  path: '/api/sale/{id}',
  request: {
    params: saleFindSchema,
  },
  responses: {
    200: {
      description: 'Sale',
    },
  },
};

export async function saleFindController(
  params: unknown,
  context: AppContext,
) {
  const { currentTenant } = validateHasPermission(
    permissions.saleRead,
    context,
  );

  const { id } = saleFindSchema.parse(params);

  const prisma = prismaAuth(context);

  let sale = await prisma.sale.findUnique({
    where: {
      id_tenantId: {
        id,
        tenantId: currentTenant.id,
      },
    },
    include: {
      customer: true,
      station: true,
      createdByMembership: true,
      updatedByMembership: true,
    },
  });

  sale = await filePopulateDownloadUrlInTree(sale);

  return sale;
}
