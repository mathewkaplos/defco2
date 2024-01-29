import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import { stationAutocompleteApiDoc } from 'src/features/station/controllers/stationAutocompleteController';
import { stationCreateApiDoc } from 'src/features/station/controllers/stationCreateController';
import { stationDestroyManyApiDoc } from 'src/features/station/controllers/stationDestroyManyController';
import { stationFindApiDoc } from 'src/features/station/controllers/stationFindController';
import { stationFindManyApiDoc } from 'src/features/station/controllers/stationFindManyController';
import { stationImportApiDoc } from 'src/features/station/controllers/stationImporterController';
import { stationUpdateApiDoc } from 'src/features/station/controllers/stationUpdateController';

export function stationApiDocs(registry: OpenAPIRegistry, security: any) {
  [
    stationAutocompleteApiDoc,
    stationCreateApiDoc,
    stationDestroyManyApiDoc,
    stationFindApiDoc,
    stationFindManyApiDoc,
    stationUpdateApiDoc,
    stationImportApiDoc,
  ].map((apiDoc) => {
    registry.registerPath({
      ...apiDoc,
      tags: ['Station'],
      security,
    });
  });
}
