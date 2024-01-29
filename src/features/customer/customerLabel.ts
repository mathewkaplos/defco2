import { Customer } from '@prisma/client';
import { Dictionary } from 'src/translation/locales';


export function customerLabel(customer?: Partial<Customer> | null, dictionary?: Dictionary) {
  return String(customer?.firstName != null ? customer.firstName : '');
}
