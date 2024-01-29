import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import { cardAutocompleteApiDoc } from 'src/features/card/controllers/cardAutocompleteController';
import { cardCreateApiDoc } from 'src/features/card/controllers/cardCreateController';
import { cardDestroyManyApiDoc } from 'src/features/card/controllers/cardDestroyManyController';
import { cardFindApiDoc } from 'src/features/card/controllers/cardFindController';
import { cardFindManyApiDoc } from 'src/features/card/controllers/cardFindManyController';
import { cardImportApiDoc } from 'src/features/card/controllers/cardImporterController';
import { cardUpdateApiDoc } from 'src/features/card/controllers/cardUpdateController';

export function cardApiDocs(registry: OpenAPIRegistry, security: any) {
  [
    cardAutocompleteApiDoc,
    cardCreateApiDoc,
    cardDestroyManyApiDoc,
    cardFindApiDoc,
    cardFindManyApiDoc,
    cardUpdateApiDoc,
    cardImportApiDoc,
  ].map((apiDoc) => {
    registry.registerPath({
      ...apiDoc,
      tags: ['Card'],
      security,
    });
  });
}
