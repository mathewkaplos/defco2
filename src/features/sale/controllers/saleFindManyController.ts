import { RouteConfig } from '@asteasolutions/zod-to-openapi';
import { Prisma } from '@prisma/client';
import dayjs from 'dayjs';
import { saleFindManyInputSchema } from 'src/features/sale/saleSchemas';
import { permissions } from 'src/features/permissions';
import { validateHasPermission } from 'src/features/security';
import { prismaAuth } from 'src/prisma';
import { AppContext } from 'src/shared/controller/appContext';
import { filePopulateDownloadUrlInTree } from 'src/features/file/fileService';

export const saleFindManyApiDoc: RouteConfig = {
  method: 'get',
  path: '/api/sale',
  request: {
    query: saleFindManyInputSchema,
  },
  responses: {
    200: {
      description: '{ sales: Sale[], count: number }',
    },
  },
};

export async function saleFindManyController(
  query: unknown,
  context: AppContext,
) {
  const { currentTenant } = validateHasPermission(
    permissions.saleRead,
    context,
  );

  const { filter, orderBy, skip, take } =
    saleFindManyInputSchema.parse(query);

  const whereAnd: Array<Prisma.SaleWhereInput> = [];

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

  if (filter?.fuelType != null) {
    whereAnd.push({
      fuelType: filter?.fuelType,
    });
  }

  if (filter?.litresRange?.length) {
    const start = filter.litresRange?.[0];
    const end = filter.litresRange?.[1];

    if (start != null) {
      whereAnd.push({
        litres: { gte: start },
      });
    }

    if (end != null) {
      whereAnd.push({
        litres: { lte: end },
      });
    }
  }

  if (filter?.rateRange?.length) {
    const start = filter.rateRange?.[0];
    const end = filter.rateRange?.[1];

    if (start != null) {
      whereAnd.push({
        rate: { gte: start },
      });
    }

    if (end != null) {
      whereAnd.push({
        rate: { lte: end },
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

  if (filter?.paymode != null) {
    whereAnd.push({
      paymode: filter?.paymode,
    });
  }

  if (filter?.cashAmountRange?.length) {
    const start = filter.cashAmountRange?.[0];
    const end = filter.cashAmountRange?.[1];

    if (start != null) {
      whereAnd.push({
        cashAmount: { gte: start },
      });
    }

    if (end != null) {
      whereAnd.push({
        cashAmount: { lte: end },
      });
    }
  }

  if (filter?.mpesaAmountRange?.length) {
    const start = filter.mpesaAmountRange?.[0];
    const end = filter.mpesaAmountRange?.[1];

    if (start != null) {
      whereAnd.push({
        mpesaAmount: { gte: start },
      });
    }

    if (end != null) {
      whereAnd.push({
        mpesaAmount: { lte: end },
      });
    }
  }

  if (filter?.invoiceAmountRange?.length) {
    const start = filter.invoiceAmountRange?.[0];
    const end = filter.invoiceAmountRange?.[1];

    if (start != null) {
      whereAnd.push({
        invoiceAmount: { gte: start },
      });
    }

    if (end != null) {
      whereAnd.push({
        invoiceAmount: { lte: end },
      });
    }
  }

  const prisma = prismaAuth(context);

  let sales = await prisma.sale.findMany({
    where: {
      AND: whereAnd,
    },
    skip,
    take,
    orderBy,
  });

  const count = await prisma.sale.count({
    where: {
      AND: whereAnd,
    },
  });

  sales = await filePopulateDownloadUrlInTree(sales);

  return { sales, count };
}
