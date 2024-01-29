'use client';

import { voucherImportApiCall } from 'src/features/voucher/voucherApiCalls';
import {
  voucherImportFileSchema,
  voucherImportInputSchema,
} from 'src/features/voucher/voucherSchemas';
import { Importer } from 'src/shared/components/importer/Importer';
import { AppContext } from 'src/shared/controller/appContext';

export function VoucherImporter({ context }: { context: AppContext }) {
  return (
    <Importer
      keys={[
        'date1',
        'voucherNo',
        'indentNo',
        'approvedBy',
        'qty',
        'amount',
        'customer',
        'vehicle',
      ]}
      labels={context.dictionary.voucher.fields}
      context={context}
      validationSchema={voucherImportInputSchema}
      fileSchema={voucherImportFileSchema}
      importerFn={voucherImportApiCall}
      breadcrumbRoot={[context.dictionary.voucher.list.menu, '/voucher']}
      queryKeyToInvalidate={['voucher']}
    />
  );
}
