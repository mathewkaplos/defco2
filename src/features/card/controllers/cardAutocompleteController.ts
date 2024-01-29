import { RouteConfig } from '@asteasolutions/zod-to-openapi';
import { Prisma } from '@prisma/client';
import {
  cardAutocompleteInputSchema,
  cardAutocompleteOutputSchema,
} from 'src/features/card/cardSchemas';
import { permissions } from 'src/features/permissions';
import { validateHasPermission } from 'src/features/security';
import { prismaAuth } from 'src/prisma';
import { AppContext } from 'src/shared/controller/appContext';
import { z } from 'zod';

export const cardAutocompleteApiDoc: RouteConfig = {
  method: 'get',
  path: '/api/card/autocomplete',
  request: {
    query: cardAutocompleteInputSchema,
  },
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: z.array(cardAutocompleteOutputSchema),
        },
      },
    },
  },
};

export async function cardAutocompleteController(
  query: unknown,
  context: AppContext,
) {
  const { currentTenant } = validateHasPermission(
    permissions.cardAutocomplete,
    context,
  );

  const { search, exclude, take, orderBy } =
    cardAutocompleteInputSchema.parse(query);

  const prisma = prismaAuth(context);

  const whereAnd: Array<Prisma.CardWhereInput> = [];

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
      cardNo: {
        contains: search,
        mode: 'insensitive',
      },
    });
  }

  let cards = await prisma.card.findMany({
    where: {
      AND: whereAnd,
    },
    take,
    orderBy,
  });

  return cards.map((card) => {
    return {
      id: card.id,
    cardNo: String(card.cardNo),
    };
  });
}
