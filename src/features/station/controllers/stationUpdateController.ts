import { RouteConfig } from '@asteasolutions/zod-to-openapi';
import {
  stationUpdateBodyInputSchema,
  stationUpdateParamsInputSchema,
} from 'src/features/station/stationSchemas';
import { filePopulateDownloadUrlInTree } from 'src/features/file/fileService';
import { permissions } from 'src/features/permissions';
import { validateHasPermission } from 'src/features/security';
import { prismaAuth } from 'src/prisma';
import { AppContext } from 'src/shared/controller/appContext';
import { prismaRelationship } from 'src/prisma/prismaRelationship';

export const stationUpdateApiDoc: RouteConfig = {
  method: 'put',
  path: '/api/station/{id}',
  request: {
    params: stationUpdateParamsInputSchema,
    body: {
      content: {
        'application/json': {
          schema: stationUpdateBodyInputSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: 'Station',
    },
  },
};

export async function stationUpdateController(
  params: unknown,
  body: unknown,
  context: AppContext,
) {
  const { currentTenant } = validateHasPermission(
    permissions.stationUpdate,
    context,
  );

  const { id } = stationUpdateParamsInputSchema.parse(params);

  const data = stationUpdateBodyInputSchema.parse(body);

  const prisma = prismaAuth(context);



  await prisma.station.update({
    where: {
      id_tenantId: {
        id,
        tenantId: currentTenant.id,
      },
    },
    data: {
      name: data.name,
      description: data.description,
      location: data.location,
      supervisor: prismaRelationship.connectOrDisconnectOne(data.supervisor),
    },
  });

  let station = await prisma.station.findUniqueOrThrow({
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
