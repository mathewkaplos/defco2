import { StationWithRelationships } from 'src/features/station/stationSchemas';
import { membershipLabel } from 'src/features/membership/membershipLabel';
import { AppContext } from 'src/shared/controller/appContext';
import { enumeratorLabel } from 'src/shared/lib/enumeratorLabel';
import { formatDecimal } from 'src/shared/lib/formatDecimal';
import { Locale } from 'src/translation/locales';

export function stationExporterMapper(
  stations: StationWithRelationships[],
  context: AppContext,
): Record<string, string | null | undefined>[] {
  return stations.map((station) => {
    return {
      id: station.id,
      name: station.name,
      description: station.description,
      location: station.location,
      createdByMembership: membershipLabel(station.createdByMembership, context.dictionary),
      createdAt: String(station.createdAt),
      updatedByMembership: membershipLabel(station.createdByMembership, context.dictionary),
      updatedAt: String(station.updatedAt),
    };
  });
}
