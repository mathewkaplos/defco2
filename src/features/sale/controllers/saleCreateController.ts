import { RouteConfig } from '@asteasolutions/zod-to-openapi';
import { saleCreateInputSchema } from 'src/features/sale/saleSchemas';
import { filePopulateDownloadUrlInTree } from 'src/features/file/fileService';
import { permissions } from 'src/features/permissions';
import { validateHasPermission } from 'src/features/security';
import { prismaAuth } from 'src/prisma';
import { AppContext } from 'src/shared/controller/appContext';
import { prismaRelationship } from 'src/prisma/prismaRelationship';

export const saleCreateApiDoc: RouteConfig = {
  method: 'post',
  path: '/api/sale',
  request: {
    body: {
      content: {
        'application/json': {
          schema: saleCreateInputSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: 'Sale',
    },
  },
};

export async function saleCreateController(
  body: unknown,
  context: AppContext,
) {
  validateHasPermission(permissions.saleCreate, context);
  return await saleCreate(body, context);
}

export async function saleCreate(body: unknown, context: AppContext) {
  const data = saleCreateInputSchema.parse(body);

  const prisma = prismaAuth(context);



  let sale = await prisma.sale.create({
    data: {
      date1: data.date1,
      fuelType: data.fuelType,
      litres: data.litres,
      rate: data.rate,
      total: data.total,
      paymode: data.paymode,
      cashAmount: data.cashAmount,
      mpesaAmount: data.mpesaAmount,
      invoiceAmount: data.invoiceAmount,
      customer: prismaRelationship.connectOne(data.customer),
      station: prismaRelationship.connectOne(data.station),
      importHash: data.importHash,
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
