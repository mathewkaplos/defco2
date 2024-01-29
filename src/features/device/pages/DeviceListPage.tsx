import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import DeviceList from 'src/features/device/components/DeviceList';
import { devicePermissions } from 'src/features/device/devicePermissions';
import { hasPermission } from 'src/features/security';
import { appContextForReact } from 'src/shared/controller/appContext';
import { getDictionary } from 'src/translation/getDictionary';
import { getLocaleFromCookies } from 'src/translation/getLocaleFromCookies';

export async function generateMetadata() {
  const locale = getLocaleFromCookies(cookies());
  const dictionary = await getDictionary(locale);

  return {
    title: dictionary.device.list.title,
  };
}

export default async function DeviceListPage() {
  const context = await appContextForReact(cookies());

  if (!hasPermission(devicePermissions.deviceRead, context)) {
    return redirect('/');
  }

  return <DeviceList context={context} />;
}
