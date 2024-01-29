import { RouteConfig } from '@asteasolutions/zod-to-openapi';
import { Prisma } from '@prisma/client';
import dayjs from 'dayjs';
import { rankFindManyInputSchema } from 'src/features/rank/rankSchemas';
import { permissions } from 'src/features/permissions';
import { validateHasPermission } from 'src/features/security';
import { prismaAuth } from 'src/prisma';
import { AppContext } from 'src/shared/controller/appContext';
import { filePopulateDownloadUrlInTree } from 'src/features/file/fileService';

export const rankFindManyApiDoc: RouteConfig = {
  method: 'get',
  path: '/api/rank',
  request: {
    query: rankFindManyInputSchema,
  },
  responses: {
    200: {
      description: '{ ranks: Rank[], count: number }',
    },
  },
};

export async function rankFindManyController(
  query: unknown,
  context: AppContext,
) {
  const { currentTenant } = validateHasPermission(
    permissions.rankRead,
    context,
  );

  const { filter, orderBy, skip, take } =
    rankFindManyInputSchema.parse(query);

  const whereAnd: Array<Prisma.RankWhereInput> = [];

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

  const prisma = prismaAuth(context);

  let ranks = await prisma.rank.findMany({
    where: {
      AND: whereAnd,
    },
    skip,
    take,
    orderBy,
  });

  const count = await prisma.rank.count({
    where: {
      AND: whereAnd,
    },
  });

  ranks = await filePopulateDownloadUrlInTree(ranks);

  return { ranks, count };
}
