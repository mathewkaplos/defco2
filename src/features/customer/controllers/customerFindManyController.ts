import { RouteConfig } from '@asteasolutions/zod-to-openapi';
import { Prisma } from '@prisma/client';
import dayjs from 'dayjs';
import { customerFindManyInputSchema } from 'src/features/customer/customerSchemas';
import { permissions } from 'src/features/permissions';
import { validateHasPermission } from 'src/features/security';
import { prismaAuth } from 'src/prisma';
import { AppContext } from 'src/shared/controller/appContext';
import { filePopulateDownloadUrlInTree } from 'src/features/file/fileService';

export const customerFindManyApiDoc: RouteConfig = {
  method: 'get',
  path: '/api/customer',
  request: {
    query: customerFindManyInputSchema,
  },
  responses: {
    200: {
      description: '{ customers: Customer[], count: number }',
    },
  },
};

export async function customerFindManyController(
  query: unknown,
  context: AppContext,
) {
  const { currentTenant } = validateHasPermission(
    permissions.customerRead,
    context,
  );

  const { filter, orderBy, skip, take } =
    customerFindManyInputSchema.parse(query);

  const whereAnd: Array<Prisma.CustomerWhereInput> = [];

  whereAnd.push({
    tenant: {
      id: currentTenant.id,
    },
  });

  if (filter?.firstName != null) {
    whereAnd.push({
      firstName: { contains: filter?.firstName, mode: 'insensitive' },
    });
  }

  if (filter?.lastName != null) {
    whereAnd.push({
      lastName: { contains: filter?.lastName, mode: 'insensitive' },
    });
  }

  if (filter?.otherNames != null) {
    whereAnd.push({
      otherNames: { contains: filter?.otherNames, mode: 'insensitive' },
    });
  }

  if (filter?.gender != null) {
    whereAnd.push({
      gender: filter?.gender,
    });
  }

  if (filter?.serviceNo != null) {
    whereAnd.push({
      serviceNo: { contains: filter?.serviceNo, mode: 'insensitive' },
    });
  }

  if (filter?.entitledCardsRange?.length) {
    const start = filter.entitledCardsRange?.[0];
    const end = filter.entitledCardsRange?.[1];

    if (start != null) {
      whereAnd.push({
        entitledCards: { gte: start },
      });
    }

    if (end != null) {
      whereAnd.push({
        entitledCards: { lte: end },
      });
    }
  }

  if (filter?.status != null) {
    whereAnd.push({
      status: filter?.status,
    });
  }

  const prisma = prismaAuth(context);

  let customers = await prisma.customer.findMany({
    where: {
      AND: whereAnd,
    },
    skip,
    take,
    orderBy,
  });

  const count = await prisma.customer.count({
    where: {
      AND: whereAnd,
    },
  });

  customers = await filePopulateDownloadUrlInTree(customers);

  return { customers, count };
}
