'use client';

import { materialReceiptImportApiCall } from 'src/features/materialReceipt/materialReceiptApiCalls';
import {
  materialReceiptImportFileSchema,
  materialReceiptImportInputSchema,
} from 'src/features/materialReceipt/materialReceiptSchemas';
import { Importer } from 'src/shared/components/importer/Importer';
import { AppContext } from 'src/shared/controller/appContext';

export function MaterialReceiptImporter({ context }: { context: AppContext }) {
  return (
    <Importer
      keys={[
        'date1',
        'supplier',
        'quantity',
        'price',
        'total',
        'product',
      ]}
      labels={context.dictionary.materialReceipt.fields}
      context={context}
      validationSchema={materialReceiptImportInputSchema}
      fileSchema={materialReceiptImportFileSchema}
      importerFn={materialReceiptImportApiCall}
      breadcrumbRoot={[context.dictionary.materialReceipt.list.menu, '/material-receipt']}
      queryKeyToInvalidate={['materialReceipt']}
    />
  );
}
