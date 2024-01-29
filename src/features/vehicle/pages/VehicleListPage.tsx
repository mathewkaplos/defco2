import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import VehicleList from 'src/features/vehicle/components/VehicleList';
import { vehiclePermissions } from 'src/features/vehicle/vehiclePermissions';
import { hasPermission } from 'src/features/security';
import { appContextForReact } from 'src/shared/controller/appContext';
import { getDictionary } from 'src/translation/getDictionary';
import { getLocaleFromCookies } from 'src/translation/getLocaleFromCookies';

export async function generateMetadata() {
  const locale = getLocaleFromCookies(cookies());
  const dictionary = await getDictionary(locale);

  return {
    title: dictionary.vehicle.list.title,
  };
}

export default async function VehicleListPage() {
  const context = await appContextForReact(cookies());

  if (!hasPermission(vehiclePermissions.vehicleRead, context)) {
    return redirect('/');
  }

  return <VehicleList context={context} />;
}
