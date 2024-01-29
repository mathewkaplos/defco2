import { RouteConfig } from '@asteasolutions/zod-to-openapi';
import { rankCreateInputSchema } from 'src/features/rank/rankSchemas';
import { filePopulateDownloadUrlInTree } from 'src/features/file/fileService';
import { permissions } from 'src/features/permissions';
import { validateHasPermission } from 'src/features/security';
import { prismaAuth } from 'src/prisma';
import { AppContext } from 'src/shared/controller/appContext';


export const rankCreateApiDoc: RouteConfig = {
  method: 'post',
  path: '/api/rank',
  request: {
    body: {
      content: {
        'application/json': {
          schema: rankCreateInputSchema,
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

export async function rankCreateController(
  body: unknown,
  context: AppContext,
) {
  validateHasPermission(permissions.rankCreate, context);
  return await rankCreate(body, context);
}

export async function rankCreate(body: unknown, context: AppContext) {
  const data = rankCreateInputSchema.parse(body);

  const prisma = prismaAuth(context);



  let rank = await prisma.rank.create({
    data: {
      name: data.name,
      description: data.description,
      importHash: data.importHash,
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
