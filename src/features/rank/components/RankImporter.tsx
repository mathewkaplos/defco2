'use client';

import { rankImportApiCall } from 'src/features/rank/rankApiCalls';
import {
  rankImportFileSchema,
  rankImportInputSchema,
} from 'src/features/rank/rankSchemas';
import { Importer } from 'src/shared/components/importer/Importer';
import { AppContext } from 'src/shared/controller/appContext';

export function RankImporter({ context }: { context: AppContext }) {
  return (
    <Importer
      keys={[
        'name',
        'description',
      ]}
      labels={context.dictionary.rank.fields}
      context={context}
      validationSchema={rankImportInputSchema}
      fileSchema={rankImportFileSchema}
      importerFn={rankImportApiCall}
      breadcrumbRoot={[context.dictionary.rank.list.menu, '/rank']}
      queryKeyToInvalidate={['rank']}
    />
  );
}
