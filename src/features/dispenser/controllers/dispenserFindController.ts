import { RouteConfig } from '@asteasolutions/zod-to-openapi';
import { dispenserFindSchema } from 'src/features/dispenser/dispenserSchemas';
import { permissions } from 'src/features/permissions';
import { validateHasPermission } from 'src/features/security';
import { prismaAuth } from 'src/prisma';
import { AppContext } from 'src/shared/controller/appContext';
import { filePopulateDownloadUrlInTree } from 'src/features/file/fileService';

export const dispenserFindApiDoc: RouteConfig = {
  method: 'get',
  path: '/api/dispenser/{id}',
  request: {
    params: dispenserFindSchema,
  },
  responses: {
    200: {
      description: 'Dispenser',
    },
  },
};

export async function dispenserFindController(
  params: unknown,
  context: AppContext,
) {
  const { currentTenant } = validateHasPermission(
    permissions.dispenserRead,
    context,
  );

  const { id } = dispenserFindSchema.parse(params);

  const prisma = prismaAuth(context);

  let dispenser = await prisma.dispenser.findUnique({
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

  dispenser = await filePopulateDownloadUrlInTree(dispenser);

  return dispenser;
}
