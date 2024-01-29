import { RouteConfig } from '@asteasolutions/zod-to-openapi';
import { Prisma } from '@prisma/client';
import dayjs from 'dayjs';
import { voucherFindManyInputSchema } from 'src/features/voucher/voucherSchemas';
import { permissions } from 'src/features/permissions';
import { validateHasPermission } from 'src/features/security';
import { prismaAuth } from 'src/prisma';
import { AppContext } from 'src/shared/controller/appContext';
import { filePopulateDownloadUrlInTree } from 'src/features/file/fileService';

export const voucherFindManyApiDoc: RouteConfig = {
  method: 'get',
  path: '/api/voucher',
  request: {
    query: voucherFindManyInputSchema,
  },
  responses: {
    200: {
      description: '{ vouchers: Voucher[], count: number }',
    },
  },
};

export async function voucherFindManyController(
  query: unknown,
  context: AppContext,
) {
  const { currentTenant } = validateHasPermission(
    permissions.voucherRead,
    context,
  );

  const { filter, orderBy, skip, take } =
    voucherFindManyInputSchema.parse(query);

  const whereAnd: Array<Prisma.VoucherWhereInput> = [];

  whereAnd.push({
    tenant: {
      id: currentTenant.id,
    },
  });

  if (filter?.date1Range?.length) {
    const start = filter.date1Range?.[0];
    const end = filter.date1Range?.[1];

    if (start != null) {
      whereAnd.push({
        date1: {
          gte: start,
        },
      });
    }

    if (end != null) {
      whereAnd.push({
        date1: {
          lte: end,
        },
      });
    }
  }

  if (filter?.voucherNo != null) {
    whereAnd.push({
      voucherNo: { contains: filter?.voucherNo, mode: 'insensitive' },
    });
  }

  if (filter?.indentNo != null) {
    whereAnd.push({
      indentNo: { contains: filter?.indentNo, mode: 'insensitive' },
    });
  }

  if (filter?.approvedBy != null) {
    whereAnd.push({
      approvedBy: { contains: filter?.approvedBy, mode: 'insensitive' },
    });
  }

  if (filter?.qtyRange?.length) {
    const start = filter.qtyRange?.[0];
    const end = filter.qtyRange?.[1];

    if (start != null) {
      whereAnd.push({
        qty: { gte: start },
      });
    }

    if (end != null) {
      whereAnd.push({
        qty: { lte: end },
      });
    }
  }

  if (filter?.amountRange?.length) {
    const start = filter.amountRange?.[0];
    const end = filter.amountRange?.[1];

    if (start != null) {
      whereAnd.push({
        amount: { gte: start },
      });
    }

    if (end != null) {
      whereAnd.push({
        amount: { lte: end },
      });
    }
  }

  const prisma = prismaAuth(context);

  let vouchers = await prisma.voucher.findMany({
    where: {
      AND: whereAnd,
    },
    skip,
    take,
    orderBy,
  });

  const count = await prisma.voucher.count({
    where: {
      AND: whereAnd,
    },
  });

  vouchers = await filePopulateDownloadUrlInTree(vouchers);

  return { vouchers, count };
}
