import { RouteConfig } from '@asteasolutions/zod-to-openapi';
import { Prisma } from '@prisma/client';
import {
  productAutocompleteInputSchema,
  productAutocompleteOutputSchema,
} from 'src/features/product/productSchemas';
import { permissions } from 'src/features/permissions';
import { validateHasPermission } from 'src/features/security';
import { prismaAuth } from 'src/prisma';
import { AppContext } from 'src/shared/controller/appContext';
import { z } from 'zod';

export const productAutocompleteApiDoc: RouteConfig = {
  method: 'get',
  path: '/api/product/autocomplete',
  request: {
    query: productAutocompleteInputSchema,
  },
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: z.array(productAutocompleteOutputSchema),
        },
      },
    },
  },
};

export async function productAutocompleteController(
  query: unknown,
  context: AppContext,
) {
  const { currentTenant } = validateHasPermission(
    permissions.productAutocomplete,
    context,
  );

  const { search, exclude, take, orderBy } =
    productAutocompleteInputSchema.parse(query);

  const prisma = prismaAuth(context);

  const whereAnd: Array<Prisma.ProductWhereInput> = [];

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

  let products = await prisma.product.findMany({
    where: {
      AND: whereAnd,
    },
    take,
    orderBy,
  });

  return products.map((product) => {
    return {
      id: product.id,
    name: String(product.name),
    };
  });
}
