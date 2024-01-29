import { RouteConfig } from '@asteasolutions/zod-to-openapi';
import { Prisma } from '@prisma/client';
import {
  dispenserAutocompleteInputSchema,
  dispenserAutocompleteOutputSchema,
} from 'src/features/dispenser/dispenserSchemas';
import { permissions } from 'src/features/permissions';
import { validateHasPermission } from 'src/features/security';
import { prismaAuth } from 'src/prisma';
import { AppContext } from 'src/shared/controller/appContext';
import { z } from 'zod';

export const dispenserAutocompleteApiDoc: RouteConfig = {
  method: 'get',
  path: '/api/dispenser/autocomplete',
  request: {
    query: dispenserAutocompleteInputSchema,
  },
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: z.array(dispenserAutocompleteOutputSchema),
        },
      },
    },
  },
};

export async function dispenserAutocompleteController(
  query: unknown,
  context: AppContext,
) {
  const { currentTenant } = validateHasPermission(
    permissions.dispenserAutocomplete,
    context,
  );

  const { search, exclude, take, orderBy } =
    dispenserAutocompleteInputSchema.parse(query);

  const prisma = prismaAuth(context);

  const whereAnd: Array<Prisma.DispenserWhereInput> = [];

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

  let dispensers = await prisma.dispenser.findMany({
    where: {
      AND: whereAnd,
    },
    take,
    orderBy,
  });

  return dispensers.map((dispenser) => {
    return {
      id: dispenser.id,
    name: String(dispenser.name),
    };
  });
}
