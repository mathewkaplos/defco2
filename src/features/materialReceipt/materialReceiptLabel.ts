import { MaterialReceipt } from '@prisma/client';
import { Dictionary } from 'src/translation/locales';


export function materialReceiptLabel(materialReceipt?: Partial<MaterialReceipt> | null, dictionary?: Dictionary) {
  return String(materialReceipt?.id != null ? materialReceipt.id : '');
}
