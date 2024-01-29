import { RouteConfig } from '@asteasolutions/zod-to-openapi';
import { Prisma } from '@prisma/client';
import dayjs from 'dayjs';
import { stationFindManyInputSchema } from 'src/features/station/stationSchemas';
import { permissions } from 'src/features/permissions';
import { validateHasPermission } from 'src/features/security';
import { prismaAuth } from 'src/prisma';
import { AppContext } from 'src/shared/controller/appContext';
import { filePopulateDownloadUrlInTree } from 'src/features/file/fileService';

export const stationFindManyApiDoc: RouteConfig = {
  method: 'get',
  path: '/api/station',
  request: {
    query: stationFindManyInputSchema,
  },
  responses: {
    200: {
      description: '{ stations: Station[], count: number }',
    },
  },
};

export async function stationFindManyController(
  query: unknown,
  context: AppContext,
) {
  const { currentTenant } = validateHasPermission(
    permissions.stationRead,
    context,
  );

  const { filter, orderBy, skip, take } =
    stationFindManyInputSchema.parse(query);

  const whereAnd: Array<Prisma.StationWhereInput> = [];

  whereAnd.push({
    tenant: {
      id: currentTenant.id,
    },
  });

  if (filter?.name != null) {
    whereAnd.push({
      name: { contains: filter?.name, mode: 'insensitive' },
    });
  }

  if (filter?.description != null) {
    whereAnd.push({
      description: { contains: filter?.description, mode: 'insensitive' },
    });
  }

  if (filter?.location != null) {
    whereAnd.push({
      location: { contains: filter?.location, mode: 'insensitive' },
    });
  }

  const prisma = prismaAuth(context);

  let stations = await prisma.station.findMany({
    where: {
      AND: whereAnd,
    },
    skip,
    take,
    orderBy,
  });

  const count = await prisma.station.count({
    where: {
      AND: whereAnd,
    },
  });

  stations = await filePopulateDownloadUrlInTree(stations);

  return { stations, count };
}
