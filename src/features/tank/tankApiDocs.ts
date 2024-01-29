import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import { tankAutocompleteApiDoc } from 'src/features/tank/controllers/tankAutocompleteController';
import { tankCreateApiDoc } from 'src/features/tank/controllers/tankCreateController';
import { tankDestroyManyApiDoc } from 'src/features/tank/controllers/tankDestroyManyController';
import { tankFindApiDoc } from 'src/features/tank/controllers/tankFindController';
import { tankFindManyApiDoc } from 'src/features/tank/controllers/tankFindManyController';
import { tankImportApiDoc } from 'src/features/tank/controllers/tankImporterController';
import { tankUpdateApiDoc } from 'src/features/tank/controllers/tankUpdateController';

export function tankApiDocs(registry: OpenAPIRegistry, security: any) {
  [
    tankAutocompleteApiDoc,
    tankCreateApiDoc,
    tankDestroyManyApiDoc,
    tankFindApiDoc,
    tankFindManyApiDoc,
    tankUpdateApiDoc,
    tankImportApiDoc,
  ].map((apiDoc) => {
    registry.registerPath({
      ...apiDoc,
      tags: ['Tank'],
      security,
    });
  });
}
