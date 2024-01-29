import { Station } from '@prisma/client';
import { Dictionary } from 'src/translation/locales';


export function stationLabel(station?: Partial<Station> | null, dictionary?: Dictionary) {
  return String(station?.name != null ? station.name : '');
}
