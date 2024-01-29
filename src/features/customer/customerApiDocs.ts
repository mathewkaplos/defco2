import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import { customerAutocompleteApiDoc } from 'src/features/customer/controllers/customerAutocompleteController';
import { customerCreateApiDoc } from 'src/features/customer/controllers/customerCreateController';
import { customerDestroyManyApiDoc } from 'src/features/customer/controllers/customerDestroyManyController';
import { customerFindApiDoc } from 'src/features/customer/controllers/customerFindController';
import { customerFindManyApiDoc } from 'src/features/customer/controllers/customerFindManyController';
import { customerImportApiDoc } from 'src/features/customer/controllers/customerImporterController';
import { customerUpdateApiDoc } from 'src/features/customer/controllers/customerUpdateController';

export function customerApiDocs(registry: OpenAPIRegistry, security: any) {
  [
    customerAutocompleteApiDoc,
    customerCreateApiDoc,
    customerDestroyManyApiDoc,
    customerFindApiDoc,
    customerFindManyApiDoc,
    customerUpdateApiDoc,
    customerImportApiDoc,
  ].map((apiDoc) => {
    registry.registerPath({
      ...apiDoc,
      tags: ['Customer'],
      security,
    });
  });
}
