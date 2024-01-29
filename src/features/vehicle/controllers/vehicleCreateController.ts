import { RouteConfig } from '@asteasolutions/zod-to-openapi';
import { vehicleCreateInputSchema } from 'src/features/vehicle/vehicleSchemas';
import { filePopulateDownloadUrlInTree } from 'src/features/file/fileService';
import { permissions } from 'src/features/permissions';
import { validateHasPermission } from 'src/features/security';
import { prismaAuth } from 'src/prisma';
import { AppContext } from 'src/shared/controller/appContext';
import { prismaRelationship } from 'src/prisma/prismaRelationship';

export const vehicleCreateApiDoc: RouteConfig = {
  method: 'post',
  path: '/api/vehicle',
  request: {
    body: {
      content: {
        'application/json': {
          schema: vehicleCreateInputSchema,
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

export async function vehicleCreateController(
  body: unknown,
  context: AppContext,
) {
  validateHasPermission(permissions.vehicleCreate, context);
  return await vehicleCreate(body, context);
}

export async function vehicleCreate(body: unknown, context: AppContext) {
  const data = vehicleCreateInputSchema.parse(body);

  const prisma = prismaAuth(context);



  let vehicle = await prisma.vehicle.create({
    data: {
      make: data.make,
      regNo: data.regNo,
      cc: data.cc,
      fullTank: data.fullTank,
      approved: data.approved,
      customer: prismaRelationship.connectOne(data.customer),
      approvedBy: prismaRelationship.connectOne(data.approvedBy),
      importHash: data.importHash,
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
