import { RouteConfig } from '@asteasolutions/zod-to-openapi';
import {
  voucherUpdateBodyInputSchema,
  voucherUpdateParamsInputSchema,
} from 'src/features/voucher/voucherSchemas';
import { filePopulateDownloadUrlInTree } from 'src/features/file/fileService';
import { permissions } from 'src/features/permissions';
import { validateHasPermission } from 'src/features/security';
import { prismaAuth } from 'src/prisma';
import { AppContext } from 'src/shared/controller/appContext';
import { prismaRelationship } from 'src/prisma/prismaRelationship';

export const voucherUpdateApiDoc: RouteConfig = {
  method: 'put',
  path: '/api/voucher/{id}',
  request: {
    params: voucherUpdateParamsInputSchema,
    body: {
      content: {
        'application/json': {
          schema: voucherUpdateBodyInputSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: 'Voucher',
    },
  },
};

export async function voucherUpdateController(
  params: unknown,
  body: unknown,
  context: AppContext,
) {
  const { currentTenant } = validateHasPermission(
    permissions.voucherUpdate,
    context,
  );

  const { id } = voucherUpdateParamsInputSchema.parse(params);

  const data = voucherUpdateBodyInputSchema.parse(body);

  const prisma = prismaAuth(context);



  await prisma.voucher.update({
    where: {
      id_tenantId: {
        id,
        tenantId: currentTenant.id,
      },
    },
    data: {
      date1: data.date1,
      voucherNo: data.voucherNo,
      indentNo: data.indentNo,
      approvedBy: data.approvedBy,
      qty: data.qty,
      amount: data.amount,
      customer: prismaRelationship.connectOrDisconnectOne(data.customer),
      vehicle: prismaRelationship.connectOrDisconnectOne(data.vehicle),
    },
  });

  let voucher = await prisma.voucher.findUniqueOrThrow({
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
