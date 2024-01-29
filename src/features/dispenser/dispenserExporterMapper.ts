import { DispenserWithRelationships } from 'src/features/dispenser/dispenserSchemas';
import { membershipLabel } from 'src/features/membership/membershipLabel';
import { AppContext } from 'src/shared/controller/appContext';
import { enumeratorLabel } from 'src/shared/lib/enumeratorLabel';
import { formatDecimal } from 'src/shared/lib/formatDecimal';
import { Locale } from 'src/translation/locales';

export function dispenserExporterMapper(
  dispensers: DispenserWithRelationships[],
  context: AppContext,
): Record<string, string | null | undefined>[] {
  return dispensers.map((dispenser) => {
    return {
      id: dispenser.id,
      name: dispenser.name,
      model: dispenser.model,
      fuelType: enumeratorLabel(
        context.dictionary.dispenser.enumerators.fuelType,
        dispenser.fuelType,
      ),
      createdByMembership: membershipLabel(dispenser.createdByMembership, context.dictionary),
      createdAt: String(dispenser.createdAt),
      updatedByMembership: membershipLabel(dispenser.createdByMembership, context.dictionary),
      updatedAt: String(dispenser.updatedAt),
    };
  });
}
