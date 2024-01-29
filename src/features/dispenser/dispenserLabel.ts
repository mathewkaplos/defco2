import { Dispenser } from '@prisma/client';
import { Dictionary } from 'src/translation/locales';


export function dispenserLabel(dispenser?: Partial<Dispenser> | null, dictionary?: Dictionary) {
  return String(dispenser?.name != null ? dispenser.name : '');
}
