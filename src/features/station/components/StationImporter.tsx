'use client';

import { stationImportApiCall } from 'src/features/station/stationApiCalls';
import {
  stationImportFileSchema,
  stationImportInputSchema,
} from 'src/features/station/stationSchemas';
import { Importer } from 'src/shared/components/importer/Importer';
import { AppContext } from 'src/shared/controller/appContext';

export function StationImporter({ context }: { context: AppContext }) {
  return (
    <Importer
      keys={[
        'name',
        'description',
        'location',
        'supervisor',
      ]}
      labels={context.dictionary.station.fields}
      context={context}
      validationSchema={stationImportInputSchema}
      fileSchema={stationImportFileSchema}
      importerFn={stationImportApiCall}
      breadcrumbRoot={[context.dictionary.station.list.menu, '/station']}
      queryKeyToInvalidate={['station']}
    />
  );
}
