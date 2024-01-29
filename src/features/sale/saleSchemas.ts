import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { Sale, Membership } from '@prisma/client';
import { importerInputSchema } from 'src/shared/schemas/importerSchemas';
import { orderBySchema } from 'src/shared/schemas/orderBySchema';
import { z } from 'zod';
import { dateTimeSchema, dateTimeOptionalSchema } from 'src/shared/schemas/dateTimeSchema';
import { saleEnumerators } from 'src/features/sale/saleEnumerators';
import { numberCoerceSchema, numberOptionalCoerceSchema } from 'src/shared/schemas/numberCoerceSchema';
import { objectToUuidSchema, objectToUuidSchemaOptional } from 'src/shared/schemas/objectToUuidSchema';
import { Customer } from '@prisma/client';
import { Station } from '@prisma/client';

extendZodWithOpenApi(z);

export const saleFindSchema = z.object({
  id: z.string(),
});

export const saleFilterFormSchema = z
  .object({
    date1Range: z.array(dateTimeOptionalSchema).max(2),
    fuelType: z.nativeEnum(saleEnumerators.fuelType).nullable().optional(),
    litresRange: z.array(z.coerce.number()).max(2),
    rateRange: z.array(z.coerce.number()).max(2),
    totalRange: z.array(z.coerce.number()).max(2),
    paymode: z.nativeEnum(saleEnumerators.paymode).nullable().optional(),
    cashAmountRange: z.array(z.coerce.number()).max(2),
    mpesaAmountRange: z.array(z.coerce.number()).max(2),
    invoiceAmountRange: z.array(z.coerce.number()).max(2),
  })
  .partial();

export const saleFilterInputSchema = saleFilterFormSchema
  .merge(
    z.object({

    }),
  )
  .partial();

export const saleFindManyInputSchema = z.object({
  filter: saleFilterInputSchema.partial().optional(),
  orderBy: orderBySchema.default({ updatedAt: 'desc' }),
  skip: z.coerce.number().optional(),
  take: z.coerce.number().optional(),
});

export const saleDestroyManyInputSchema = z.object({
  ids: z.array(z.string()),
});

export const saleAutocompleteInputSchema = z.object({
  search: z.string().trim().optional(),
  exclude: z.array(z.string().uuid()).optional(),
  take: z.coerce.number().optional(),
  orderBy: orderBySchema.default({ id: 'asc' }),
});

export const saleAutocompleteOutputSchema = z.object({
  id: z.string(),
});

export const saleCreateInputSchema = z.object({
  date1: dateTimeSchema,
  fuelType: z.nativeEnum(saleEnumerators.fuelType),
  litres: numberCoerceSchema(z.number().positive()),
  rate: numberCoerceSchema(z.number().positive()),
  total: numberCoerceSchema(z.number().positive()),
  paymode: z.nativeEnum(saleEnumerators.paymode),
  cashAmount: numberOptionalCoerceSchema(z.number().nullable().optional()),
  mpesaAmount: numberOptionalCoerceSchema(z.number().nullable().optional()),
  invoiceAmount: numberOptionalCoerceSchema(z.number().nullable().optional()),
  customer: objectToUuidSchemaOptional,
  station: objectToUuidSchemaOptional,
  importHash: z.string().optional(),
});

export const saleImportInputSchema =
  saleCreateInputSchema.merge(importerInputSchema);

export const saleImportFileSchema = z
  .object({
    date1: z.string(),
    fuelType: z.string(),
    litres: z.string(),
    rate: z.string(),
    total: z.string(),
    paymode: z.string(),
    cashAmount: z.string(),
    mpesaAmount: z.string(),
    invoiceAmount: z.string(),
    customer: z.string(),
    station: z.string(),
  })
  .partial();

export const saleUpdateParamsInputSchema = z.object({
  id: z.string(),
});

export const saleUpdateBodyInputSchema =
  saleCreateInputSchema.partial();

export interface SaleWithRelationships extends Sale {
  customer?: Customer;
  station?: Station;
  createdByMembership?: Membership;
  updatedByMembership?: Membership;
}
