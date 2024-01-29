import { Card } from '@prisma/client';
import { Dictionary } from 'src/translation/locales';


export function cardLabel(card?: Partial<Card> | null, dictionary?: Dictionary) {
  return String(card?.cardNo != null ? card.cardNo : '');
}
