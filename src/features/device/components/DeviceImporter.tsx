'use client';

import { deviceImportApiCall } from 'src/features/device/deviceApiCalls';
import {
  deviceImportFileSchema,
  deviceImportInputSchema,
} from 'src/features/device/deviceSchemas';
import { Importer } from 'src/shared/components/importer/Importer';
import { AppContext } from 'src/shared/controller/appContext';

export function DeviceImporter({ context }: { context: AppContext }) {
  return (
    <Importer
      keys={[
        'deviceId',
        'description',
        'station',
      ]}
      labels={context.dictionary.device.fields}
      context={context}
      validationSchema={deviceImportInputSchema}
      fileSchema={deviceImportFileSchema}
      importerFn={deviceImportApiCall}
      breadcrumbRoot={[context.dictionary.device.list.menu, '/device']}
      queryKeyToInvalidate={['device']}
    />
  );
}
