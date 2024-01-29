import { VoucherWithRelationships } from 'src/features/voucher/voucherSchemas';
import { membershipLabel } from 'src/features/membership/membershipLabel';
import { AppContext } from 'src/shared/controller/appContext';
import { enumeratorLabel } from 'src/shared/lib/enumeratorLabel';
import { formatDecimal } from 'src/shared/lib/formatDecimal';
import { Locale } from 'src/translation/locales';

export function voucherExporterMapper(
  vouchers: VoucherWithRelationships[],
  context: AppContext,
): Record<string, string | null | undefined>[] {
  return vouchers.map((voucher) => {
    return {
      id: voucher.id,
      date1: voucher.date1 ? String(voucher.date1).split('T')[0]: undefined,
      voucherNo: voucher.voucherNo,
      indentNo: voucher.indentNo,
      approvedBy: voucher.approvedBy,
      qty: formatDecimal(voucher.qty?.toString(), context.locale, 2),
      amount: formatDecimal(voucher.amount?.toString(), context.locale, 2),
      createdByMembership: membershipLabel(voucher.createdByMembership, context.dictionary),
      createdAt: String(voucher.createdAt),
      updatedByMembership: membershipLabel(voucher.createdByMembership, context.dictionary),
      updatedAt: String(voucher.updatedAt),
    };
  });
}
