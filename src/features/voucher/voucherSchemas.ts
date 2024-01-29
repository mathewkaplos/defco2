import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { Voucher, Membership } from '@prisma/client';
import { importerInputSchema } from 'src/shared/schemas/importerSchemas';
import { orderBySchema } from 'src/shared/schemas/orderBySchema';
import { z } from 'zod';
import { dateSchema, dateOptionalSchema } from 'src/shared/schemas/dateSchema';
import { numberCoerceSchema, numberOptionalCoerceSchema } from 'src/shared/schemas/numberCoerceSchema';
import { objectToUuidSchema, objectToUuidSchemaOptional } from 'src/shared/schemas/objectToUuidSchema';
import { Customer } from '@prisma/client';
import { Vehicle } from '@prisma/client';

extendZodWithOpenApi(z);

export const voucherFindSchema = z.object({
  id: z.string(),
});

export const voucherFilterFormSchema = z
  .object({
    date1Range: z.array(dateOptionalSchema).max(2),
    voucherNo: z.string(),
    indentNo: z.string(),
    approvedBy: z.string(),
    qtyRange: z.array(z.coerce.number()).max(2),
    amountRange: z.array(z.coerce.number()).max(2),
  })
  .partial();

export const voucherFilterInputSchema = voucherFilterFormSchema
  .merge(
    z.object({

    }),
  )
  .partial();

export const voucherFindManyInputSchema = z.object({
  filter: voucherFilterInputSchema.partial().optional(),
  orderBy: orderBySchema.default({ updatedAt: 'desc' }),
  skip: z.coerce.number().optional(),
  take: z.coerce.number().optional(),
});

export const voucherDestroyManyInputSchema = z.object({
  ids: z.array(z.string()),
});

export const voucherAutocompleteInputSchema = z.object({
  search: z.string().trim().optional(),
  exclude: z.array(z.string().uuid()).optional(),
  take: z.coerce.number().optional(),
  orderBy: orderBySchema.default({ voucherNo: 'asc' }),
});

export const voucherAutocompleteOutputSchema = z.object({
  id: z.string(),
  voucherNo: z.string(),
});

export const voucherCreateInputSchema = z.object({
  date1: dateSchema,
  voucherNo: z.string().trim(),
  indentNo: z.string().trim(),
  approvedBy: z.string().trim(),
  qty: numberOptionalCoerceSchema(z.number().nullable().optional()),
  amount: numberOptionalCoerceSchema(z.number().nullable().optional()),
  customer: objectToUuidSchemaOptional,
  vehicle: objectToUuidSchemaOptional,
  importHash: z.string().optional(),
});

export const voucherImportInputSchema =
  voucherCreateInputSchema.merge(importerInputSchema);

export const voucherImportFileSchema = z
  .object({
    date1: z.string(),
    voucherNo: z.string(),
    indentNo: z.string(),
    approvedBy: z.string(),
    qty: z.string(),
    amount: z.string(),
    customer: z.string(),
    vehicle: z.string(),
  })
  .partial();

export const voucherUpdateParamsInputSchema = z.object({
  id: z.string(),
});

export const voucherUpdateBodyInputSchema =
  voucherCreateInputSchema.partial();

export interface VoucherWithRelationships extends Voucher {
  customer?: Customer;
  vehicle?: Vehicle;
  createdByMembership?: Membership;
  updatedByMembership?: Membership;
}
