import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import CardEdit from 'src/features/card/components/CardEdit';
import { permissions } from 'src/features/permissions';
import { hasPermission } from 'src/features/security';
import { appContextForReact } from 'src/shared/controller/appContext';
import { getDictionary } from 'src/translation/getDictionary';
import { getLocaleFromCookies } from 'src/translation/getLocaleFromCookies';

export async function generateMetadata() {
  const locale = getLocaleFromCookies(cookies());
  const dictionary = await getDictionary(locale);

  return {
    title: dictionary.card.edit.title,
  };
}

export default async function CardEditPage({
  params,
}: {
  params: { id: string };
}) {
  const context = await appContextForReact(cookies());

  if (!hasPermission(permissions.cardUpdate, context)) {
    return redirect('/');
  }

  return <CardEdit context={context} id={params.id} />;
}
