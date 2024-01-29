import { RouteConfig } from '@asteasolutions/zod-to-openapi';
import {
  tankUpdateBodyInputSchema,
  tankUpdateParamsInputSchema,
} from 'src/features/tank/tankSchemas';
import { filePopulateDownloadUrlInTree } from 'src/features/file/fileService';
import { permissions } from 'src/features/permissions';
import { validateHasPermission } from 'src/features/security';
import { prismaAuth } from 'src/prisma';
import { AppContext } from 'src/shared/controller/appContext';
import { prismaRelationship } from 'src/prisma/prismaRelationship';

export const tankUpdateApiDoc: RouteConfig = {
  method: 'put',
  path: '/api/tank/{id}',
  request: {
    params: tankUpdateParamsInputSchema,
    body: {
      content: {
        'application/json': {
          schema: tankUpdateBodyInputSchema,
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

export async function tankUpdateController(
  params: unknown,
  body: unknown,
  context: AppContext,
) {
  const { currentTenant } = validateHasPermission(
    permissions.tankUpdate,
    context,
  );

  const { id } = tankUpdateParamsInputSchema.parse(params);

  const data = tankUpdateBodyInputSchema.parse(body);

  const prisma = prismaAuth(context);



  await prisma.tank.update({
    where: {
      id_tenantId: {
        id,
        tenantId: currentTenant.id,
      },
    },
    data: {
      name: data.name,
      capacity: data.capacity,
      station: prismaRelationship.connectOrDisconnectOne(data.station),
    },
  });

  let tank = await prisma.tank.findUniqueOrThrow({
    where: {
      id_tenantId: {
        id,
        tenantId: currentTenant.id,
      },
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
