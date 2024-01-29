import { RouteConfig } from '@asteasolutions/zod-to-openapi';
import { Prisma } from '@prisma/client';
import dayjs from 'dayjs';
import { productFindManyInputSchema } from 'src/features/product/productSchemas';
import { permissions } from 'src/features/permissions';
import { validateHasPermission } from 'src/features/security';
import { prismaAuth } from 'src/prisma';
import { AppContext } from 'src/shared/controller/appContext';
import { filePopulateDownloadUrlInTree } from 'src/features/file/fileService';

export const productFindManyApiDoc: RouteConfig = {
  method: 'get',
  path: '/api/product',
  request: {
    query: productFindManyInputSchema,
  },
  responses: {
    200: {
      description: '{ products: Product[], count: number }',
    },
  },
};

export async function productFindManyController(
  query: unknown,
  context: AppContext,
) {
  const { currentTenant } = validateHasPermission(
    permissions.productRead,
    context,
  );

  const { filter, orderBy, skip, take } =
    productFindManyInputSchema.parse(query);

  const whereAnd: Array<Prisma.ProductWhereInput> = [];

  whereAnd.push({
    tenant: {
      id: currentTenant.id,
    },
  });

  if (filter?.name != null) {
    whereAnd.push({
      name: { contains: filter?.name, mode: 'insensitive' },
    });
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

  const prisma = prismaAuth(context);

  let products = await prisma.product.findMany({
    where: {
      AND: whereAnd,
    },
    skip,
    take,
    orderBy,
  });

  const count = await prisma.product.count({
    where: {
      AND: whereAnd,
    },
  });

  products = await filePopulateDownloadUrlInTree(products);

  return { products, count };
}
