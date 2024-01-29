import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import TankEdit from 'src/features/tank/components/TankEdit';
import { permissions } from 'src/features/permissions';
import { hasPermission } from 'src/features/security';
import { appContextForReact } from 'src/shared/controller/appContext';
import { getDictionary } from 'src/translation/getDictionary';
import { getLocaleFromCookies } from 'src/translation/getLocaleFromCookies';

export async function generateMetadata() {
  const locale = getLocaleFromCookies(cookies());
  const dictionary = await getDictionary(locale);

  return {
    title: dictionary.tank.edit.title,
  };
}

export default async function TankEditPage({
  params,
}: {
  params: { id: string };
}) {
  const context = await appContextForReact(cookies());

  if (!hasPermission(permissions.tankUpdate, context)) {
    return redirect('/');
  }

  return <TankEdit context={context} id={params.id} />;
}
