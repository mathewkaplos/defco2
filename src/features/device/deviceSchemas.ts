import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { Device, Membership } from '@prisma/client';
import { importerInputSchema } from 'src/shared/schemas/importerSchemas';
import { orderBySchema } from 'src/shared/schemas/orderBySchema';
import { z } from 'zod';
import { objectToUuidSchema, objectToUuidSchemaOptional } from 'src/shared/schemas/objectToUuidSchema';
import { Station } from '@prisma/client';

extendZodWithOpenApi(z);

export const deviceFindSchema = z.object({
  id: z.string(),
});

export const deviceFilterFormSchema = z
  .object({
    deviceId: z.string(),
    description: z.string(),
  })
  .partial();

export const deviceFilterInputSchema = deviceFilterFormSchema
  .merge(
    z.object({

    }),
  )
  .partial();

export const deviceFindManyInputSchema = z.object({
  filter: deviceFilterInputSchema.partial().optional(),
  orderBy: orderBySchema.default({ updatedAt: 'desc' }),
  skip: z.coerce.number().optional(),
  take: z.coerce.number().optional(),
});

export const deviceDestroyManyInputSchema = z.object({
  ids: z.array(z.string()),
});

export const deviceAutocompleteInputSchema = z.object({
  search: z.string().trim().optional(),
  exclude: z.array(z.string().uuid()).optional(),
  take: z.coerce.number().optional(),
  orderBy: orderBySchema.default({ deviceId: 'asc' }),
});

export const deviceAutocompleteOutputSchema = z.object({
  id: z.string(),
  deviceId: z.string(),
});

export const deviceCreateInputSchema = z.object({
  deviceId: z.string().trim(),
  description: z.string().trim().nullable().optional(),
  station: objectToUuidSchemaOptional,
  importHash: z.string().optional(),
});

export const deviceImportInputSchema =
  deviceCreateInputSchema.merge(importerInputSchema);

export const deviceImportFileSchema = z
  .object({
    deviceId: z.string(),
    description: z.string(),
    station: z.string(),
  })
  .partial();

export const deviceUpdateParamsInputSchema = z.object({
  id: z.string(),
});

export const deviceUpdateBodyInputSchema =
  deviceCreateInputSchema.partial();

export interface DeviceWithRelationships extends Device {
  station?: Station;
  createdByMembership?: Membership;
  updatedByMembership?: Membership;
}
