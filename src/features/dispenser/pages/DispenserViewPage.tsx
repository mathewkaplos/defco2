import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { DispenserView } from 'src/features/dispenser/components/DispenserView';
import { dispenserPermissions } from 'src/features/dispenser/dispenserPermissions';
import { hasPermission } from 'src/features/security';
import { appContextForReact } from 'src/shared/controller/appContext';
import { getDictionary } from 'src/translation/getDictionary';
import { getLocaleFromCookies } from 'src/translation/getLocaleFromCookies';

export async function generateMetadata() {
  const locale = getLocaleFromCookies(cookies());
  const dictionary = await getDictionary(locale);

  return {
    title: dictionary.dispenser.view.title,
  };
}

export default async function DispenserViewPage({
  params,
}: {
  params: { id: string };
}) {
  const context = await appContextForReact(cookies());

  if (!hasPermission(dispenserPermissions.dispenserRead, context)) {
    redirect('/');
  }

  return <DispenserView id={params.id} context={context} />;
}
