import { RouteConfig } from '@asteasolutions/zod-to-openapi';
import {
  saleUpdateBodyInputSchema,
  saleUpdateParamsInputSchema,
} from 'src/features/sale/saleSchemas';
import { filePopulateDownloadUrlInTree } from 'src/features/file/fileService';
import { permissions } from 'src/features/permissions';
import { validateHasPermission } from 'src/features/security';
import { prismaAuth } from 'src/prisma';
import { AppContext } from 'src/shared/controller/appContext';
import { prismaRelationship } from 'src/prisma/prismaRelationship';

export const saleUpdateApiDoc: RouteConfig = {
  method: 'put',
  path: '/api/sale/{id}',
  request: {
    params: saleUpdateParamsInputSchema,
    body: {
      content: {
        'application/json': {
          schema: saleUpdateBodyInputSchema,
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

export async function saleUpdateController(
  params: unknown,
  body: unknown,
  context: AppContext,
) {
  const { currentTenant } = validateHasPermission(
    permissions.saleUpdate,
    context,
  );

  const { id } = saleUpdateParamsInputSchema.parse(params);

  const data = saleUpdateBodyInputSchema.parse(body);

  const prisma = prismaAuth(context);



  await prisma.sale.update({
    where: {
      id_tenantId: {
        id,
        tenantId: currentTenant.id,
      },
    },
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
      customer: prismaRelationship.connectOrDisconnectOne(data.customer),
      station: prismaRelationship.connectOrDisconnectOne(data.station),
    },
  });

  let sale = await prisma.sale.findUniqueOrThrow({
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
