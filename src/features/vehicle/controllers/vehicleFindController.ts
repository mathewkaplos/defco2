import { RouteConfig } from '@asteasolutions/zod-to-openapi';
import { vehicleFindSchema } from 'src/features/vehicle/vehicleSchemas';
import { permissions } from 'src/features/permissions';
import { validateHasPermission } from 'src/features/security';
import { prismaAuth } from 'src/prisma';
import { AppContext } from 'src/shared/controller/appContext';
import { filePopulateDownloadUrlInTree } from 'src/features/file/fileService';

export const vehicleFindApiDoc: RouteConfig = {
  method: 'get',
  path: '/api/vehicle/{id}',
  request: {
    params: vehicleFindSchema,
  },
  responses: {
    200: {
      description: 'Vehicle',
    },
  },
};

export async function vehicleFindController(
  params: unknown,
  context: AppContext,
) {
  const { currentTenant } = validateHasPermission(
    permissions.vehicleRead,
    context,
  );

  const { id } = vehicleFindSchema.parse(params);

  const prisma = prismaAuth(context);

  let vehicle = await prisma.vehicle.findUnique({
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
