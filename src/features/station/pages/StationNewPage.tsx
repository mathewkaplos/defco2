import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import StationNew from 'src/features/station/components/StationNew';
import { stationPermissions } from 'src/features/station/stationPermissions';
import { hasPermission } from 'src/features/security';
import Breadcrumb from 'src/shared/components/Breadcrumb';
import { appContextForReact } from 'src/shared/controller/appContext';
import { getDictionary } from 'src/translation/getDictionary';
import { getLocaleFromCookies } from 'src/translation/getLocaleFromCookies';

export async function generateMetadata() {
  const locale = getLocaleFromCookies(cookies());
  const dictionary = await getDictionary(locale);

  return {
    title: dictionary.station.new.title,
  };
}

export default async function StationNewPage() {
  const context = await appContextForReact(cookies());
  const dictionary = context.dictionary;

  if (!hasPermission(stationPermissions.stationCreate, context)) {
    return redirect('/');
  }

  return (
    <div className="flex flex-1 flex-col">
      <Breadcrumb
        items={[
          [dictionary.station.list.menu, '/station'],
          [dictionary.station.new.menu],
        ]}
      />
      <div className="my-10">
        <StationNew context={context} />
      </div>
    </div>
  );
}
