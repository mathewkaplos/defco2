import { RouteConfig } from '@asteasolutions/zod-to-openapi';
import { Prisma } from '@prisma/client';
import {
  tankAutocompleteInputSchema,
  tankAutocompleteOutputSchema,
} from 'src/features/tank/tankSchemas';
import { permissions } from 'src/features/permissions';
import { validateHasPermission } from 'src/features/security';
import { prismaAuth } from 'src/prisma';
import { AppContext } from 'src/shared/controller/appContext';
import { z } from 'zod';

export const tankAutocompleteApiDoc: RouteConfig = {
  method: 'get',
  path: '/api/tank/autocomplete',
  request: {
    query: tankAutocompleteInputSchema,
  },
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: z.array(tankAutocompleteOutputSchema),
        },
      },
    },
  },
};

export async function tankAutocompleteController(
  query: unknown,
  context: AppContext,
) {
  const { currentTenant } = validateHasPermission(
    permissions.tankAutocomplete,
    context,
  );

  const { search, exclude, take, orderBy } =
    tankAutocompleteInputSchema.parse(query);

  const prisma = prismaAuth(context);

  const whereAnd: Array<Prisma.TankWhereInput> = [];

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

  let tanks = await prisma.tank.findMany({
    where: {
      AND: whereAnd,
    },
    take,
    orderBy,
  });

  return tanks.map((tank) => {
    return {
      id: tank.id,
    name: String(tank.name),
    };
  });
}
