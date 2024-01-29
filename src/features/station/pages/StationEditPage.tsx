import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import StationEdit from 'src/features/station/components/StationEdit';
import { permissions } from 'src/features/permissions';
import { hasPermission } from 'src/features/security';
import { appContextForReact } from 'src/shared/controller/appContext';
import { getDictionary } from 'src/translation/getDictionary';
import { getLocaleFromCookies } from 'src/translation/getLocaleFromCookies';

export async function generateMetadata() {
  const locale = getLocaleFromCookies(cookies());
  const dictionary = await getDictionary(locale);

  return {
    title: dictionary.station.edit.title,
  };
}

export default async function StationEditPage({
  params,
}: {
  params: { id: string };
}) {
  const context = await appContextForReact(cookies());

  if (!hasPermission(permissions.stationUpdate, context)) {
    return redirect('/');
  }

  return <StationEdit context={context} id={params.id} />;
}
