import { RouteConfig } from '@asteasolutions/zod-to-openapi';
import { deviceFindSchema } from 'src/features/device/deviceSchemas';
import { permissions } from 'src/features/permissions';
import { validateHasPermission } from 'src/features/security';
import { prismaAuth } from 'src/prisma';
import { AppContext } from 'src/shared/controller/appContext';
import { filePopulateDownloadUrlInTree } from 'src/features/file/fileService';

export const deviceFindApiDoc: RouteConfig = {
  method: 'get',
  path: '/api/device/{id}',
  request: {
    params: deviceFindSchema,
  },
  responses: {
    200: {
      description: 'Device',
    },
  },
};

export async function deviceFindController(
  params: unknown,
  context: AppContext,
) {
  const { currentTenant } = validateHasPermission(
    permissions.deviceRead,
    context,
  );

  const { id } = deviceFindSchema.parse(params);

  const prisma = prismaAuth(context);

  let device = await prisma.device.findUnique({
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

  device = await filePopulateDownloadUrlInTree(device);

  return device;
}
