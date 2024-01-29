import { Voucher } from '@prisma/client';
import { Dictionary } from 'src/translation/locales';


export function voucherLabel(voucher?: Partial<Voucher> | null, dictionary?: Dictionary) {
  return String(voucher?.voucherNo != null ? voucher.voucherNo : '');
}
