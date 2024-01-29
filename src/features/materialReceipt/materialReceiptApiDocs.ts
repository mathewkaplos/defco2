import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import { materialReceiptAutocompleteApiDoc } from 'src/features/materialReceipt/controllers/materialReceiptAutocompleteController';
import { materialReceiptCreateApiDoc } from 'src/features/materialReceipt/controllers/materialReceiptCreateController';
import { materialReceiptDestroyManyApiDoc } from 'src/features/materialReceipt/controllers/materialReceiptDestroyManyController';
import { materialReceiptFindApiDoc } from 'src/features/materialReceipt/controllers/materialReceiptFindController';
import { materialReceiptFindManyApiDoc } from 'src/features/materialReceipt/controllers/materialReceiptFindManyController';
import { materialReceiptImportApiDoc } from 'src/features/materialReceipt/controllers/materialReceiptImporterController';
import { materialReceiptUpdateApiDoc } from 'src/features/materialReceipt/controllers/materialReceiptUpdateController';

export function materialReceiptApiDocs(registry: OpenAPIRegistry, security: any) {
  [
    materialReceiptAutocompleteApiDoc,
    materialReceiptCreateApiDoc,
    materialReceiptDestroyManyApiDoc,
    materialReceiptFindApiDoc,
    materialReceiptFindManyApiDoc,
    materialReceiptUpdateApiDoc,
    materialReceiptImportApiDoc,
  ].map((apiDoc) => {
    registry.registerPath({
      ...apiDoc,
      tags: ['MaterialReceipt'],
      security,
    });
  });
}
