import { VehicleWithRelationships } from 'src/features/vehicle/vehicleSchemas';
import { membershipLabel } from 'src/features/membership/membershipLabel';
import { AppContext } from 'src/shared/controller/appContext';
import { enumeratorLabel } from 'src/shared/lib/enumeratorLabel';
import { formatDecimal } from 'src/shared/lib/formatDecimal';
import { Locale } from 'src/translation/locales';

export function vehicleExporterMapper(
  vehicles: VehicleWithRelationships[],
  context: AppContext,
): Record<string, string | null | undefined>[] {
  return vehicles.map((vehicle) => {
    return {
      id: vehicle.id,
      make: vehicle.make,
      regNo: vehicle.regNo,
      cc: vehicle.cc?.toString(),
      fullTank: vehicle.fullTank?.toString(),
      approved: vehicle.approved
        ? context.dictionary.shared.yes
        : context.dictionary.shared.no,
      createdByMembership: membershipLabel(vehicle.createdByMembership, context.dictionary),
      createdAt: String(vehicle.createdAt),
      updatedByMembership: membershipLabel(vehicle.createdByMembership, context.dictionary),
      updatedAt: String(vehicle.updatedAt),
    };
  });
}
