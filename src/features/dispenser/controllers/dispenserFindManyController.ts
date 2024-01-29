import { RouteConfig } from '@asteasolutions/zod-to-openapi';
import { Prisma } from '@prisma/client';
import dayjs from 'dayjs';
import { dispenserFindManyInputSchema } from 'src/features/dispenser/dispenserSchemas';
import { permissions } from 'src/features/permissions';
import { validateHasPermission } from 'src/features/security';
import { prismaAuth } from 'src/prisma';
import { AppContext } from 'src/shared/controller/appContext';
import { filePopulateDownloadUrlInTree } from 'src/features/file/fileService';

export const dispenserFindManyApiDoc: RouteConfig = {
  method: 'get',
  path: '/api/dispenser',
  request: {
    query: dispenserFindManyInputSchema,
  },
  responses: {
    200: {
      description: '{ dispensers: Dispenser[], count: number }',
    },
  },
};

export async function dispenserFindManyController(
  query: unknown,
  context: AppContext,
) {
  const { currentTenant } = validateHasPermission(
    permissions.dispenserRead,
    context,
  );

  const { filter, orderBy, skip, take } =
    dispenserFindManyInputSchema.parse(query);

  const whereAnd: Array<Prisma.DispenserWhereInput> = [];

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

  if (filter?.model != null) {
    whereAnd.push({
      model: { contains: filter?.model, mode: 'insensitive' },
    });
  }

  if (filter?.fuelType != null) {
    whereAnd.push({
      fuelType: filter?.fuelType,
    });
  }

  const prisma = prismaAuth(context);

  let dispensers = await prisma.dispenser.findMany({
    where: {
      AND: whereAnd,
    },
    skip,
    take,
    orderBy,
  });

  const count = await prisma.dispenser.count({
    where: {
      AND: whereAnd,
    },
  });

  dispensers = await filePopulateDownloadUrlInTree(dispensers);

  return { dispensers, count };
}
