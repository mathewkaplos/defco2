import { CardWithRelationships } from 'src/features/card/cardSchemas';
import { membershipLabel } from 'src/features/membership/membershipLabel';
import { AppContext } from 'src/shared/controller/appContext';
import { enumeratorLabel } from 'src/shared/lib/enumeratorLabel';
import { formatDecimal } from 'src/shared/lib/formatDecimal';
import { Locale } from 'src/translation/locales';

export function cardExporterMapper(
  cards: CardWithRelationships[],
  context: AppContext,
): Record<string, string | null | undefined>[] {
  return cards.map((card) => {
    return {
      id: card.id,
      cardNo: card.cardNo,
      isActive: card.isActive
        ? context.dictionary.shared.yes
        : context.dictionary.shared.no,
      issueDate: card.issueDate ? String(card.issueDate).split('T')[0]: undefined,
      deactivationDate: card.deactivationDate ? String(card.deactivationDate).split('T')[0]: undefined,
      createdByMembership: membershipLabel(card.createdByMembership, context.dictionary),
      createdAt: String(card.createdAt),
      updatedByMembership: membershipLabel(card.createdByMembership, context.dictionary),
      updatedAt: String(card.updatedAt),
    };
  });
}
