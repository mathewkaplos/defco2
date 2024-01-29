import { Tank } from '@prisma/client';
import { Dictionary } from 'src/translation/locales';


export function tankLabel(tank?: Partial<Tank> | null, dictionary?: Dictionary) {
  return String(tank?.name != null ? tank.name : '');
}
