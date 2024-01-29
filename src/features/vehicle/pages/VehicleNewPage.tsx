import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import VehicleNew from 'src/features/vehicle/components/VehicleNew';
import { vehiclePermissions } from 'src/features/vehicle/vehiclePermissions';
import { hasPermission } from 'src/features/security';
import Breadcrumb from 'src/shared/components/Breadcrumb';
import { appContextForReact } from 'src/shared/controller/appContext';
import { getDictionary } from 'src/translation/getDictionary';
import { getLocaleFromCookies } from 'src/translation/getLocaleFromCookies';

export async function generateMetadata() {
  const locale = getLocaleFromCookies(cookies());
  const dictionary = await getDictionary(locale);

  return {
    title: dictionary.vehicle.new.title,
  };
}

export default async function VehicleNewPage() {
  const context = await appContextForReact(cookies());
  const dictionary = context.dictionary;

  if (!hasPermission(vehiclePermissions.vehicleCreate, context)) {
    return redirect('/');
  }

  return (
    <div className="flex flex-1 flex-col">
      <Breadcrumb
        items={[
          [dictionary.vehicle.list.menu, '/vehicle'],
          [dictionary.vehicle.new.menu],
        ]}
      />
      <div className="my-10">
        <VehicleNew context={context} />
      </div>
    </div>
  );
}
