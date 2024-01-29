import { RouteConfig } from '@asteasolutions/zod-to-openapi';
import { tankFindSchema } from 'src/features/tank/tankSchemas';
import { permissions } from 'src/features/permissions';
import { validateHasPermission } from 'src/features/security';
import { prismaAuth } from 'src/prisma';
import { AppContext } from 'src/shared/controller/appContext';
import { filePopulateDownloadUrlInTree } from 'src/features/file/fileService';

export const tankFindApiDoc: RouteConfig = {
  method: 'get',
  path: '/api/tank/{id}',
  request: {
    params: tankFindSchema,
  },
  responses: {
    200: {
      description: 'Tank',
    },
  },
};

export async function tankFindController(
  params: unknown,
  context: AppContext,
) {
  const { currentTenant } = validateHasPermission(
    permissions.tankRead,
    context,
  );

  const { id } = tankFindSchema.parse(params);

  const prisma = prismaAuth(context);

  let tank = await prisma.tank.findUnique({
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
