'use client';

import { vehicleImportApiCall } from 'src/features/vehicle/vehicleApiCalls';
import {
  vehicleImportFileSchema,
  vehicleImportInputSchema,
} from 'src/features/vehicle/vehicleSchemas';
import { Importer } from 'src/shared/components/importer/Importer';
import { AppContext } from 'src/shared/controller/appContext';

export function VehicleImporter({ context }: { context: AppContext }) {
  return (
    <Importer
      keys={[
        'make',
        'regNo',
        'cc',
        'fullTank',
        'approved',
        'customer',
        'approvedBy',
      ]}
      labels={context.dictionary.vehicle.fields}
      context={context}
      validationSchema={vehicleImportInputSchema}
      fileSchema={vehicleImportFileSchema}
      importerFn={vehicleImportApiCall}
      breadcrumbRoot={[context.dictionary.vehicle.list.menu, '/vehicle']}
      queryKeyToInvalidate={['vehicle']}
    />
  );
}
