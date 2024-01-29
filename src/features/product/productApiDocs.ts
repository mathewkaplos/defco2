import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import { productAutocompleteApiDoc } from 'src/features/product/controllers/productAutocompleteController';
import { productCreateApiDoc } from 'src/features/product/controllers/productCreateController';
import { productDestroyManyApiDoc } from 'src/features/product/controllers/productDestroyManyController';
import { productFindApiDoc } from 'src/features/product/controllers/productFindController';
import { productFindManyApiDoc } from 'src/features/product/controllers/productFindManyController';
import { productImportApiDoc } from 'src/features/product/controllers/productImporterController';
import { productUpdateApiDoc } from 'src/features/product/controllers/productUpdateController';

export function productApiDocs(registry: OpenAPIRegistry, security: any) {
  [
    productAutocompleteApiDoc,
    productCreateApiDoc,
    productDestroyManyApiDoc,
    productFindApiDoc,
    productFindManyApiDoc,
    productUpdateApiDoc,
    productImportApiDoc,
  ].map((apiDoc) => {
    registry.registerPath({
      ...apiDoc,
      tags: ['Product'],
      security,
    });
  });
}
