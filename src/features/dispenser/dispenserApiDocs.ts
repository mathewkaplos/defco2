import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import { dispenserAutocompleteApiDoc } from 'src/features/dispenser/controllers/dispenserAutocompleteController';
import { dispenserCreateApiDoc } from 'src/features/dispenser/controllers/dispenserCreateController';
import { dispenserDestroyManyApiDoc } from 'src/features/dispenser/controllers/dispenserDestroyManyController';
import { dispenserFindApiDoc } from 'src/features/dispenser/controllers/dispenserFindController';
import { dispenserFindManyApiDoc } from 'src/features/dispenser/controllers/dispenserFindManyController';
import { dispenserImportApiDoc } from 'src/features/dispenser/controllers/dispenserImporterController';
import { dispenserUpdateApiDoc } from 'src/features/dispenser/controllers/dispenserUpdateController';

export function dispenserApiDocs(registry: OpenAPIRegistry, security: any) {
  [
    dispenserAutocompleteApiDoc,
    dispenserCreateApiDoc,
    dispenserDestroyManyApiDoc,
    dispenserFindApiDoc,
    dispenserFindManyApiDoc,
    dispenserUpdateApiDoc,
    dispenserImportApiDoc,
  ].map((apiDoc) => {
    registry.registerPath({
      ...apiDoc,
      tags: ['Dispenser'],
      security,
    });
  });
}
