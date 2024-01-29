import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import DispenserEdit from 'src/features/dispenser/components/DispenserEdit';
import { permissions } from 'src/features/permissions';
import { hasPermission } from 'src/features/security';
import { appContextForReact } from 'src/shared/controller/appContext';
import { getDictionary } from 'src/translation/getDictionary';
import { getLocaleFromCookies } from 'src/translation/getLocaleFromCookies';

export async function generateMetadata() {
  const locale = getLocaleFromCookies(cookies());
  const dictionary = await getDictionary(locale);

  return {
    title: dictionary.dispenser.edit.title,
  };
}

export default async function DispenserEditPage({
  params,
}: {
  params: { id: string };
}) {
  const context = await appContextForReact(cookies());

  if (!hasPermission(permissions.dispenserUpdate, context)) {
    return redirect('/');
  }

  return <DispenserEdit context={context} id={params.id} />;
}
