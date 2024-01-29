import { RouteConfig } from '@asteasolutions/zod-to-openapi';
import {
  vehicleUpdateBodyInputSchema,
  vehicleUpdateParamsInputSchema,
} from 'src/features/vehicle/vehicleSchemas';
import { filePopulateDownloadUrlInTree } from 'src/features/file/fileService';
import { permissions } from 'src/features/permissions';
import { validateHasPermission } from 'src/features/security';
import { prismaAuth } from 'src/prisma';
import { AppContext } from 'src/shared/controller/appContext';
import { prismaRelationship } from 'src/prisma/prismaRelationship';

export const vehicleUpdateApiDoc: RouteConfig = {
  method: 'put',
  path: '/api/vehicle/{id}',
  request: {
    params: vehicleUpdateParamsInputSchema,
    body: {
      content: {
        'application/json': {
          schema: vehicleUpdateBodyInputSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: 'Vehicle',
    },
  },
};

export async function vehicleUpdateController(
  params: unknown,
  body: unknown,
  context: AppContext,
) {
  const { currentTenant } = validateHasPermission(
    permissions.vehicleUpdate,
    context,
  );

  const { id } = vehicleUpdateParamsInputSchema.parse(params);

  const data = vehicleUpdateBodyInputSchema.parse(body);

  const prisma = prismaAuth(context);



  await prisma.vehicle.update({
    where: {
      id_tenantId: {
        id,
        tenantId: currentTenant.id,
      },
    },
    data: {
      make: data.make,
      regNo: data.regNo,
      cc: data.cc,
      fullTank: data.fullTank,
      approved: data.approved,
      customer: prismaRelationship.connectOrDisconnectOne(data.customer),
      approvedBy: prismaRelationship.connectOrDisconnectOne(data.approvedBy),
    },
  });

  let vehicle = await prisma.vehicle.findUniqueOrThrow({
    where: {
      id_tenantId: {
        id,
        tenantId: currentTenant.id,
      },
    },
    include: {
      customer: true,
      approvedBy: true,
      vouchers: true,
      createdByMembership: true,
      updatedByMembership: true,
    },
  });

  vehicle = await filePopulateDownloadUrlInTree(vehicle);

  return vehicle;
}
