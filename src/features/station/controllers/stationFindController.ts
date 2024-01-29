import { RouteConfig } from '@asteasolutions/zod-to-openapi';
import { stationFindSchema } from 'src/features/station/stationSchemas';
import { permissions } from 'src/features/permissions';
import { validateHasPermission } from 'src/features/security';
import { prismaAuth } from 'src/prisma';
import { AppContext } from 'src/shared/controller/appContext';
import { filePopulateDownloadUrlInTree } from 'src/features/file/fileService';

export const stationFindApiDoc: RouteConfig = {
  method: 'get',
  path: '/api/station/{id}',
  request: {
    params: stationFindSchema,
  },
  responses: {
    200: {
      description: 'Station',
    },
  },
};

export async function stationFindController(
  params: unknown,
  context: AppContext,
) {
  const { currentTenant } = validateHasPermission(
    permissions.stationRead,
    context,
  );

  const { id } = stationFindSchema.parse(params);

  const prisma = prismaAuth(context);

  let station = await prisma.station.findUnique({
    where: {
      id_tenantId: {
        id,
        tenantId: currentTenant.id,
      },
    },
    include: {
      supervisor: true,
      dispensers: true,
      tanks: true,
      sales: true,
      devices: true,
      createdByMembership: true,
      updatedByMembership: true,
    },
  });

  station = await filePopulateDownloadUrlInTree(station);

  return station;
}
