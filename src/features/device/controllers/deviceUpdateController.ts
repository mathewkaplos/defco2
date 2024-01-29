import { RouteConfig } from '@asteasolutions/zod-to-openapi';
import {
  deviceUpdateBodyInputSchema,
  deviceUpdateParamsInputSchema,
} from 'src/features/device/deviceSchemas';
import { filePopulateDownloadUrlInTree } from 'src/features/file/fileService';
import { permissions } from 'src/features/permissions';
import { validateHasPermission } from 'src/features/security';
import { prismaAuth } from 'src/prisma';
import { AppContext } from 'src/shared/controller/appContext';
import { prismaRelationship } from 'src/prisma/prismaRelationship';

export const deviceUpdateApiDoc: RouteConfig = {
  method: 'put',
  path: '/api/device/{id}',
  request: {
    params: deviceUpdateParamsInputSchema,
    body: {
      content: {
        'application/json': {
          schema: deviceUpdateBodyInputSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: 'Device',
    },
  },
};

export async function deviceUpdateController(
  params: unknown,
  body: unknown,
  context: AppContext,
) {
  const { currentTenant } = validateHasPermission(
    permissions.deviceUpdate,
    context,
  );

  const { id } = deviceUpdateParamsInputSchema.parse(params);

  const data = deviceUpdateBodyInputSchema.parse(body);

  const prisma = prismaAuth(context);



  await prisma.device.update({
    where: {
      id_tenantId: {
        id,
        tenantId: currentTenant.id,
      },
    },
    data: {
      deviceId: data.deviceId,
      description: data.description,
      station: prismaRelationship.connectOrDisconnectOne(data.station),
    },
  });

  let device = await prisma.device.findUniqueOrThrow({
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
