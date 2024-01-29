import { RouteConfig } from '@asteasolutions/zod-to-openapi';
import {
  rankUpdateBodyInputSchema,
  rankUpdateParamsInputSchema,
} from 'src/features/rank/rankSchemas';
import { filePopulateDownloadUrlInTree } from 'src/features/file/fileService';
import { permissions } from 'src/features/permissions';
import { validateHasPermission } from 'src/features/security';
import { prismaAuth } from 'src/prisma';
import { AppContext } from 'src/shared/controller/appContext';


export const rankUpdateApiDoc: RouteConfig = {
  method: 'put',
  path: '/api/rank/{id}',
  request: {
    params: rankUpdateParamsInputSchema,
    body: {
      content: {
        'application/json': {
          schema: rankUpdateBodyInputSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: 'Rank',
    },
  },
};

export async function rankUpdateController(
  params: unknown,
  body: unknown,
  context: AppContext,
) {
  const { currentTenant } = validateHasPermission(
    permissions.rankUpdate,
    context,
  );

  const { id } = rankUpdateParamsInputSchema.parse(params);

  const data = rankUpdateBodyInputSchema.parse(body);

  const prisma = prismaAuth(context);



  await prisma.rank.update({
    where: {
      id_tenantId: {
        id,
        tenantId: currentTenant.id,
      },
    },
    data: {
      name: data.name,
      description: data.description,
    },
  });

  let rank = await prisma.rank.findUniqueOrThrow({
    where: {
      id_tenantId: {
        id,
        tenantId: currentTenant.id,
      },
    },
    include: {
      customers: true,
      createdByMembership: true,
      updatedByMembership: true,
    },
  });

  rank = await filePopulateDownloadUrlInTree(rank);

  return rank;
}
