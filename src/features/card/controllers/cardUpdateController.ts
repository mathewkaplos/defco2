import { RouteConfig } from '@asteasolutions/zod-to-openapi';
import {
  cardUpdateBodyInputSchema,
  cardUpdateParamsInputSchema,
} from 'src/features/card/cardSchemas';
import { filePopulateDownloadUrlInTree } from 'src/features/file/fileService';
import { permissions } from 'src/features/permissions';
import { validateHasPermission } from 'src/features/security';
import { prismaAuth } from 'src/prisma';
import { AppContext } from 'src/shared/controller/appContext';
import { prismaRelationship } from 'src/prisma/prismaRelationship';

export const cardUpdateApiDoc: RouteConfig = {
  method: 'put',
  path: '/api/card/{id}',
  request: {
    params: cardUpdateParamsInputSchema,
    body: {
      content: {
        'application/json': {
          schema: cardUpdateBodyInputSchema,
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

export async function cardUpdateController(
  params: unknown,
  body: unknown,
  context: AppContext,
) {
  const { currentTenant } = validateHasPermission(
    permissions.cardUpdate,
    context,
  );

  const { id } = cardUpdateParamsInputSchema.parse(params);

  const data = cardUpdateBodyInputSchema.parse(body);

  const prisma = prismaAuth(context);



  await prisma.card.update({
    where: {
      id_tenantId: {
        id,
        tenantId: currentTenant.id,
      },
    },
    data: {
      cardNo: data.cardNo,
      isActive: data.isActive,
      issueDate: data.issueDate,
      deactivationDate: data.deactivationDate,
      customer: prismaRelationship.connectOrDisconnectOne(data.customer),
    },
  });

  let card = await prisma.card.findUniqueOrThrow({
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
