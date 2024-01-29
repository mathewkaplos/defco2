import { Device } from '@prisma/client';
import { Dictionary } from 'src/translation/locales';


export function deviceLabel(device?: Partial<Device> | null, dictionary?: Dictionary) {
  return String(device?.deviceId != null ? device.deviceId : '');
}
