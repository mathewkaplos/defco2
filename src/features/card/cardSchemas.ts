import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { Card, Membership } from '@prisma/client';
import { importerInputSchema } from 'src/shared/schemas/importerSchemas';
import { orderBySchema } from 'src/shared/schemas/orderBySchema';
import { z } from 'zod';
import { dateSchema, dateOptionalSchema } from 'src/shared/schemas/dateSchema';
import { objectToUuidSchema, objectToUuidSchemaOptional } from 'src/shared/schemas/objectToUuidSchema';
import { Customer } from '@prisma/client';

extendZodWithOpenApi(z);

export const cardFindSchema = z.object({
  id: z.string(),
});

export const cardFilterFormSchema = z
  .object({
    cardNo: z.string(),
    isActive: z.string().nullable().optional(),
    issueDateRange: z.array(dateOptionalSchema).max(2),
    deactivationDateRange: z.array(dateOptionalSchema).max(2),
  })
  .partial();

export const cardFilterInputSchema = cardFilterFormSchema
  .merge(
    z.object({
      isActive: z.string().optional().nullable().transform((val) => val != null && val !== '' ? val === 'true' : null),
    }),
  )
  .partial();

export const cardFindManyInputSchema = z.object({
  filter: cardFilterInputSchema.partial().optional(),
  orderBy: orderBySchema.default({ updatedAt: 'desc' }),
  skip: z.coerce.number().optional(),
  take: z.coerce.number().optional(),
});

export const cardDestroyManyInputSchema = z.object({
  ids: z.array(z.string()),
});

export const cardAutocompleteInputSchema = z.object({
  search: z.string().trim().optional(),
  exclude: z.array(z.string().uuid()).optional(),
  take: z.coerce.number().optional(),
  orderBy: orderBySchema.default({ cardNo: 'asc' }),
});

export const cardAutocompleteOutputSchema = z.object({
  id: z.string(),
  cardNo: z.string(),
});

export const cardCreateInputSchema = z.object({
  cardNo: z.string().trim(),
  isActive: z.boolean().default(false),
  issueDate: dateSchema,
  deactivationDate: dateOptionalSchema,
  customer: objectToUuidSchemaOptional,
  importHash: z.string().optional(),
});

export const cardImportInputSchema =
  cardCreateInputSchema.merge(importerInputSchema);

export const cardImportFileSchema = z
  .object({
    cardNo: z.string(),
    isActive: z.string().transform((val) => val === 'true' || val === 'TRUE'),
    issueDate: z.string(),
    deactivationDate: z.string(),
    customer: z.string(),
  })
  .partial();

export const cardUpdateParamsInputSchema = z.object({
  id: z.string(),
});

export const cardUpdateBodyInputSchema =
  cardCreateInputSchema.partial();

export interface CardWithRelationships extends Card {
  customer?: Customer;
  createdByMembership?: Membership;
  updatedByMembership?: Membership;
}
