import { RouteConfig } from '@asteasolutions/zod-to-openapi';
import { cardCreateInputSchema } from 'src/features/card/cardSchemas';
import { filePopulateDownloadUrlInTree } from 'src/features/file/fileService';
import { permissions } from 'src/features/permissions';
import { validateHasPermission } from 'src/features/security';
import { prismaAuth } from 'src/prisma';
import { AppContext } from 'src/shared/controller/appContext';
import { prismaRelationship } from 'src/prisma/prismaRelationship';

export const cardCreateApiDoc: RouteConfig = {
  method: 'post',
  path: '/api/card',
  request: {
    body: {
      content: {
        'application/json': {
          schema: cardCreateInputSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: 'Card',
    },
  },
};

export async function cardCreateController(
  body: unknown,
  context: AppContext,
) {
  validateHasPermission(permissions.cardCreate, context);
  return await cardCreate(body, context);
}

export async function cardCreate(body: unknown, context: AppContext) {
  const data = cardCreateInputSchema.parse(body);

  const prisma = prismaAuth(context);



  let card = await prisma.card.create({
    data: {
      cardNo: data.cardNo,
      isActive: data.isActive,
      issueDate: data.issueDate,
      deactivationDate: data.deactivationDate,
      customer: prismaRelationship.connectOne(data.customer),
      importHash: data.importHash,
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
