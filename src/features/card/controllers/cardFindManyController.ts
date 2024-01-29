import { RouteConfig } from '@asteasolutions/zod-to-openapi';
import { Prisma } from '@prisma/client';
import dayjs from 'dayjs';
import { cardFindManyInputSchema } from 'src/features/card/cardSchemas';
import { permissions } from 'src/features/permissions';
import { validateHasPermission } from 'src/features/security';
import { prismaAuth } from 'src/prisma';
import { AppContext } from 'src/shared/controller/appContext';
import { filePopulateDownloadUrlInTree } from 'src/features/file/fileService';

export const cardFindManyApiDoc: RouteConfig = {
  method: 'get',
  path: '/api/card',
  request: {
    query: cardFindManyInputSchema,
  },
  responses: {
    200: {
      description: '{ cards: Card[], count: number }',
    },
  },
};

export async function cardFindManyController(
  query: unknown,
  context: AppContext,
) {
  const { currentTenant } = validateHasPermission(
    permissions.cardRead,
    context,
  );

  const { filter, orderBy, skip, take } =
    cardFindManyInputSchema.parse(query);

  const whereAnd: Array<Prisma.CardWhereInput> = [];

  whereAnd.push({
    tenant: {
      id: currentTenant.id,
    },
  });

  if (filter?.cardNo != null) {
    whereAnd.push({
      cardNo: { contains: filter?.cardNo, mode: 'insensitive' },
    });
  }

  if (filter?.isActive != null) {
    whereAnd.push({
      isActive: filter.isActive,
    });
  }

  if (filter?.issueDateRange?.length) {
    const start = filter.issueDateRange?.[0];
    const end = filter.issueDateRange?.[1];

    if (start != null) {
      whereAnd.push({
        issueDate: {
          gte: start,
        },
      });
    }

    if (end != null) {
      whereAnd.push({
        issueDate: {
          lte: end,
        },
      });
    }
  }

  if (filter?.deactivationDateRange?.length) {
    const start = filter.deactivationDateRange?.[0];
    const end = filter.deactivationDateRange?.[1];

    if (start != null) {
      whereAnd.push({
        deactivationDate: {
          gte: start,
        },
      });
    }

    if (end != null) {
      whereAnd.push({
        deactivationDate: {
          lte: end,
        },
      });
    }
  }

  const prisma = prismaAuth(context);

  let cards = await prisma.card.findMany({
    where: {
      AND: whereAnd,
    },
    skip,
    take,
    orderBy,
  });

  const count = await prisma.card.count({
    where: {
      AND: whereAnd,
    },
  });

  cards = await filePopulateDownloadUrlInTree(cards);

  return { cards, count };
}
