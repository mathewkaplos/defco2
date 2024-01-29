import { RouteConfig } from '@asteasolutions/zod-to-openapi';
import { materialReceiptFindSchema } from 'src/features/materialReceipt/materialReceiptSchemas';
import { permissions } from 'src/features/permissions';
import { validateHasPermission } from 'src/features/security';
import { prismaAuth } from 'src/prisma';
import { AppContext } from 'src/shared/controller/appContext';
import { filePopulateDownloadUrlInTree } from 'src/features/file/fileService';

export const materialReceiptFindApiDoc: RouteConfig = {
  method: 'get',
  path: '/api/material-receipt/{id}',
  request: {
    params: materialReceiptFindSchema,
  },
  responses: {
    200: {
      description: 'MaterialReceipt',
    },
  },
};

export async function materialReceiptFindController(
  params: unknown,
  context: AppContext,
) {
  const { currentTenant } = validateHasPermission(
    permissions.materialReceiptRead,
    context,
  );

  const { id } = materialReceiptFindSchema.parse(params);

  const prisma = prismaAuth(context);

  let materialReceipt = await prisma.materialReceipt.findUnique({
    where: {
      id_tenantId: {
        id,
        tenantId: currentTenant.id,
      },
    },
    include: {
      product: true,
      createdByMembership: true,
      updatedByMembership: true,
    },
  });

  materialReceipt = await filePopulateDownloadUrlInTree(materialReceipt);

  return materialReceipt;
}
