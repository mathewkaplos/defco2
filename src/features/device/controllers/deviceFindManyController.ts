import { RouteConfig } from '@asteasolutions/zod-to-openapi';
import { Prisma } from '@prisma/client';
import dayjs from 'dayjs';
import { deviceFindManyInputSchema } from 'src/features/device/deviceSchemas';
import { permissions } from 'src/features/permissions';
import { validateHasPermission } from 'src/features/security';
import { prismaAuth } from 'src/prisma';
import { AppContext } from 'src/shared/controller/appContext';
import { filePopulateDownloadUrlInTree } from 'src/features/file/fileService';

export const deviceFindManyApiDoc: RouteConfig = {
  method: 'get',
  path: '/api/device',
  request: {
    query: deviceFindManyInputSchema,
  },
  responses: {
    200: {
      description: '{ devices: Device[], count: number }',
    },
  },
};

export async function deviceFindManyController(
  query: unknown,
  context: AppContext,
) {
  const { currentTenant } = validateHasPermission(
    permissions.deviceRead,
    context,
  );

  const { filter, orderBy, skip, take } =
    deviceFindManyInputSchema.parse(query);

  const whereAnd: Array<Prisma.DeviceWhereInput> = [];

  whereAnd.push({
    tenant: {
      id: currentTenant.id,
    },
  });

  if (filter?.deviceId != null) {
    whereAnd.push({
      deviceId: { contains: filter?.deviceId, mode: 'insensitive' },
    });
  }

  if (filter?.description != null) {
    whereAnd.push({
      description: { contains: filter?.description, mode: 'insensitive' },
    });
  }

  const prisma = prismaAuth(context);

  let devices = await prisma.device.findMany({
    where: {
      AND: whereAnd,
    },
    skip,
    take,
    orderBy,
  });

  const count = await prisma.device.count({
    where: {
      AND: whereAnd,
    },
  });

  devices = await filePopulateDownloadUrlInTree(devices);

  return { devices, count };
}
