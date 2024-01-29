import { RouteConfig } from '@asteasolutions/zod-to-openapi';
import { dispenserCreateInputSchema } from 'src/features/dispenser/dispenserSchemas';
import { filePopulateDownloadUrlInTree } from 'src/features/file/fileService';
import { permissions } from 'src/features/permissions';
import { validateHasPermission } from 'src/features/security';
import { prismaAuth } from 'src/prisma';
import { AppContext } from 'src/shared/controller/appContext';
import { prismaRelationship } from 'src/prisma/prismaRelationship';

export const dispenserCreateApiDoc: RouteConfig = {
  method: 'post',
  path: '/api/dispenser',
  request: {
    body: {
      content: {
        'application/json': {
          schema: dispenserCreateInputSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: 'Dispenser',
    },
  },
};

export async function dispenserCreateController(
  body: unknown,
  context: AppContext,
) {
  validateHasPermission(permissions.dispenserCreate, context);
  return await dispenserCreate(body, context);
}

export async function dispenserCreate(body: unknown, context: AppContext) {
  const data = dispenserCreateInputSchema.parse(body);

  const prisma = prismaAuth(context);



  let dispenser = await prisma.dispenser.create({
    data: {
      name: data.name,
      model: data.model,
      fuelType: data.fuelType,
      station: prismaRelationship.connectOne(data.station),
      importHash: data.importHash,
    },
    include: {
      station: true,
      createdByMembership: true,
      updatedByMembership: true,
    },
  });

  dispenser = await filePopulateDownloadUrlInTree(dispenser);

  return dispenser;
}
