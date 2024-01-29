'use client';

import { saleImportApiCall } from 'src/features/sale/saleApiCalls';
import {
  saleImportFileSchema,
  saleImportInputSchema,
} from 'src/features/sale/saleSchemas';
import { Importer } from 'src/shared/components/importer/Importer';
import { AppContext } from 'src/shared/controller/appContext';

export function SaleImporter({ context }: { context: AppContext }) {
  return (
    <Importer
      keys={[
        'date1',
        'fuelType',
        'litres',
        'rate',
        'total',
        'paymode',
        'cashAmount',
        'mpesaAmount',
        'invoiceAmount',
        'customer',
        'station',
      ]}
      labels={context.dictionary.sale.fields}
      context={context}
      validationSchema={saleImportInputSchema}
      fileSchema={saleImportFileSchema}
      importerFn={saleImportApiCall}
      breadcrumbRoot={[context.dictionary.sale.list.menu, '/sale']}
      queryKeyToInvalidate={['sale']}
    />
  );
}
