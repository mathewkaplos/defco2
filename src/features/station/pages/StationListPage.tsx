import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import StationList from 'src/features/station/components/StationList';
import { stationPermissions } from 'src/features/station/stationPermissions';
import { hasPermission } from 'src/features/security';
import { appContextForReact } from 'src/shared/controller/appContext';
import { getDictionary } from 'src/translation/getDictionary';
import { getLocaleFromCookies } from 'src/translation/getLocaleFromCookies';

export async function generateMetadata() {
  const locale = getLocaleFromCookies(cookies());
  const dictionary = await getDictionary(locale);

  return {
    title: dictionary.station.list.title,
  };
}

export default async function StationListPage() {
  const context = await appContextForReact(cookies());

  if (!hasPermission(stationPermissions.stationRead, context)) {
    return redirect('/');
  }

  return <StationList context={context} />;
}
