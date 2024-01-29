import { Sale } from '@prisma/client';
import { Dictionary } from 'src/translation/locales';


export function saleLabel(sale?: Partial<Sale> | null, dictionary?: Dictionary) {
  return String(sale?.id != null ? sale.id : '');
}
