import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { Customer, Membership } from '@prisma/client';
import { importerInputSchema } from 'src/shared/schemas/importerSchemas';
import { orderBySchema } from 'src/shared/schemas/orderBySchema';
import { z } from 'zod';
import { customerEnumerators } from 'src/features/customer/customerEnumerators';
import { numberCoerceSchema, numberOptionalCoerceSchema } from 'src/shared/schemas/numberCoerceSchema';
import { objectToUuidSchema, objectToUuidSchemaOptional } from 'src/shared/schemas/objectToUuidSchema';
import { Rank } from '@prisma/client';
import { Vehicle } from '@prisma/client';
import { Sale } from '@prisma/client';
import { Card } from '@prisma/client';
import { Voucher } from '@prisma/client';

extendZodWithOpenApi(z);

export const customerFindSchema = z.object({
  id: z.string(),
});

export const customerFilterFormSchema = z
  .object({
    firstName: z.string(),
    lastName: z.string(),
    otherNames: z.string(),
    gender: z.nativeEnum(customerEnumerators.gender).nullable().optional(),
    serviceNo: z.string(),
    entitledCardsRange: z.array(z.coerce.number()).max(2),
    status: z.nativeEnum(customerEnumerators.status).nullable().optional(),
  })
  .partial();

export const customerFilterInputSchema = customerFilterFormSchema
  .merge(
    z.object({

    }),
  )
  .partial();

export const customerFindManyInputSchema = z.object({
  filter: customerFilterInputSchema.partial().optional(),
  orderBy: orderBySchema.default({ updatedAt: 'desc' }),
  skip: z.coerce.number().optional(),
  take: z.coerce.number().optional(),
});

export const customerDestroyManyInputSchema = z.object({
  ids: z.array(z.string()),
});

export const customerAutocompleteInputSchema = z.object({
  search: z.string().trim().optional(),
  exclude: z.array(z.string().uuid()).optional(),
  take: z.coerce.number().optional(),
  orderBy: orderBySchema.default({ firstName: 'asc' }),
});

export const customerAutocompleteOutputSchema = z.object({
  id: z.string(),
  firstName: z.string(),
});

export const customerCreateInputSchema = z.object({
  firstName: z.string().trim(),
  lastName: z.string().trim(),
  otherNames: z.string().trim().nullable().optional(),
  gender: z.nativeEnum(customerEnumerators.gender),
  serviceNo: z.string().trim().nullable().optional(),
  entitledCards: numberCoerceSchema(z.number().int().min(1)),
  status: z.nativeEnum(customerEnumerators.status).nullable().optional(),
  rank: objectToUuidSchemaOptional,
  vehicles: z.array(objectToUuidSchema).optional(),
  importHash: z.string().optional(),
});

export const customerImportInputSchema =
  customerCreateInputSchema.merge(importerInputSchema);

export const customerImportFileSchema = z
  .object({
    firstName: z.string(),
    lastName: z.string(),
    otherNames: z.string(),
    gender: z.string(),
    serviceNo: z.string(),
    entitledCards: z.string(),
    status: z.string(),
    rank: z.string(),
    vehicles: z.string().transform((val) => val.split(' ')),
  })
  .partial();

export const customerUpdateParamsInputSchema = z.object({
  id: z.string(),
});

export const customerUpdateBodyInputSchema =
  customerCreateInputSchema.partial();

export interface CustomerWithRelationships extends Customer {
  rank?: Rank;
  vehicles?: Vehicle[];
  sales?: Sale[];
  cards?: Card[];
  vouchers?: Voucher[];
  createdByMembership?: Membership;
  updatedByMembership?: Membership;
}
