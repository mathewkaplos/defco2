import { RouteConfig } from '@asteasolutions/zod-to-openapi';
import { Prisma } from '@prisma/client';
import {
  voucherAutocompleteInputSchema,
  voucherAutocompleteOutputSchema,
} from 'src/features/voucher/voucherSchemas';
import { permissions } from 'src/features/permissions';
import { validateHasPermission } from 'src/features/security';
import { prismaAuth } from 'src/prisma';
import { AppContext } from 'src/shared/controller/appContext';
import { z } from 'zod';

export const voucherAutocompleteApiDoc: RouteConfig = {
  method: 'get',
  path: '/api/voucher/autocomplete',
  request: {
    query: voucherAutocompleteInputSchema,
  },
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: z.array(voucherAutocompleteOutputSchema),
        },
      },
    },
  },
};

export async function voucherAutocompleteController(
  query: unknown,
  context: AppContext,
) {
  const { currentTenant } = validateHasPermission(
    permissions.voucherAutocomplete,
    context,
  );

  const { search, exclude, take, orderBy } =
    voucherAutocompleteInputSchema.parse(query);

  const prisma = prismaAuth(context);

  const whereAnd: Array<Prisma.VoucherWhereInput> = [];

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
      voucherNo: {
        contains: search,
        mode: 'insensitive',
      },
    });
  }

  let vouchers = await prisma.voucher.findMany({
    where: {
      AND: whereAnd,
    },
    take,
    orderBy,
  });

  return vouchers.map((voucher) => {
    return {
      id: voucher.id,
    voucherNo: String(voucher.voucherNo),
    };
  });
}
