'use client';

import { dispenserImportApiCall } from 'src/features/dispenser/dispenserApiCalls';
import {
  dispenserImportFileSchema,
  dispenserImportInputSchema,
} from 'src/features/dispenser/dispenserSchemas';
import { Importer } from 'src/shared/components/importer/Importer';
import { AppContext } from 'src/shared/controller/appContext';

export function DispenserImporter({ context }: { context: AppContext }) {
  return (
    <Importer
      keys={[
        'name',
        'model',
        'fuelType',
        'station',
      ]}
      labels={context.dictionary.dispenser.fields}
      context={context}
      validationSchema={dispenserImportInputSchema}
      fileSchema={dispenserImportFileSchema}
      importerFn={dispenserImportApiCall}
      breadcrumbRoot={[context.dictionary.dispenser.list.menu, '/dispenser']}
      queryKeyToInvalidate={['dispenser']}
    />
  );
}
