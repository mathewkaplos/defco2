import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { MaterialReceipt, Membership } from '@prisma/client';
import { importerInputSchema } from 'src/shared/schemas/importerSchemas';
import { orderBySchema } from 'src/shared/schemas/orderBySchema';
import { z } from 'zod';
import { dateSchema, dateOptionalSchema } from 'src/shared/schemas/dateSchema';
import { numberCoerceSchema, numberOptionalCoerceSchema } from 'src/shared/schemas/numberCoerceSchema';
import { objectToUuidSchema, objectToUuidSchemaOptional } from 'src/shared/schemas/objectToUuidSchema';
import { Product } from '@prisma/client';

extendZodWithOpenApi(z);

export const materialReceiptFindSchema = z.object({
  id: z.string(),
});

export const materialReceiptFilterFormSchema = z
  .object({
    date1Range: z.array(dateOptionalSchema).max(2),
    supplier: z.string(),
    quantityRange: z.array(z.coerce.number()).max(2),
    priceRange: z.array(z.coerce.number()).max(2),
    totalRange: z.array(z.coerce.number()).max(2),
  })
  .partial();

export const materialReceiptFilterInputSchema = materialReceiptFilterFormSchema
  .merge(
    z.object({

    }),
  )
  .partial();

export const materialReceiptFindManyInputSchema = z.object({
  filter: materialReceiptFilterInputSchema.partial().optional(),
  orderBy: orderBySchema.default({ updatedAt: 'desc' }),
  skip: z.coerce.number().optional(),
  take: z.coerce.number().optional(),
});

export const materialReceiptDestroyManyInputSchema = z.object({
  ids: z.array(z.string()),
});

export const materialReceiptAutocompleteInputSchema = z.object({
  search: z.string().trim().optional(),
  exclude: z.array(z.string().uuid()).optional(),
  take: z.coerce.number().optional(),
  orderBy: orderBySchema.default({ id: 'asc' }),
});

export const materialReceiptAutocompleteOutputSchema = z.object({
  id: z.string(),
});

export const materialReceiptCreateInputSchema = z.object({
  date1: dateOptionalSchema,
  supplier: z.string().trim().nullable().optional(),
  quantity: numberCoerceSchema(z.number().int()),
  price: numberCoerceSchema(z.number()),
  total: numberCoerceSchema(z.number()),
  product: objectToUuidSchemaOptional,
  importHash: z.string().optional(),
});

export const materialReceiptImportInputSchema =
  materialReceiptCreateInputSchema.merge(importerInputSchema);

export const materialReceiptImportFileSchema = z
  .object({
    date1: z.string(),
    supplier: z.string(),
    quantity: z.string(),
    price: z.string(),
    total: z.string(),
    product: z.string(),
  })
  .partial();

export const materialReceiptUpdateParamsInputSchema = z.object({
  id: z.string(),
});

export const materialReceiptUpdateBodyInputSchema =
  materialReceiptCreateInputSchema.partial();

export interface MaterialReceiptWithRelationships extends MaterialReceipt {
  product?: Product;
  createdByMembership?: Membership;
  updatedByMembership?: Membership;
}
