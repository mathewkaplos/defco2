import { RouteConfig } from '@asteasolutions/zod-to-openapi';
import { Prisma } from '@prisma/client';
import {
  saleAutocompleteInputSchema,
  saleAutocompleteOutputSchema,
} from 'src/features/sale/saleSchemas';
import { permissions } from 'src/features/permissions';
import { validateHasPermission } from 'src/features/security';
import { prismaAuth } from 'src/prisma';
import { AppContext } from 'src/shared/controller/appContext';
import { z } from 'zod';

export const saleAutocompleteApiDoc: RouteConfig = {
  method: 'get',
  path: '/api/sale/autocomplete',
  request: {
    query: saleAutocompleteInputSchema,
  },
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: z.array(saleAutocompleteOutputSchema),
        },
      },
    },
  },
};

export async function saleAutocompleteController(
  query: unknown,
  context: AppContext,
) {
  const { currentTenant } = validateHasPermission(
    permissions.saleAutocomplete,
    context,
  );

  const { search, exclude, take, orderBy } =
    saleAutocompleteInputSchema.parse(query);

  const prisma = prismaAuth(context);

  const whereAnd: Array<Prisma.SaleWhereInput> = [];

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
      id: search,
    });
  }

  let sales = await prisma.sale.findMany({
    where: {
      AND: whereAnd,
    },
    take,
    orderBy,
  });

  return sales.map((sale) => {
    return {
      id: sale.id,
    };
  });
}
