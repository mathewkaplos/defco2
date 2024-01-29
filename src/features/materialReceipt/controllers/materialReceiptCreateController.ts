import { RouteConfig } from '@asteasolutions/zod-to-openapi';
import { materialReceiptCreateInputSchema } from 'src/features/materialReceipt/materialReceiptSchemas';
import { filePopulateDownloadUrlInTree } from 'src/features/file/fileService';
import { permissions } from 'src/features/permissions';
import { validateHasPermission } from 'src/features/security';
import { prismaAuth } from 'src/prisma';
import { AppContext } from 'src/shared/controller/appContext';
import { prismaRelationship } from 'src/prisma/prismaRelationship';

export const materialReceiptCreateApiDoc: RouteConfig = {
  method: 'post',
  path: '/api/material-receipt',
  request: {
    body: {
      content: {
        'application/json': {
          schema: materialReceiptCreateInputSchema,
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

export async function materialReceiptCreateController(
  body: unknown,
  context: AppContext,
) {
  validateHasPermission(permissions.materialReceiptCreate, context);
  return await materialReceiptCreate(body, context);
}

export async function materialReceiptCreate(body: unknown, context: AppContext) {
  const data = materialReceiptCreateInputSchema.parse(body);

  const prisma = prismaAuth(context);



  let materialReceipt = await prisma.materialReceipt.create({
    data: {
      date1: data.date1,
      supplier: data.supplier,
      quantity: data.quantity,
      price: data.price,
      total: data.total,
      product: prismaRelationship.connectOne(data.product),
      importHash: data.importHash,
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
