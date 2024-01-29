import { RouteConfig } from '@asteasolutions/zod-to-openapi';
import {
  customerUpdateBodyInputSchema,
  customerUpdateParamsInputSchema,
} from 'src/features/customer/customerSchemas';
import { filePopulateDownloadUrlInTree } from 'src/features/file/fileService';
import { permissions } from 'src/features/permissions';
import { validateHasPermission } from 'src/features/security';
import { prismaAuth } from 'src/prisma';
import { AppContext } from 'src/shared/controller/appContext';
import { prismaRelationship } from 'src/prisma/prismaRelationship';

export const customerUpdateApiDoc: RouteConfig = {
  method: 'put',
  path: '/api/customer/{id}',
  request: {
    params: customerUpdateParamsInputSchema,
    body: {
      content: {
        'application/json': {
          schema: customerUpdateBodyInputSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: 'Customer',
    },
  },
};

export async function customerUpdateController(
  params: unknown,
  body: unknown,
  context: AppContext,
) {
  const { currentTenant } = validateHasPermission(
    permissions.customerUpdate,
    context,
  );

  const { id } = customerUpdateParamsInputSchema.parse(params);

  const data = customerUpdateBodyInputSchema.parse(body);

  const prisma = prismaAuth(context);



  await prisma.customer.update({
    where: {
      id_tenantId: {
        id,
        tenantId: currentTenant.id,
      },
    },
    data: {
      firstName: data.firstName,
      lastName: data.lastName,
      otherNames: data.otherNames,
      gender: data.gender,
      serviceNo: data.serviceNo,
      entitledCards: data.entitledCards,
      status: data.status,
      rank: prismaRelationship.connectOrDisconnectOne(data.rank),
      vehicles: prismaRelationship.setMany(data.vehicles),
    },
  });

  let customer = await prisma.customer.findUniqueOrThrow({
    where: {
      id_tenantId: {
        id,
        tenantId: currentTenant.id,
      },
    },
    include: {
      rank: true,
      vehicles: true,
      sales: true,
      cards: true,
      vouchers: true,
      createdByMembership: true,
      updatedByMembership: true,
    },
  });

  customer = await filePopulateDownloadUrlInTree(customer);

  return customer;
}
