import { extendZodWithOpenApi } from '@asteasolutions/zod-to-openapi';
import { Vehicle, Membership } from '@prisma/client';
import { importerInputSchema } from 'src/shared/schemas/importerSchemas';
import { orderBySchema } from 'src/shared/schemas/orderBySchema';
import { z } from 'zod';
import { numberCoerceSchema, numberOptionalCoerceSchema } from 'src/shared/schemas/numberCoerceSchema';
import { objectToUuidSchema, objectToUuidSchemaOptional } from 'src/shared/schemas/objectToUuidSchema';
import { Customer } from '@prisma/client';
import { Voucher } from '@prisma/client';

extendZodWithOpenApi(z);

export const vehicleFindSchema = z.object({
  id: z.string(),
});

export const vehicleFilterFormSchema = z
  .object({
    make: z.string(),
    regNo: z.string(),
    ccRange: z.array(z.coerce.number()).max(2),
    fullTankRange: z.array(z.coerce.number()).max(2),
    approved: z.string().nullable().optional(),
  })
  .partial();

export const vehicleFilterInputSchema = vehicleFilterFormSchema
  .merge(
    z.object({
      approved: z.string().optional().nullable().transform((val) => val != null && val !== '' ? val === 'true' : null),
    }),
  )
  .partial();

export const vehicleFindManyInputSchema = z.object({
  filter: vehicleFilterInputSchema.partial().optional(),
  orderBy: orderBySchema.default({ updatedAt: 'desc' }),
  skip: z.coerce.number().optional(),
  take: z.coerce.number().optional(),
});

export const vehicleDestroyManyInputSchema = z.object({
  ids: z.array(z.string()),
});

export const vehicleAutocompleteInputSchema = z.object({
  search: z.string().trim().optional(),
  exclude: z.array(z.string().uuid()).optional(),
  take: z.coerce.number().optional(),
  orderBy: orderBySchema.default({ regNo: 'asc' }),
});

export const vehicleAutocompleteOutputSchema = z.object({
  id: z.string(),
  regNo: z.string(),
});

export const vehicleCreateInputSchema = z.object({
  make: z.string().trim(),
  regNo: z.string().trim(),
  cc: numberCoerceSchema(z.number().int().positive()),
  fullTank: numberCoerceSchema(z.number().int().positive()),
  approved: z.boolean().default(false),
  customer: objectToUuidSchemaOptional,
  approvedBy: objectToUuidSchemaOptional,
  importHash: z.string().optional(),
});

export const vehicleImportInputSchema =
  vehicleCreateInputSchema.merge(importerInputSchema);

export const vehicleImportFileSchema = z
  .object({
    make: z.string(),
    regNo: z.string(),
    cc: z.string(),
    fullTank: z.string(),
    approved: z.string().transform((val) => val === 'true' || val === 'TRUE'),
    customer: z.string(),
    approvedBy: z.string(),
  })
  .partial();

export const vehicleUpdateParamsInputSchema = z.object({
  id: z.string(),
});

export const vehicleUpdateBodyInputSchema =
  vehicleCreateInputSchema.partial();

export interface VehicleWithRelationships extends Vehicle {
  customer?: Customer;
  approvedBy?: Membership;
  vouchers?: Voucher[];
  createdByMembership?: Membership;
  updatedByMembership?: Membership;
}
