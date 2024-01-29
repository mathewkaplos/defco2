import { RouteConfig } from '@asteasolutions/zod-to-openapi';
import { Prisma } from '@prisma/client';
import dayjs from 'dayjs';
import { vehicleFindManyInputSchema } from 'src/features/vehicle/vehicleSchemas';
import { permissions } from 'src/features/permissions';
import { validateHasPermission } from 'src/features/security';
import { prismaAuth } from 'src/prisma';
import { AppContext } from 'src/shared/controller/appContext';
import { filePopulateDownloadUrlInTree } from 'src/features/file/fileService';

export const vehicleFindManyApiDoc: RouteConfig = {
  method: 'get',
  path: '/api/vehicle',
  request: {
    query: vehicleFindManyInputSchema,
  },
  responses: {
    200: {
      description: '{ vehicles: Vehicle[], count: number }',
    },
  },
};

export async function vehicleFindManyController(
  query: unknown,
  context: AppContext,
) {
  const { currentTenant } = validateHasPermission(
    permissions.vehicleRead,
    context,
  );

  const { filter, orderBy, skip, take } =
    vehicleFindManyInputSchema.parse(query);

  const whereAnd: Array<Prisma.VehicleWhereInput> = [];

  whereAnd.push({
    tenant: {
      id: currentTenant.id,
    },
  });

  if (filter?.make != null) {
    whereAnd.push({
      make: { contains: filter?.make, mode: 'insensitive' },
    });
  }

  if (filter?.regNo != null) {
    whereAnd.push({
      regNo: { contains: filter?.regNo, mode: 'insensitive' },
    });
  }

  if (filter?.ccRange?.length) {
    const start = filter.ccRange?.[0];
    const end = filter.ccRange?.[1];

    if (start != null) {
      whereAnd.push({
        cc: { gte: start },
      });
    }

    if (end != null) {
      whereAnd.push({
        cc: { lte: end },
      });
    }
  }

  if (filter?.fullTankRange?.length) {
    const start = filter.fullTankRange?.[0];
    const end = filter.fullTankRange?.[1];

    if (start != null) {
      whereAnd.push({
        fullTank: { gte: start },
      });
    }

    if (end != null) {
      whereAnd.push({
        fullTank: { lte: end },
      });
    }
  }

  if (filter?.approved != null) {
    whereAnd.push({
      approved: filter.approved,
    });
  }

  const prisma = prismaAuth(context);

  let vehicles = await prisma.vehicle.findMany({
    where: {
      AND: whereAnd,
    },
    skip,
    take,
    orderBy,
  });

  const count = await prisma.vehicle.count({
    where: {
      AND: whereAnd,
    },
  });

  vehicles = await filePopulateDownloadUrlInTree(vehicles);

  return { vehicles, count };
}
