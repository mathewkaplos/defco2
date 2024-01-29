import { RouteConfig } from '@asteasolutions/zod-to-openapi';
import { Prisma } from '@prisma/client';
import {
  rankAutocompleteInputSchema,
  rankAutocompleteOutputSchema,
} from 'src/features/rank/rankSchemas';
import { permissions } from 'src/features/permissions';
import { validateHasPermission } from 'src/features/security';
import { prismaAuth } from 'src/prisma';
import { AppContext } from 'src/shared/controller/appContext';
import { z } from 'zod';

export const rankAutocompleteApiDoc: RouteConfig = {
  method: 'get',
  path: '/api/rank/autocomplete',
  request: {
    query: rankAutocompleteInputSchema,
  },
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: z.array(rankAutocompleteOutputSchema),
        },
      },
    },
  },
};

export async function rankAutocompleteController(
  query: unknown,
  context: AppContext,
) {
  const { currentTenant } = validateHasPermission(
    permissions.rankAutocomplete,
    context,
  );

  const { search, exclude, take, orderBy } =
    rankAutocompleteInputSchema.parse(query);

  const prisma = prismaAuth(context);

  const whereAnd: Array<Prisma.RankWhereInput> = [];

  whereAnd.push({ tenantId: currentTenant.id });

  if (exclude) {
    whereAnd.push({
      id: {
        notIn: exclude,
      },
    });
  }

  if (search) {
    whereAnd.push({
      name: {
        contains: search,
        mode: 'insensitive',
      },
    });
  }

  let ranks = await prisma.rank.findMany({
    where: {
      AND: whereAnd,
    },
    take,
    orderBy,
  });

  return ranks.map((rank) => {
    return {
      id: rank.id,
    name: String(rank.name),
    };
  });
}
