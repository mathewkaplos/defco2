import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import { rankAutocompleteApiDoc } from 'src/features/rank/controllers/rankAutocompleteController';
import { rankCreateApiDoc } from 'src/features/rank/controllers/rankCreateController';
import { rankDestroyManyApiDoc } from 'src/features/rank/controllers/rankDestroyManyController';
import { rankFindApiDoc } from 'src/features/rank/controllers/rankFindController';
import { rankFindManyApiDoc } from 'src/features/rank/controllers/rankFindManyController';
import { rankImportApiDoc } from 'src/features/rank/controllers/rankImporterController';
import { rankUpdateApiDoc } from 'src/features/rank/controllers/rankUpdateController';

export function rankApiDocs(registry: OpenAPIRegistry, security: any) {
  [
    rankAutocompleteApiDoc,
    rankCreateApiDoc,
    rankDestroyManyApiDoc,
    rankFindApiDoc,
    rankFindManyApiDoc,
    rankUpdateApiDoc,
    rankImportApiDoc,
  ].map((apiDoc) => {
    registry.registerPath({
      ...apiDoc,
      tags: ['Rank'],
      security,
    });
  });
}
