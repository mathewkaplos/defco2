import { ProductWithRelationships } from 'src/features/product/productSchemas';
import { membershipLabel } from 'src/features/membership/membershipLabel';
import { AppContext } from 'src/shared/controller/appContext';
import { enumeratorLabel } from 'src/shared/lib/enumeratorLabel';
import { formatDecimal } from 'src/shared/lib/formatDecimal';
import { Locale } from 'src/translation/locales';

export function productExporterMapper(
  products: ProductWithRelationships[],
  context: AppContext,
): Record<string, string | null | undefined>[] {
  return products.map((product) => {
    return {
      id: product.id,
      name: product.name,
      price: formatDecimal(product.price?.toString(), context.locale),
      createdByMembership: membershipLabel(product.createdByMembership, context.dictionary),
      createdAt: String(product.createdAt),
      updatedByMembership: membershipLabel(product.createdByMembership, context.dictionary),
      updatedAt: String(product.updatedAt),
    };
  });
}
