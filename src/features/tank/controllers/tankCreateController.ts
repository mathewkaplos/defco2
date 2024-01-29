import { RouteConfig } from '@asteasolutions/zod-to-openapi';
import { tankCreateInputSchema } from 'src/features/tank/tankSchemas';
import { filePopulateDownloadUrlInTree } from 'src/features/file/fileService';
import { permissions } from 'src/features/permissions';
import { validateHasPermission } from 'src/features/security';
import { prismaAuth } from 'src/prisma';
import { AppContext } from 'src/shared/controller/appContext';
import { prismaRelationship } from 'src/prisma/prismaRelationship';

export const tankCreateApiDoc: RouteConfig = {
  method: 'post',
  path: '/api/tank',
  request: {
    body: {
      content: {
        'application/json': {
          schema: tankCreateInputSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: 'Tank',
    },
  },
};

export async function tankCreateController(
  body: unknown,
  context: AppContext,
) {
  validateHasPermission(permissions.tankCreate, context);
  return await tankCreate(body, context);
}

export async function tankCreate(body: unknown, context: AppContext) {
  const data = tankCreateInputSchema.parse(body);

  const prisma = prismaAuth(context);



  let tank = await prisma.tank.create({
    data: {
      name: data.name,
      capacity: data.capacity,
      station: prismaRelationship.connectOne(data.station),
      importHash: data.importHash,
    },
    include: {
      station: true,
      createdByMembership: true,
      updatedByMembership: true,
    },
  });

  tank = await filePopulateDownloadUrlInTree(tank);

  return tank;
}
