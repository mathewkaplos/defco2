import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import DeviceNew from 'src/features/device/components/DeviceNew';
import { devicePermissions } from 'src/features/device/devicePermissions';
import { hasPermission } from 'src/features/security';
import Breadcrumb from 'src/shared/components/Breadcrumb';
import { appContextForReact } from 'src/shared/controller/appContext';
import { getDictionary } from 'src/translation/getDictionary';
import { getLocaleFromCookies } from 'src/translation/getLocaleFromCookies';

export async function generateMetadata() {
  const locale = getLocaleFromCookies(cookies());
  const dictionary = await getDictionary(locale);

  return {
    title: dictionary.device.new.title,
  };
}

export default async function DeviceNewPage() {
  const context = await appContextForReact(cookies());
  const dictionary = context.dictionary;

  if (!hasPermission(devicePermissions.deviceCreate, context)) {
    return redirect('/');
  }

  return (
    <div className="flex flex-1 flex-col">
      <Breadcrumb
        items={[
          [dictionary.device.list.menu, '/device'],
          [dictionary.device.new.menu],
        ]}
      />
      <div className="my-10">
        <DeviceNew context={context} />
      </div>
    </div>
  );
}
