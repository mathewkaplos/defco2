import { RouteConfig } from '@asteasolutions/zod-to-openapi';
import { Prisma } from '@prisma/client';
import dayjs from 'dayjs';
import { tankFindManyInputSchema } from 'src/features/tank/tankSchemas';
import { permissions } from 'src/features/permissions';
import { validateHasPermission } from 'src/features/security';
import { prismaAuth } from 'src/prisma';
import { AppContext } from 'src/shared/controller/appContext';
import { filePopulateDownloadUrlInTree } from 'src/features/file/fileService';

export const tankFindManyApiDoc: RouteConfig = {
  method: 'get',
  path: '/api/tank',
  request: {
    query: tankFindManyInputSchema,
  },
  responses: {
    200: {
      description: '{ tanks: Tank[], count: number }',
    },
  },
};

export async function tankFindManyController(
  query: unknown,
  context: AppContext,
) {
  const { currentTenant } = validateHasPermission(
    permissions.tankRead,
    context,
  );

  const { filter, orderBy, skip, take } =
    tankFindManyInputSchema.parse(query);

  const whereAnd: Array<Prisma.TankWhereInput> = [];

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

  if (filter?.capacityRange?.length) {
    const start = filter.capacityRange?.[0];
    const end = filter.capacityRange?.[1];

    if (start != null) {
      whereAnd.push({
        capacity: { gte: start },
      });
    }

    if (end != null) {
      whereAnd.push({
        capacity: { lte: end },
      });
    }
  }

  const prisma = prismaAuth(context);

  let tanks = await prisma.tank.findMany({
    where: {
      AND: whereAnd,
    },
    skip,
    take,
    orderBy,
  });

  const count = await prisma.tank.count({
    where: {
      AND: whereAnd,
    },
  });

  tanks = await filePopulateDownloadUrlInTree(tanks);

  return { tanks, count };
}
