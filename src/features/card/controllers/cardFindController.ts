import { RouteConfig } from '@asteasolutions/zod-to-openapi';
import { cardFindSchema } from 'src/features/card/cardSchemas';
import { permissions } from 'src/features/permissions';
import { validateHasPermission } from 'src/features/security';
import { prismaAuth } from 'src/prisma';
import { AppContext } from 'src/shared/controller/appContext';
import { filePopulateDownloadUrlInTree } from 'src/features/file/fileService';

export const cardFindApiDoc: RouteConfig = {
  method: 'get',
  path: '/api/card/{id}',
  request: {
    params: cardFindSchema,
  },
  responses: {
    200: {
      description: 'Card',
    },
  },
};

export async function cardFindController(
  params: unknown,
  context: AppContext,
) {
  const { currentTenant } = validateHasPermission(
    permissions.cardRead,
    context,
  );

  const { id } = cardFindSchema.parse(params);

  const prisma = prismaAuth(context);

  let card = await prisma.card.findUnique({
    where: {
      id_tenantId: {
        id,
        tenantId: currentTenant.id,
      },
    },
    include: {
      customer: true,
      createdByMembership: true,
      updatedByMembership: true,
    },
  });

  card = await filePopulateDownloadUrlInTree(card);

  return card;
}
