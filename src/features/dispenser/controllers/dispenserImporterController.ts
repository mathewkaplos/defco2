import { RouteConfig } from '@asteasolutions/zod-to-openapi';
import { dispenserCreate } from 'src/features/dispenser/controllers/dispenserCreateController';
import { dispenserImportInputSchema } from 'src/features/dispenser/dispenserSchemas';
import { permissions } from 'src/features/permissions';
import { validateHasPermission } from 'src/features/security';
import { prismaAuth } from 'src/prisma';
import { AppContext } from 'src/shared/controller/appContext';
import Error400 from 'src/shared/errors/Error400';
import { importerOutputSchema } from 'src/shared/schemas/importerSchemas';
import { z } from 'zod';

export const dispenserImportApiDoc: RouteConfig = {
  method: 'post',
  path: '/api/dispenser/importer',
  request: {
    body: {
      content: {
        'application/json': {
          schema: z.array(dispenserImportInputSchema),
        },
      },
    },
  },
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: importerOutputSchema,
        },
      },
    },
  },
};

export async function dispenserImporterController(
  body: unknown,
  context: AppContext,
) {
  validateHasPermission(permissions.dispenserImport, context);
  const prisma = await prismaAuth(context);

  const bodyAsArray = Array.isArray(body) ? body : [body];
  const output: z.infer<typeof importerOutputSchema> = [];

  for (let row of bodyAsArray) {
    try {
      const data = dispenserImportInputSchema.parse(row);

      const isImportHashExistent = Boolean(
        await prisma.dispenser.count({
          where: {
            importHash: data.importHash,
          },
        }),
      );

      if (isImportHashExistent) {
        throw new Error400(
          context.dictionary.shared.importer.importHashAlreadyExists,
        );
      }

      await dispenserCreate(row, context);

      output.push({
        _status: 'success',
        _line: (row as any)._line,
      });
    } catch (error: any) {
      output.push({
        _status: 'error',
        _line: (row as any)._line,
        _errorMessages: [error.message],
      });
    }
  }

  return output;
}
