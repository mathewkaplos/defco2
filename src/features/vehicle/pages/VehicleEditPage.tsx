import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import VehicleEdit from 'src/features/vehicle/components/VehicleEdit';
import { permissions } from 'src/features/permissions';
import { hasPermission } from 'src/features/security';
import { appContextForReact } from 'src/shared/controller/appContext';
import { getDictionary } from 'src/translation/getDictionary';
import { getLocaleFromCookies } from 'src/translation/getLocaleFromCookies';

export async function generateMetadata() {
  const locale = getLocaleFromCookies(cookies());
  const dictionary = await getDictionary(locale);

  return {
    title: dictionary.vehicle.edit.title,
  };
}

export default async function VehicleEditPage({
  params,
}: {
  params: { id: string };
}) {
  const context = await appContextForReact(cookies());

  if (!hasPermission(permissions.vehicleUpdate, context)) {
    return redirect('/');
  }

  return <VehicleEdit context={context} id={params.id} />;
}
