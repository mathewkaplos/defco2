import { Vehicle } from '@prisma/client';
import { Dictionary } from 'src/translation/locales';


export function vehicleLabel(vehicle?: Partial<Vehicle> | null, dictionary?: Dictionary) {
  return String(vehicle?.regNo != null ? vehicle.regNo : '');
}
