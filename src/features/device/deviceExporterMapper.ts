import { DeviceWithRelationships } from 'src/features/device/deviceSchemas';
import { membershipLabel } from 'src/features/membership/membershipLabel';
import { AppContext } from 'src/shared/controller/appContext';
import { enumeratorLabel } from 'src/shared/lib/enumeratorLabel';
import { formatDecimal } from 'src/shared/lib/formatDecimal';
import { Locale } from 'src/translation/locales';

export function deviceExporterMapper(
  devices: DeviceWithRelationships[],
  context: AppContext,
): Record<string, string | null | undefined>[] {
  return devices.map((device) => {
    return {
      id: device.id,
      deviceId: device.deviceId,
      description: device.description,
      createdByMembership: membershipLabel(device.createdByMembership, context.dictionary),
      createdAt: String(device.createdAt),
      updatedByMembership: membershipLabel(device.createdByMembership, context.dictionary),
      updatedAt: String(device.updatedAt),
    };
  });
}
