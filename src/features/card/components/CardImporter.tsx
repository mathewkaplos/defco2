'use client';

import { cardImportApiCall } from 'src/features/card/cardApiCalls';
import {
  cardImportFileSchema,
  cardImportInputSchema,
} from 'src/features/card/cardSchemas';
import { Importer } from 'src/shared/components/importer/Importer';
import { AppContext } from 'src/shared/controller/appContext';

export function CardImporter({ context }: { context: AppContext }) {
  return (
    <Importer
      keys={[
        'cardNo',
        'isActive',
        'issueDate',
        'deactivationDate',
        'customer',
      ]}
      labels={context.dictionary.card.fields}
      context={context}
      validationSchema={cardImportInputSchema}
      fileSchema={cardImportFileSchema}
      importerFn={cardImportApiCall}
      breadcrumbRoot={[context.dictionary.card.list.menu, '/card']}
      queryKeyToInvalidate={['card']}
    />
  );
}
