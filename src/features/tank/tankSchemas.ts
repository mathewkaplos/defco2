import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { Tank, Membership } from '@prisma/client';
import { importerInputSchema } from 'src/shared/schemas/importerSchemas';
import { orderBySchema } from 'src/shared/schemas/orderBySchema';
import { z } from 'zod';
import { numberCoerceSchema, numberOptionalCoerceSchema } from 'src/shared/schemas/numberCoerceSchema';
import { objectToUuidSchema, objectToUuidSchemaOptional } from 'src/shared/schemas/objectToUuidSchema';
import { Station } from '@prisma/client';

extendZodWithOpenApi(z);

export const tankFindSchema = z.object({
  id: z.string(),
});

export const tankFilterFormSchema = z
  .object({
    name: z.string(),
    capacityRange: z.array(z.coerce.number()).max(2),
  })
  .partial();

export const tankFilterInputSchema = tankFilterFormSchema
  .merge(
    z.object({

    }),
  )
  .partial();

export const tankFindManyInputSchema = z.object({
  filter: tankFilterInputSchema.partial().optional(),
  orderBy: orderBySchema.default({ updatedAt: 'desc' }),
  skip: z.coerce.number().optional(),
  take: z.coerce.number().optional(),
});

export const tankDestroyManyInputSchema = z.object({
  ids: z.array(z.string()),
});

export const tankAutocompleteInputSchema = z.object({
  search: z.string().trim().optional(),
  exclude: z.array(z.string().uuid()).optional(),
  take: z.coerce.number().optional(),
  orderBy: orderBySchema.default({ name: 'asc' }),
});

export const tankAutocompleteOutputSchema = z.object({
  id: z.string(),
  name: z.string(),
});

export const tankCreateInputSchema = z.object({
  name: z.string().trim(),
  capacity: numberOptionalCoerceSchema(z.number().int().nullable().optional()),
  station: objectToUuidSchemaOptional,
  importHash: z.string().optional(),
});

export const tankImportInputSchema =
  tankCreateInputSchema.merge(importerInputSchema);

export const tankImportFileSchema = z
  .object({
    name: z.string(),
    capacity: z.string(),
    station: z.string(),
  })
  .partial();

export const tankUpdateParamsInputSchema = z.object({
  id: z.string(),
});

export const tankUpdateBodyInputSchema =
  tankCreateInputSchema.partial();

export interface TankWithRelationships extends Tank {
  station?: Station;
  createdByMembership?: Membership;
  updatedByMembership?: Membership;
}
