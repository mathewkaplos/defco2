import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import DeviceEdit from 'src/features/device/components/DeviceEdit';
import { permissions } from 'src/features/permissions';
import { hasPermission } from 'src/features/security';
import { appContextForReact } from 'src/shared/controller/appContext';
import { getDictionary } from 'src/translation/getDictionary';
import { getLocaleFromCookies } from 'src/translation/getLocaleFromCookies';

export async function generateMetadata() {
  const locale = getLocaleFromCookies(cookies());
  const dictionary = await getDictionary(locale);

  return {
    title: dictionary.device.edit.title,
  };
}

export default async function DeviceEditPage({
  params,
}: {
  params: { id: string };
}) {
  const context = await appContextForReact(cookies());

  if (!hasPermission(permissions.deviceUpdate, context)) {
    return redirect('/');
  }

  return <DeviceEdit context={context} id={params.id} />;
}
