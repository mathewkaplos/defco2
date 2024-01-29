import { RouteConfig } from '@asteasolutions/zod-to-openapi';
import { deviceCreateInputSchema } from 'src/features/device/deviceSchemas';
import { filePopulateDownloadUrlInTree } from 'src/features/file/fileService';
import { permissions } from 'src/features/permissions';
import { validateHasPermission } from 'src/features/security';
import { prismaAuth } from 'src/prisma';
import { AppContext } from 'src/shared/controller/appContext';
import { prismaRelationship } from 'src/prisma/prismaRelationship';

export const deviceCreateApiDoc: RouteConfig = {
  method: 'post',
  path: '/api/device',
  request: {
    body: {
      content: {
        'application/json': {
          schema: deviceCreateInputSchema,
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

export async function deviceCreateController(
  body: unknown,
  context: AppContext,
) {
  validateHasPermission(permissions.deviceCreate, context);
  return await deviceCreate(body, context);
}

export async function deviceCreate(body: unknown, context: AppContext) {
  const data = deviceCreateInputSchema.parse(body);

  const prisma = prismaAuth(context);



  let device = await prisma.device.create({
    data: {
      deviceId: data.deviceId,
      description: data.description,
      station: prismaRelationship.connectOne(data.station),
      importHash: data.importHash,
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
