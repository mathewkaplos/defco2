import { RankWithRelationships } from 'src/features/rank/rankSchemas';
import { membershipLabel } from 'src/features/membership/membershipLabel';
import { AppContext } from 'src/shared/controller/appContext';
import { enumeratorLabel } from 'src/shared/lib/enumeratorLabel';
import { formatDecimal } from 'src/shared/lib/formatDecimal';
import { Locale } from 'src/translation/locales';

export function rankExporterMapper(
  ranks: RankWithRelationships[],
  context: AppContext,
): Record<string, string | null | undefined>[] {
  return ranks.map((rank) => {
    return {
      id: rank.id,
      name: rank.name,
      description: rank.description,
      createdByMembership: membershipLabel(rank.createdByMembership, context.dictionary),
      createdAt: String(rank.createdAt),
      updatedByMembership: membershipLabel(rank.createdByMembership, context.dictionary),
      updatedAt: String(rank.updatedAt),
    };
  });
}
