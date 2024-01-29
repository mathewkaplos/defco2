import { RouteConfig } from '@asteasolutions/zod-to-openapi';
import { voucherFindSchema } from 'src/features/voucher/voucherSchemas';
import { permissions } from 'src/features/permissions';
import { validateHasPermission } from 'src/features/security';
import { prismaAuth } from 'src/prisma';
import { AppContext } from 'src/shared/controller/appContext';
import { filePopulateDownloadUrlInTree } from 'src/features/file/fileService';

export const voucherFindApiDoc: RouteConfig = {
  method: 'get',
  path: '/api/voucher/{id}',
  request: {
    params: voucherFindSchema,
  },
  responses: {
    200: {
      description: 'Voucher',
    },
  },
};

export async function voucherFindController(
  params: unknown,
  context: AppContext,
) {
  const { currentTenant } = validateHasPermission(
    permissions.voucherRead,
    context,
  );

  const { id } = voucherFindSchema.parse(params);

  const prisma = prismaAuth(context);

  let voucher = await prisma.voucher.findUnique({
    where: {
      id_tenantId: {
        id,
        tenantId: currentTenant.id,
      },
    },
    include: {
      customer: true,
      vehicle: true,
      createdByMembership: true,
      updatedByMembership: true,
    },
  });

  voucher = await filePopulateDownloadUrlInTree(voucher);

  return voucher;
}
