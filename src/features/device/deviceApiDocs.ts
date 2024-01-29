import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import { deviceAutocompleteApiDoc } from 'src/features/device/controllers/deviceAutocompleteController';
import { deviceCreateApiDoc } from 'src/features/device/controllers/deviceCreateController';
import { deviceDestroyManyApiDoc } from 'src/features/device/controllers/deviceDestroyManyController';
import { deviceFindApiDoc } from 'src/features/device/controllers/deviceFindController';
import { deviceFindManyApiDoc } from 'src/features/device/controllers/deviceFindManyController';
import { deviceImportApiDoc } from 'src/features/device/controllers/deviceImporterController';
import { deviceUpdateApiDoc } from 'src/features/device/controllers/deviceUpdateController';

export function deviceApiDocs(registry: OpenAPIRegistry, security: any) {
  [
    deviceAutocompleteApiDoc,
    deviceCreateApiDoc,
    deviceDestroyManyApiDoc,
    deviceFindApiDoc,
    deviceFindManyApiDoc,
    deviceUpdateApiDoc,
    deviceImportApiDoc,
  ].map((apiDoc) => {
    registry.registerPath({
      ...apiDoc,
      tags: ['Device'],
      security,
    });
  });
}
