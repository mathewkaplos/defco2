import { RouteConfig } from '@asteasolutions/zod-to-openapi';
import { Prisma } from '@prisma/client';
import dayjs from 'dayjs';
import { materialReceiptFindManyInputSchema } from 'src/features/materialReceipt/materialReceiptSchemas';
import { permissions } from 'src/features/permissions';
import { validateHasPermission } from 'src/features/security';
import { prismaAuth } from 'src/prisma';
import { AppContext } from 'src/shared/controller/appContext';
import { filePopulateDownloadUrlInTree } from 'src/features/file/fileService';

export const materialReceiptFindManyApiDoc: RouteConfig = {
  method: 'get',
  path: '/api/material-receipt',
  request: {
    query: materialReceiptFindManyInputSchema,
  },
  responses: {
    200: {
      description: '{ materialReceipts: MaterialReceipt[], count: number }',
    },
  },
};

export async function materialReceiptFindManyController(
  query: unknown,
  context: AppContext,
) {
  const { currentTenant } = validateHasPermission(
    permissions.materialReceiptRead,
    context,
  );

  const { filter, orderBy, skip, take } =
    materialReceiptFindManyInputSchema.parse(query);

  const whereAnd: Array<Prisma.MaterialReceiptWhereInput> = [];

  whereAnd.push({
    tenant: {
      id: currentTenant.id,
    },
  });

  if (filter?.date1Range?.length) {
    const start = filter.date1Range?.[0];
    const end = filter.date1Range?.[1];

    if (start != null) {
      whereAnd.push({
        date1: {
          gte: start,
        },
      });
    }

    if (end != null) {
      whereAnd.push({
        date1: {
          lte: end,
        },
      });
    }
  }

  if (filter?.supplier != null) {
    whereAnd.push({
      supplier: { contains: filter?.supplier, mode: 'insensitive' },
    });
  }

  if (filter?.quantityRange?.length) {
    const start = filter.quantityRange?.[0];
    const end = filter.quantityRange?.[1];

    if (start != null) {
      whereAnd.push({
        quantity: { gte: start },
      });
    }

    if (end != null) {
      whereAnd.push({
        quantity: { lte: end },
      });
    }
  }

  if (filter?.priceRange?.length) {
    const start = filter.priceRange?.[0];
    const end = filter.priceRange?.[1];

    if (start != null) {
      whereAnd.push({
        price: { gte: start },
      });
    }

    if (end != null) {
      whereAnd.push({
        price: { lte: end },
      });
    }
  }

  if (filter?.totalRange?.length) {
    const start = filter.totalRange?.[0];
    const end = filter.totalRange?.[1];

    if (start != null) {
      whereAnd.push({
        total: { gte: start },
      });
    }

    if (end != null) {
      whereAnd.push({
        total: { lte: end },
      });
    }
  }

  const prisma = prismaAuth(context);

  let materialReceipts = await prisma.materialReceipt.findMany({
    where: {
      AND: whereAnd,
    },
    skip,
    take,
    orderBy,
  });

  const count = await prisma.materialReceipt.count({
    where: {
      AND: whereAnd,
    },
  });

  materialReceipts = await filePopulateDownloadUrlInTree(materialReceipts);

  return { materialReceipts, count };
}
