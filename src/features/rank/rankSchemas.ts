import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { Rank, Membership } from '@prisma/client';
import { importerInputSchema } from 'src/shared/schemas/importerSchemas';
import { orderBySchema } from 'src/shared/schemas/orderBySchema';
import { z } from 'zod';
import { objectToUuidSchema, objectToUuidSchemaOptional } from 'src/shared/schemas/objectToUuidSchema';
import { Customer } from '@prisma/client';

extendZodWithOpenApi(z);

export const rankFindSchema = z.object({
  id: z.string(),
});

export const rankFilterFormSchema = z
  .object({
    name: z.string(),
    description: z.string(),
  })
  .partial();

export const rankFilterInputSchema = rankFilterFormSchema
  .merge(
    z.object({

    }),
  )
  .partial();

export const rankFindManyInputSchema = z.object({
  filter: rankFilterInputSchema.partial().optional(),
  orderBy: orderBySchema.default({ updatedAt: 'desc' }),
  skip: z.coerce.number().optional(),
  take: z.coerce.number().optional(),
});

export const rankDestroyManyInputSchema = z.object({
  ids: z.array(z.string()),
});

export const rankAutocompleteInputSchema = z.object({
  search: z.string().trim().optional(),
  exclude: z.array(z.string().uuid()).optional(),
  take: z.coerce.number().optional(),
  orderBy: orderBySchema.default({ name: 'asc' }),
});

export const rankAutocompleteOutputSchema = z.object({
  id: z.string(),
  name: z.string(),
});

export const rankCreateInputSchema = z.object({
  name: z.string().trim(),
  description: z.string().trim().nullable().optional(),
  importHash: z.string().optional(),
});

export const rankImportInputSchema =
  rankCreateInputSchema.merge(importerInputSchema);

export const rankImportFileSchema = z
  .object({
    name: z.string(),
    description: z.string(),
  })
  .partial();

export const rankUpdateParamsInputSchema = z.object({
  id: z.string(),
});

export const rankUpdateBodyInputSchema =
  rankCreateInputSchema.partial();

export interface RankWithRelationships extends Rank {
  customers?: Customer[];
  createdByMembership?: Membership;
  updatedByMembership?: Membership;
}
