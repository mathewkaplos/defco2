import { RouteConfig } from '@asteasolutions/zod-to-openapi';
import { productFindSchema } from 'src/features/product/productSchemas';
import { permissions } from 'src/features/permissions';
import { validateHasPermission } from 'src/features/security';
import { prismaAuth } from 'src/prisma';
import { AppContext } from 'src/shared/controller/appContext';
import { filePopulateDownloadUrlInTree } from 'src/features/file/fileService';

export const productFindApiDoc: RouteConfig = {
  method: 'get',
  path: '/api/product/{id}',
  request: {
    params: productFindSchema,
  },
  responses: {
    200: {
      description: 'Product',
    },
  },
};

export async function productFindController(
  params: unknown,
  context: AppContext,
) {
  const { currentTenant } = validateHasPermission(
    permissions.productRead,
    context,
  );

  const { id } = productFindSchema.parse(params);

  const prisma = prismaAuth(context);

  let product = await prisma.product.findUnique({
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
