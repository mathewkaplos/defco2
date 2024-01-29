import { RouteConfig } from '@asteasolutions/zod-to-openapi';
import { customerCreateInputSchema } from 'src/features/customer/customerSchemas';
import { filePopulateDownloadUrlInTree } from 'src/features/file/fileService';
import { permissions } from 'src/features/permissions';
import { validateHasPermission } from 'src/features/security';
import { prismaAuth } from 'src/prisma';
import { AppContext } from 'src/shared/controller/appContext';
import { prismaRelationship } from 'src/prisma/prismaRelationship';

export const customerCreateApiDoc: RouteConfig = {
  method: 'post',
  path: '/api/customer',
  request: {
    body: {
      content: {
        'application/json': {
          schema: customerCreateInputSchema,
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

export async function customerCreateController(
  body: unknown,
  context: AppContext,
) {
  validateHasPermission(permissions.customerCreate, context);
  return await customerCreate(body, context);
}

export async function customerCreate(body: unknown, context: AppContext) {
  const data = customerCreateInputSchema.parse(body);

  const prisma = prismaAuth(context);



  let customer = await prisma.customer.create({
    data: {
      firstName: data.firstName,
      lastName: data.lastName,
      otherNames: data.otherNames,
      gender: data.gender,
      serviceNo: data.serviceNo,
      entitledCards: data.entitledCards,
      status: data.status,
      rank: prismaRelationship.connectOne(data.rank),
      vehicles: prismaRelationship.connectMany(data.vehicles),
      importHash: data.importHash,
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
