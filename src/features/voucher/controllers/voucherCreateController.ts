import { RouteConfig } from '@asteasolutions/zod-to-openapi';
import { voucherCreateInputSchema } from 'src/features/voucher/voucherSchemas';
import { filePopulateDownloadUrlInTree } from 'src/features/file/fileService';
import { permissions } from 'src/features/permissions';
import { validateHasPermission } from 'src/features/security';
import { prismaAuth } from 'src/prisma';
import { AppContext } from 'src/shared/controller/appContext';
import { prismaRelationship } from 'src/prisma/prismaRelationship';

export const voucherCreateApiDoc: RouteConfig = {
  method: 'post',
  path: '/api/voucher',
  request: {
    body: {
      content: {
        'application/json': {
          schema: voucherCreateInputSchema,
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

export async function voucherCreateController(
  body: unknown,
  context: AppContext,
) {
  validateHasPermission(permissions.voucherCreate, context);
  return await voucherCreate(body, context);
}

export async function voucherCreate(body: unknown, context: AppContext) {
  const data = voucherCreateInputSchema.parse(body);

  const prisma = prismaAuth(context);



  let voucher = await prisma.voucher.create({
    data: {
      date1: data.date1,
      voucherNo: data.voucherNo,
      indentNo: data.indentNo,
      approvedBy: data.approvedBy,
      qty: data.qty,
      amount: data.amount,
      customer: prismaRelationship.connectOne(data.customer),
      vehicle: prismaRelationship.connectOne(data.vehicle),
      importHash: data.importHash,
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
