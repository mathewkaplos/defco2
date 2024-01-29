import { RouteConfig } from '@asteasolutions/zod-to-openapi';
import { customerFindSchema } from 'src/features/customer/customerSchemas';
import { permissions } from 'src/features/permissions';
import { validateHasPermission } from 'src/features/security';
import { prismaAuth } from 'src/prisma';
import { AppContext } from 'src/shared/controller/appContext';
import { filePopulateDownloadUrlInTree } from 'src/features/file/fileService';

export const customerFindApiDoc: RouteConfig = {
  method: 'get',
  path: '/api/customer/{id}',
  request: {
    params: customerFindSchema,
  },
  responses: {
    200: {
      description: 'Customer',
    },
  },
};

export async function customerFindController(
  params: unknown,
  context: AppContext,
) {
  const { currentTenant } = validateHasPermission(
    permissions.customerRead,
    context,
  );

  const { id } = customerFindSchema.parse(params);

  const prisma = prismaAuth(context);

  let customer = await prisma.customer.findUnique({
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
