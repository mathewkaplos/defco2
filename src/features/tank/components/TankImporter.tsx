'use client';

import { tankImportApiCall } from 'src/features/tank/tankApiCalls';
import {
  tankImportFileSchema,
  tankImportInputSchema,
} from 'src/features/tank/tankSchemas';
import { Importer } from 'src/shared/components/importer/Importer';
import { AppContext } from 'src/shared/controller/appContext';

export function TankImporter({ context }: { context: AppContext }) {
  return (
    <Importer
      keys={[
        'name',
        'capacity',
        'station',
      ]}
      labels={context.dictionary.tank.fields}
      context={context}
      validationSchema={tankImportInputSchema}
      fileSchema={tankImportFileSchema}
      importerFn={tankImportApiCall}
      breadcrumbRoot={[context.dictionary.tank.list.menu, '/tank']}
      queryKeyToInvalidate={['tank']}
    />
  );
}
