import { RouteConfig } from '@asteasolutions/zod-to-openapi';
import {
  productUpdateBodyInputSchema,
  productUpdateParamsInputSchema,
} from 'src/features/product/productSchemas';
import { filePopulateDownloadUrlInTree } from 'src/features/file/fileService';
import { permissions } from 'src/features/permissions';
import { validateHasPermission } from 'src/features/security';
import { prismaAuth } from 'src/prisma';
import { AppContext } from 'src/shared/controller/appContext';


export const productUpdateApiDoc: RouteConfig = {
  method: 'put',
  path: '/api/product/{id}',
  request: {
    params: productUpdateParamsInputSchema,
    body: {
      content: {
        'application/json': {
          schema: productUpdateBodyInputSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: 'Product',
    },
  },
};

export async function productUpdateController(
  params: unknown,
  body: unknown,
  context: AppContext,
) {
  const { currentTenant } = validateHasPermission(
    permissions.productUpdate,
    context,
  );

  const { id } = productUpdateParamsInputSchema.parse(params);

  const data = productUpdateBodyInputSchema.parse(body);

  const prisma = prismaAuth(context);



  await prisma.product.update({
    where: {
      id_tenantId: {
        id,
        tenantId: currentTenant.id,
      },
    },
    data: {
      name: data.name,
      price: data.price,
    },
  });

  let product = await prisma.product.findUniqueOrThrow({
    where: {
      id_tenantId: {
        id,
        tenantId: currentTenant.id,
      },
    },
    include: {
      receipts: true,
      createdByMembership: true,
      updatedByMembership: true,
    },
  });

  product = await filePopulateDownloadUrlInTree(product);

  return product;
}
