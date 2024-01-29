import { RouteConfig } from '@asteasolutions/zod-to-openapi';
import { productCreateInputSchema } from 'src/features/product/productSchemas';
import { filePopulateDownloadUrlInTree } from 'src/features/file/fileService';
import { permissions } from 'src/features/permissions';
import { validateHasPermission } from 'src/features/security';
import { prismaAuth } from 'src/prisma';
import { AppContext } from 'src/shared/controller/appContext';


export const productCreateApiDoc: RouteConfig = {
  method: 'post',
  path: '/api/product',
  request: {
    body: {
      content: {
        'application/json': {
          schema: productCreateInputSchema,
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

export async function productCreateController(
  body: unknown,
  context: AppContext,
) {
  validateHasPermission(permissions.productCreate, context);
  return await productCreate(body, context);
}

export async function productCreate(body: unknown, context: AppContext) {
  const data = productCreateInputSchema.parse(body);

  const prisma = prismaAuth(context);



  let product = await prisma.product.create({
    data: {
      name: data.name,
      price: data.price,
      importHash: data.importHash,
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
