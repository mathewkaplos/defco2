import { RouteConfig } from '@asteasolutions/zod-to-openapi';
import { Prisma } from '@prisma/client';
import {
  materialReceiptAutocompleteInputSchema,
  materialReceiptAutocompleteOutputSchema,
} from 'src/features/materialReceipt/materialReceiptSchemas';
import { permissions } from 'src/features/permissions';
import { validateHasPermission } from 'src/features/security';
import { prismaAuth } from 'src/prisma';
import { AppContext } from 'src/shared/controller/appContext';
import { z } from 'zod';

export const materialReceiptAutocompleteApiDoc: RouteConfig = {
  method: 'get',
  path: '/api/material-receipt/autocomplete',
  request: {
    query: materialReceiptAutocompleteInputSchema,
  },
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: z.array(materialReceiptAutocompleteOutputSchema),
        },
      },
    },
  },
};

export async function materialReceiptAutocompleteController(
  query: unknown,
  context: AppContext,
) {
  const { currentTenant } = validateHasPermission(
    permissions.materialReceiptAutocomplete,
    context,
  );

  const { search, exclude, take, orderBy } =
    materialReceiptAutocompleteInputSchema.parse(query);

  const prisma = prismaAuth(context);

  const whereAnd: Array<Prisma.MaterialReceiptWhereInput> = [];

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

  let materialReceipts = await prisma.materialReceipt.findMany({
    where: {
      AND: whereAnd,
    },
    take,
    orderBy,
  });

  return materialReceipts.map((materialReceipt) => {
    return {
      id: materialReceipt.id,
    };
  });
}
