import { MaterialReceiptWithRelationships } from 'src/features/materialReceipt/materialReceiptSchemas';
import { membershipLabel } from 'src/features/membership/membershipLabel';
import { AppContext } from 'src/shared/controller/appContext';
import { enumeratorLabel } from 'src/shared/lib/enumeratorLabel';
import { formatDecimal } from 'src/shared/lib/formatDecimal';
import { Locale } from 'src/translation/locales';

export function materialReceiptExporterMapper(
  materialReceipts: MaterialReceiptWithRelationships[],
  context: AppContext,
): Record<string, string | null | undefined>[] {
  return materialReceipts.map((materialReceipt) => {
    return {
      id: materialReceipt.id,
      date1: materialReceipt.date1 ? String(materialReceipt.date1).split('T')[0]: undefined,
      supplier: materialReceipt.supplier,
      quantity: materialReceipt.quantity?.toString(),
      price: formatDecimal(materialReceipt.price?.toString(), context.locale, 2),
      total: formatDecimal(materialReceipt.total?.toString(), context.locale, 2),
      createdByMembership: membershipLabel(materialReceipt.createdByMembership, context.dictionary),
      createdAt: String(materialReceipt.createdAt),
      updatedByMembership: membershipLabel(materialReceipt.createdByMembership, context.dictionary),
      updatedAt: String(materialReceipt.updatedAt),
    };
  });
}
