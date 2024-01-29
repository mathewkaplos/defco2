import { RouteConfig } from '@asteasolutions/zod-to-openapi';
import {
  dispenserUpdateBodyInputSchema,
  dispenserUpdateParamsInputSchema,
} from 'src/features/dispenser/dispenserSchemas';
import { filePopulateDownloadUrlInTree } from 'src/features/file/fileService';
import { permissions } from 'src/features/permissions';
import { validateHasPermission } from 'src/features/security';
import { prismaAuth } from 'src/prisma';
import { AppContext } from 'src/shared/controller/appContext';
import { prismaRelationship } from 'src/prisma/prismaRelationship';

export const dispenserUpdateApiDoc: RouteConfig = {
  method: 'put',
  path: '/api/dispenser/{id}',
  request: {
    params: dispenserUpdateParamsInputSchema,
    body: {
      content: {
        'application/json': {
          schema: dispenserUpdateBodyInputSchema,
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

export async function dispenserUpdateController(
  params: unknown,
  body: unknown,
  context: AppContext,
) {
  const { currentTenant } = validateHasPermission(
    permissions.dispenserUpdate,
    context,
  );

  const { id } = dispenserUpdateParamsInputSchema.parse(params);

  const data = dispenserUpdateBodyInputSchema.parse(body);

  const prisma = prismaAuth(context);



  await prisma.dispenser.update({
    where: {
      id_tenantId: {
        id,
        tenantId: currentTenant.id,
      },
    },
    data: {
      name: data.name,
      model: data.model,
      fuelType: data.fuelType,
      station: prismaRelationship.connectOrDisconnectOne(data.station),
    },
  });

  let dispenser = await prisma.dispenser.findUniqueOrThrow({
    where: {
      id_tenantId: {
        id,
        tenantId: currentTenant.id,
      },
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
