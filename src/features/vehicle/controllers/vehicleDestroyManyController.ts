import { RouteConfig } from '@asteasolutions/zod-to-openapi';
import { vehicleDestroyManyInputSchema } from 'src/features/vehicle/vehicleSchemas';
import { permissions } from 'src/features/permissions';
import { validateHasPermission } from 'src/features/security';
import { prismaAuth } from 'src/prisma';
import { AppContext } from 'src/shared/controller/appContext';
import Error400 from 'src/shared/errors/Error400';
import { formatTranslation } from 'src/translation/formatTranslation';

export const vehicleDestroyManyApiDoc: RouteConfig = {
  method: 'delete',
  path: '/api/vehicle',
  request: {
    query: vehicleDestroyManyInputSchema,
  },
  responses: {
    200: {
      description: 'OK',
    },
  },
};

export async function vehicleDestroyManyController(
  query: unknown,
  context: AppContext,
) {
  const { currentTenant } = validateHasPermission(
    permissions.vehicleDestroy,
    context,
  );

  const { ids } = vehicleDestroyManyInputSchema.parse(query);

  const prisma = prismaAuth(context);

  if (
    await prisma.customer.count({
      where: { vehicles: { some: { id: { in: ids } } } },
    })
  ) {
    throw new Error400(
      formatTranslation(
        context.dictionary.shared.errors.cannotDeleteReferenced,
        context.dictionary.customer.label,
        context.dictionary.customer.fields.vehicles,
      ),
    );
  }

  return await prisma.vehicle.deleteMany({
    where: {
      id: { in: ids },
      tenantId: currentTenant.id,
    },
  });
}
