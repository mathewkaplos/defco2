import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { TankView } from 'src/features/tank/components/TankView';
import { tankPermissions } from 'src/features/tank/tankPermissions';
import { hasPermission } from 'src/features/security';
import { appContextForReact } from 'src/shared/controller/appContext';
import { getDictionary } from 'src/translation/getDictionary';
import { getLocaleFromCookies } from 'src/translation/getLocaleFromCookies';

export async function generateMetadata() {
  const locale = getLocaleFromCookies(cookies());
  const dictionary = await getDictionary(locale);

  return {
    title: dictionary.tank.view.title,
  };
}

export default async function TankViewPage({
  params,
}: {
  params: { id: string };
}) {
  const context = await appContextForReact(cookies());

  if (!hasPermission(tankPermissions.tankRead, context)) {
    redirect('/');
  }

  return <TankView id={params.id} context={context} />;
}
