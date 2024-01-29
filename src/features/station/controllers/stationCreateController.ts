import { RouteConfig } from '@asteasolutions/zod-to-openapi';
import { stationCreateInputSchema } from 'src/features/station/stationSchemas';
import { filePopulateDownloadUrlInTree } from 'src/features/file/fileService';
import { permissions } from 'src/features/permissions';
import { validateHasPermission } from 'src/features/security';
import { prismaAuth } from 'src/prisma';
import { AppContext } from 'src/shared/controller/appContext';
import { prismaRelationship } from 'src/prisma/prismaRelationship';

export const stationCreateApiDoc: RouteConfig = {
  method: 'post',
  path: '/api/station',
  request: {
    body: {
      content: {
        'application/json': {
          schema: stationCreateInputSchema,
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

export async function stationCreateController(
  body: unknown,
  context: AppContext,
) {
  validateHasPermission(permissions.stationCreate, context);
  return await stationCreate(body, context);
}

export async function stationCreate(body: unknown, context: AppContext) {
  const data = stationCreateInputSchema.parse(body);

  const prisma = prismaAuth(context);



  let station = await prisma.station.create({
    data: {
      name: data.name,
      description: data.description,
      location: data.location,
      supervisor: prismaRelationship.connectOne(data.supervisor),
      importHash: data.importHash,
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
