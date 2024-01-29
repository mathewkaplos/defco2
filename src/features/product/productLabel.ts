import { Product } from '@prisma/client';
import { Dictionary } from 'src/translation/locales';


export function productLabel(product?: Partial<Product> | null, dictionary?: Dictionary) {
  return String(product?.name != null ? product.name : '');
}
