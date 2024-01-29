import { RouteConfig } from '@asteasolutions/zod-to-openapi';
import { stationCreate } from 'src/features/station/controllers/stationCreateController';
import { stationImportInputSchema } from 'src/features/station/stationSchemas';
import { permissions } from 'src/features/permissions';
import { validateHasPermission } from 'src/features/security';
import { prismaAuth } from 'src/prisma';
import { AppContext } from 'src/shared/controller/appContext';
import Error400 from 'src/shared/errors/Error400';
import { importerOutputSchema } from 'src/shared/schemas/importerSchemas';
import { z } from 'zod';

export const stationImportApiDoc: RouteConfig = {
  method: 'post',
  path: '/api/station/importer',
  request: {
    body: {
      content: {
        'application/json': {
          schema: z.array(stationImportInputSchema),
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

export async function stationImporterController(
  body: unknown,
  context: AppContext,
) {
  validateHasPermission(permissions.stationImport, context);
  const prisma = await prismaAuth(context);

  const bodyAsArray = Array.isArray(body) ? body : [body];
  const output: z.infer<typeof importerOutputSchema> = [];

  for (let row of bodyAsArray) {
    try {
      const data = stationImportInputSchema.parse(row);

      const isImportHashExistent = Boolean(
        await prisma.station.count({
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

      await stationCreate(row, context);

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
