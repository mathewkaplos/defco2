import { RouteConfig } from '@asteasolutions/zod-to-openapi';
import {
  materialReceiptUpdateBodyInputSchema,
  materialReceiptUpdateParamsInputSchema,
} from 'src/features/materialReceipt/materialReceiptSchemas';
import { filePopulateDownloadUrlInTree } from 'src/features/file/fileService';
import { permissions } from 'src/features/permissions';
import { validateHasPermission } from 'src/features/security';
import { prismaAuth } from 'src/prisma';
import { AppContext } from 'src/shared/controller/appContext';
import { prismaRelationship } from 'src/prisma/prismaRelationship';

export const materialReceiptUpdateApiDoc: RouteConfig = {
  method: 'put',
  path: '/api/materialReceipt/{id}',
  request: {
    params: materialReceiptUpdateParamsInputSchema,
    body: {
      content: {
        'application/json': {
          schema: materialReceiptUpdateBodyInputSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: 'MaterialReceipt',
    },
  },
};

export async function materialReceiptUpdateController(
  params: unknown,
  body: unknown,
  context: AppContext,
) {
  const { currentTenant } = validateHasPermission(
    permissions.materialReceiptUpdate,
    context,
  );

  const { id } = materialReceiptUpdateParamsInputSchema.parse(params);

  const data = materialReceiptUpdateBodyInputSchema.parse(body);

  const prisma = prismaAuth(context);



  await prisma.materialReceipt.update({
    where: {
      id_tenantId: {
        id,
        tenantId: currentTenant.id,
      },
    },
    data: {
      date1: data.date1,
      supplier: data.supplier,
      quantity: data.quantity,
      price: data.price,
      total: data.total,
      product: prismaRelationship.connectOrDisconnectOne(data.product),
    },
  });

  let materialReceipt = await prisma.materialReceipt.findUniqueOrThrow({
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
