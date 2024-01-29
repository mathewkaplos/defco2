import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { Station, Membership } from '@prisma/client';
import { importerInputSchema } from 'src/shared/schemas/importerSchemas';
import { orderBySchema } from 'src/shared/schemas/orderBySchema';
import { z } from 'zod';
import { objectToUuidSchema, objectToUuidSchemaOptional } from 'src/shared/schemas/objectToUuidSchema';
import { Dispenser } from '@prisma/client';
import { Tank } from '@prisma/client';
import { Sale } from '@prisma/client';
import { Device } from '@prisma/client';

extendZodWithOpenApi(z);

export const stationFindSchema = z.object({
  id: z.string(),
});

export const stationFilterFormSchema = z
  .object({
    name: z.string(),
    description: z.string(),
    location: z.string(),
  })
  .partial();

export const stationFilterInputSchema = stationFilterFormSchema
  .merge(
    z.object({

    }),
  )
  .partial();

export const stationFindManyInputSchema = z.object({
  filter: stationFilterInputSchema.partial().optional(),
  orderBy: orderBySchema.default({ updatedAt: 'desc' }),
  skip: z.coerce.number().optional(),
  take: z.coerce.number().optional(),
});

export const stationDestroyManyInputSchema = z.object({
  ids: z.array(z.string()),
});

export const stationAutocompleteInputSchema = z.object({
  search: z.string().trim().optional(),
  exclude: z.array(z.string().uuid()).optional(),
  take: z.coerce.number().optional(),
  orderBy: orderBySchema.default({ name: 'asc' }),
});

export const stationAutocompleteOutputSchema = z.object({
  id: z.string(),
  name: z.string(),
});

export const stationCreateInputSchema = z.object({
  name: z.string().trim(),
  description: z.string().trim().nullable().optional(),
  location: z.string().trim().nullable().optional(),
  supervisor: objectToUuidSchemaOptional,
  importHash: z.string().optional(),
});

export const stationImportInputSchema =
  stationCreateInputSchema.merge(importerInputSchema);

export const stationImportFileSchema = z
  .object({
    name: z.string(),
    description: z.string(),
    location: z.string(),
    supervisor: z.string(),
  })
  .partial();

export const stationUpdateParamsInputSchema = z.object({
  id: z.string(),
});

export const stationUpdateBodyInputSchema =
  stationCreateInputSchema.partial();

export interface StationWithRelationships extends Station {
  supervisor?: Membership;
  dispensers?: Dispenser[];
  tanks?: Tank[];
  sales?: Sale[];
  devices?: Device[];
  createdByMembership?: Membership;
  updatedByMembership?: Membership;
}
