import { RouteConfig } from '@asteasolutions/zod-to-openapi';
import { rankFindSchema } from 'src/features/rank/rankSchemas';
import { permissions } from 'src/features/permissions';
import { validateHasPermission } from 'src/features/security';
import { prismaAuth } from 'src/prisma';
import { AppContext } from 'src/shared/controller/appContext';
import { filePopulateDownloadUrlInTree } from 'src/features/file/fileService';

export const rankFindApiDoc: RouteConfig = {
  method: 'get',
  path: '/api/rank/{id}',
  request: {
    params: rankFindSchema,
  },
  responses: {
    200: {
      description: 'Rank',
    },
  },
};

export async function rankFindController(
  params: unknown,
  context: AppContext,
) {
  const { currentTenant } = validateHasPermission(
    permissions.rankRead,
    context,
  );

  const { id } = rankFindSchema.parse(params);

  const prisma = prismaAuth(context);

  let rank = await prisma.rank.findUnique({
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
