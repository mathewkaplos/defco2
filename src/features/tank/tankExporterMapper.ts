import { TankWithRelationships } from 'src/features/tank/tankSchemas';
import { membershipLabel } from 'src/features/membership/membershipLabel';
import { AppContext } from 'src/shared/controller/appContext';
import { enumeratorLabel } from 'src/shared/lib/enumeratorLabel';
import { formatDecimal } from 'src/shared/lib/formatDecimal';
import { Locale } from 'src/translation/locales';

export function tankExporterMapper(
  tanks: TankWithRelationships[],
  context: AppContext,
): Record<string, string | null | undefined>[] {
  return tanks.map((tank) => {
    return {
      id: tank.id,
      name: tank.name,
      capacity: tank.capacity?.toString(),
      createdByMembership: membershipLabel(tank.createdByMembership, context.dictionary),
      createdAt: String(tank.createdAt),
      updatedByMembership: membershipLabel(tank.createdByMembership, context.dictionary),
      updatedAt: String(tank.updatedAt),
    };
  });
}
