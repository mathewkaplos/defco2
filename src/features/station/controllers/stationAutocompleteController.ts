import { RouteConfig } from '@asteasolutions/zod-to-openapi';
import { Prisma } from '@prisma/client';
import {
  stationAutocompleteInputSchema,
  stationAutocompleteOutputSchema,
} from 'src/features/station/stationSchemas';
import { permissions } from 'src/features/permissions';
import { validateHasPermission } from 'src/features/security';
import { prismaAuth } from 'src/prisma';
import { AppContext } from 'src/shared/controller/appContext';
import { z } from 'zod';

export const stationAutocompleteApiDoc: RouteConfig = {
  method: 'get',
  path: '/api/station/autocomplete',
  request: {
    query: stationAutocompleteInputSchema,
  },
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: z.array(stationAutocompleteOutputSchema),
        },
      },
    },
  },
};

export async function stationAutocompleteController(
  query: unknown,
  context: AppContext,
) {
  const { currentTenant } = validateHasPermission(
    permissions.stationAutocomplete,
    context,
  );

  const { search, exclude, take, orderBy } =
    stationAutocompleteInputSchema.parse(query);

  const prisma = prismaAuth(context);

  const whereAnd: Array<Prisma.StationWhereInput> = [];

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

  let stations = await prisma.station.findMany({
    where: {
      AND: whereAnd,
    },
    take,
    orderBy,
  });

  return stations.map((station) => {
    return {
      id: station.id,
    name: String(station.name),
    };
  });
}
