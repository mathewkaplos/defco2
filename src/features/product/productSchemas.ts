import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { Product, Membership } from '@prisma/client';
import { importerInputSchema } from 'src/shared/schemas/importerSchemas';
import { orderBySchema } from 'src/shared/schemas/orderBySchema';
import { z } from 'zod';
import { numberCoerceSchema, numberOptionalCoerceSchema } from 'src/shared/schemas/numberCoerceSchema';
import { objectToUuidSchema, objectToUuidSchemaOptional } from 'src/shared/schemas/objectToUuidSchema';
import { MaterialReceipt } from '@prisma/client';

extendZodWithOpenApi(z);

export const productFindSchema = z.object({
  id: z.string(),
});

export const productFilterFormSchema = z
  .object({
    name: z.string(),
    priceRange: z.array(z.coerce.number()).max(2),
  })
  .partial();

export const productFilterInputSchema = productFilterFormSchema
  .merge(
    z.object({

    }),
  )
  .partial();

export const productFindManyInputSchema = z.object({
  filter: productFilterInputSchema.partial().optional(),
  orderBy: orderBySchema.default({ updatedAt: 'desc' }),
  skip: z.coerce.number().optional(),
  take: z.coerce.number().optional(),
});

export const productDestroyManyInputSchema = z.object({
  ids: z.array(z.string()),
});

export const productAutocompleteInputSchema = z.object({
  search: z.string().trim().optional(),
  exclude: z.array(z.string().uuid()).optional(),
  take: z.coerce.number().optional(),
  orderBy: orderBySchema.default({ name: 'asc' }),
});

export const productAutocompleteOutputSchema = z.object({
  id: z.string(),
  name: z.string(),
});

export const productCreateInputSchema = z.object({
  name: z.string().trim(),
  price: numberOptionalCoerceSchema(z.number().nullable().optional()),
  importHash: z.string().optional(),
});

export const productImportInputSchema =
  productCreateInputSchema.merge(importerInputSchema);

export const productImportFileSchema = z
  .object({
    name: z.string(),
    price: z.string(),
  })
  .partial();

export const productUpdateParamsInputSchema = z.object({
  id: z.string(),
});

export const productUpdateBodyInputSchema =
  productCreateInputSchema.partial();

export interface ProductWithRelationships extends Product {
  receipts?: MaterialReceipt[];
  createdByMembership?: Membership;
  updatedByMembership?: Membership;
}
