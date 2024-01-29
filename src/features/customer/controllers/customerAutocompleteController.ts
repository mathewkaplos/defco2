import { RouteConfig } from '@asteasolutions/zod-to-openapi';
import { Prisma } from '@prisma/client';
import {
  customerAutocompleteInputSchema,
  customerAutocompleteOutputSchema,
} from 'src/features/customer/customerSchemas';
import { permissions } from 'src/features/permissions';
import { validateHasPermission } from 'src/features/security';
import { prismaAuth } from 'src/prisma';
import { AppContext } from 'src/shared/controller/appContext';
import { z } from 'zod';

export const customerAutocompleteApiDoc: RouteConfig = {
  method: 'get',
  path: '/api/customer/autocomplete',
  request: {
    query: customerAutocompleteInputSchema,
  },
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: z.array(customerAutocompleteOutputSchema),
        },
      },
    },
  },
};

export async function customerAutocompleteController(
  query: unknown,
  context: AppContext,
) {
  const { currentTenant } = validateHasPermission(
    permissions.customerAutocomplete,
    context,
  );

  const { search, exclude, take, orderBy } =
    customerAutocompleteInputSchema.parse(query);

  const prisma = prismaAuth(context);

  const whereAnd: Array<Prisma.CustomerWhereInput> = [];

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
      firstName: {
        contains: search,
        mode: 'insensitive',
      },
    });
  }

  let customers = await prisma.customer.findMany({
    where: {
      AND: whereAnd,
    },
    take,
    orderBy,
  });

  return customers.map((customer) => {
    return {
      id: customer.id,
    firstName: String(customer.firstName),
    };
  });
}
