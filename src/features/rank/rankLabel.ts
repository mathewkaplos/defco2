import { Rank } from '@prisma/client';
import { Dictionary } from 'src/translation/locales';


export function rankLabel(rank?: Partial<Rank> | null, dictionary?: Dictionary) {
  return String(rank?.name != null ? rank.name : '');
}
