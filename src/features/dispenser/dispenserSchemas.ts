import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { Dispenser, Membership } from '@prisma/client';
import { importerInputSchema } from 'src/shared/schemas/importerSchemas';
import { orderBySchema } from 'src/shared/schemas/orderBySchema';
import { z } from 'zod';
import { dispenserEnumerators } from 'src/features/dispenser/dispenserEnumerators';
import { objectToUuidSchema, objectToUuidSchemaOptional } from 'src/shared/schemas/objectToUuidSchema';
import { Station } from '@prisma/client';

extendZodWithOpenApi(z);

export const dispenserFindSchema = z.object({
  id: z.string(),
});

export const dispenserFilterFormSchema = z
  .object({
    name: z.string(),
    model: z.string(),
    fuelType: z.nativeEnum(dispenserEnumerators.fuelType).nullable().optional(),
  })
  .partial();

export const dispenserFilterInputSchema = dispenserFilterFormSchema
  .merge(
    z.object({

    }),
  )
  .partial();

export const dispenserFindManyInputSchema = z.object({
  filter: dispenserFilterInputSchema.partial().optional(),
  orderBy: orderBySchema.default({ updatedAt: 'desc' }),
  skip: z.coerce.number().optional(),
  take: z.coerce.number().optional(),
});

export const dispenserDestroyManyInputSchema = z.object({
  ids: z.array(z.string()),
});

export const dispenserAutocompleteInputSchema = z.object({
  search: z.string().trim().optional(),
  exclude: z.array(z.string().uuid()).optional(),
  take: z.coerce.number().optional(),
  orderBy: orderBySchema.default({ name: 'asc' }),
});

export const dispenserAutocompleteOutputSchema = z.object({
  id: z.string(),
  name: z.string(),
});

export const dispenserCreateInputSchema = z.object({
  name: z.string().trim(),
  model: z.string().trim(),
  fuelType: z.nativeEnum(dispenserEnumerators.fuelType),
  station: objectToUuidSchemaOptional,
  importHash: z.string().optional(),
});

export const dispenserImportInputSchema =
  dispenserCreateInputSchema.merge(importerInputSchema);

export const dispenserImportFileSchema = z
  .object({
    name: z.string(),
    model: z.string(),
    fuelType: z.string(),
    station: z.string(),
  })
  .partial();

export const dispenserUpdateParamsInputSchema = z.object({
  id: z.string(),
});

export const dispenserUpdateBodyInputSchema =
  dispenserCreateInputSchema.partial();

export interface DispenserWithRelationships extends Dispenser {
  station?: Station;
  createdByMembership?: Membership;
  updatedByMembership?: Membership;
}
