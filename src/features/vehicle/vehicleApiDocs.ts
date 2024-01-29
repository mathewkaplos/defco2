import { OpenAPIRegistry } from '@asteasolutions/zod-to-openapi';
import { vehicleAutocompleteApiDoc } from 'src/features/vehicle/controllers/vehicleAutocompleteController';
import { vehicleCreateApiDoc } from 'src/features/vehicle/controllers/vehicleCreateController';
import { vehicleDestroyManyApiDoc } from 'src/features/vehicle/controllers/vehicleDestroyManyController';
import { vehicleFindApiDoc } from 'src/features/vehicle/controllers/vehicleFindController';
import { vehicleFindManyApiDoc } from 'src/features/vehicle/controllers/vehicleFindManyController';
import { vehicleImportApiDoc } from 'src/features/vehicle/controllers/vehicleImporterController';
import { vehicleUpdateApiDoc } from 'src/features/vehicle/controllers/vehicleUpdateController';

export function vehicleApiDocs(registry: OpenAPIRegistry, security: any) {
  [
    vehicleAutocompleteApiDoc,
    vehicleCreateApiDoc,
    vehicleDestroyManyApiDoc,
    vehicleFindApiDoc,
    vehicleFindManyApiDoc,
    vehicleUpdateApiDoc,
    vehicleImportApiDoc,
  ].map((apiDoc) => {
    registry.registerPath({
      ...apiDoc,
      tags: ['Vehicle'],
      security,
    });
  });
}
