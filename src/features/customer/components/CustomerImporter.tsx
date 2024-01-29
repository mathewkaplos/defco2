'use client';

import { customerImportApiCall } from 'src/features/customer/customerApiCalls';
import {
  customerImportFileSchema,
  customerImportInputSchema,
} from 'src/features/customer/customerSchemas';
import { Importer } from 'src/shared/components/importer/Importer';
import { AppContext } from 'src/shared/controller/appContext';

export function CustomerImporter({ context }: { context: AppContext }) {
  return (
    <Importer
      keys={[
        'firstName',
        'lastName',
        'otherNames',
        'gender',
        'serviceNo',
        'entitledCards',
        'status',
        'rank',
        'vehicles',
      ]}
      labels={context.dictionary.customer.fields}
      context={context}
      validationSchema={customerImportInputSchema}
      fileSchema={customerImportFileSchema}
      importerFn={customerImportApiCall}
      breadcrumbRoot={[context.dictionary.customer.list.menu, '/customer']}
      queryKeyToInvalidate={['customer']}
    />
  );
}
