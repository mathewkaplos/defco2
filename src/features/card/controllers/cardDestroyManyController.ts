import { RouteConfig } from '@asteasolutions/zod-to-openapi';
import { cardDestroyManyInputSchema } from 'src/features/card/cardSchemas';
import { permissions } from 'src/features/permissions';
import { validateHasPermission } from 'src/features/security';
import { prismaAuth } from 'src/prisma';
import { AppContext } from 'src/shared/controller/appContext';
import Error400 from 'src/shared/errors/Error400';
import { formatTranslation } from 'src/translation/formatTranslation';

export const cardDestroyManyApiDoc: RouteConfig = {
  method: 'delete',
  path: '/api/card',
  request: {
    query: cardDestroyManyInputSchema,
  },
  responses: {
    200: {
      description: 'OK',
    },
  },
};

export async function cardDestroyManyController(
  query: unknown,
  context: AppContext,
) {
  const { currentTenant } = validateHasPermission(
    permissions.cardDestroy,
    context,
  );

  const { ids } = cardDestroyManyInputSchema.parse(query);

  const prisma = prismaAuth(context);



  return await prisma.card.deleteMany({
    where: {
      id: { in: ids },
      tenantId: currentTenant.id,
    },
  });
}
