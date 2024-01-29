import { RouteConfig } from '@asteasolutions/zod-to-openapi';
import { Prisma } from '@prisma/client';
import {
  deviceAutocompleteInputSchema,
  deviceAutocompleteOutputSchema,
} from 'src/features/device/deviceSchemas';
import { permissions } from 'src/features/permissions';
import { validateHasPermission } from 'src/features/security';
import { prismaAuth } from 'src/prisma';
import { AppContext } from 'src/shared/controller/appContext';
import { z } from 'zod';

export const deviceAutocompleteApiDoc: RouteConfig = {
  method: 'get',
  path: '/api/device/autocomplete',
  request: {
    query: deviceAutocompleteInputSchema,
  },
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: z.array(deviceAutocompleteOutputSchema),
        },
      },
    },
  },
};

export async function deviceAutocompleteController(
  query: unknown,
  context: AppContext,
) {
  const { currentTenant } = validateHasPermission(
    permissions.deviceAutocomplete,
    context,
  );

  const { search, exclude, take, orderBy } =
    deviceAutocompleteInputSchema.parse(query);

  const prisma = prismaAuth(context);

  const whereAnd: Array<Prisma.DeviceWhereInput> = [];

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
      deviceId: {
        contains: search,
        mode: 'insensitive',
      },
    });
  }

  let devices = await prisma.device.findMany({
    where: {
      AND: whereAnd,
    },
    take,
    orderBy,
  });

  return devices.map((device) => {
    return {
      id: device.id,
    deviceId: String(device.deviceId),
    };
  });
}
