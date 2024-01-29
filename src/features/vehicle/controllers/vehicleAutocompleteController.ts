import { RouteConfig } from '@asteasolutions/zod-to-openapi';
import { Prisma } from '@prisma/client';
import {
  vehicleAutocompleteInputSchema,
  vehicleAutocompleteOutputSchema,
} from 'src/features/vehicle/vehicleSchemas';
import { permissions } from 'src/features/permissions';
import { validateHasPermission } from 'src/features/security';
import { prismaAuth } from 'src/prisma';
import { AppContext } from 'src/shared/controller/appContext';
import { z } from 'zod';

export const vehicleAutocompleteApiDoc: RouteConfig = {
  method: 'get',
  path: '/api/vehicle/autocomplete',
  request: {
    query: vehicleAutocompleteInputSchema,
  },
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: z.array(vehicleAutocompleteOutputSchema),
        },
      },
    },
  },
};

export async function vehicleAutocompleteController(
  query: unknown,
  context: AppContext,
) {
  const { currentTenant } = validateHasPermission(
    permissions.vehicleAutocomplete,
    context,
  );

  const { search, exclude, take, orderBy } =
    vehicleAutocompleteInputSchema.parse(query);

  const prisma = prismaAuth(context);

  const whereAnd: Array<Prisma.VehicleWhereInput> = [];

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
      regNo: {
        contains: search,
        mode: 'insensitive',
      },
    });
  }

  let vehicles = await prisma.vehicle.findMany({
    where: {
      AND: whereAnd,
    },
    take,
    orderBy,
  });

  return vehicles.map((vehicle) => {
    return {
      id: vehicle.id,
    regNo: String(vehicle.regNo),
    };
  });
}
