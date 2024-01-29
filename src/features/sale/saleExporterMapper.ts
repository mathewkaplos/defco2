import { SaleWithRelationships } from 'src/features/sale/saleSchemas';
import { membershipLabel } from 'src/features/membership/membershipLabel';
import { AppContext } from 'src/shared/controller/appContext';
import { enumeratorLabel } from 'src/shared/lib/enumeratorLabel';
import { formatDecimal } from 'src/shared/lib/formatDecimal';
import { Locale } from 'src/translation/locales';

export function saleExporterMapper(
  sales: SaleWithRelationships[],
  context: AppContext,
): Record<string, string | null | undefined>[] {
  return sales.map((sale) => {
    return {
      id: sale.id,
      date1: sale.date1 ? String(sale.date1) : undefined,
      fuelType: enumeratorLabel(
        context.dictionary.sale.enumerators.fuelType,
        sale.fuelType,
      ),
      litres: formatDecimal(sale.litres?.toString(), context.locale),
      rate: formatDecimal(sale.rate?.toString(), context.locale),
      total: formatDecimal(sale.total?.toString(), context.locale),
      paymode: enumeratorLabel(
        context.dictionary.sale.enumerators.paymode,
        sale.paymode,
      ),
      cashAmount: formatDecimal(sale.cashAmount?.toString(), context.locale, 2),
      mpesaAmount: formatDecimal(sale.mpesaAmount?.toString(), context.locale, 2),
      invoiceAmount: formatDecimal(sale.invoiceAmount?.toString(), context.locale, 2),
      createdByMembership: membershipLabel(sale.createdByMembership, context.dictionary),
      createdAt: String(sale.createdAt),
      updatedByMembership: membershipLabel(sale.createdByMembership, context.dictionary),
      updatedAt: String(sale.updatedAt),
    };
  });
}
