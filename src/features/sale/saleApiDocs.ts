import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import { saleAutocompleteApiDoc } from 'src/features/sale/controllers/saleAutocompleteController';
import { saleCreateApiDoc } from 'src/features/sale/controllers/saleCreateController';
import { saleDestroyManyApiDoc } from 'src/features/sale/controllers/saleDestroyManyController';
import { saleFindApiDoc } from 'src/features/sale/controllers/saleFindController';
import { saleFindManyApiDoc } from 'src/features/sale/controllers/saleFindManyController';
import { saleImportApiDoc } from 'src/features/sale/controllers/saleImporterController';
import { saleUpdateApiDoc } from 'src/features/sale/controllers/saleUpdateController';

export function saleApiDocs(registry: OpenAPIRegistry, security: any) {
  [
    saleAutocompleteApiDoc,
    saleCreateApiDoc,
    saleDestroyManyApiDoc,
    saleFindApiDoc,
    saleFindManyApiDoc,
    saleUpdateApiDoc,
    saleImportApiDoc,
  ].map((apiDoc) => {
    registry.registerPath({
      ...apiDoc,
      tags: ['Sale'],
      security,
    });
  });
}
