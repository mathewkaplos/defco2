import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { CardView } from 'src/features/card/components/CardView';
import { cardPermissions } from 'src/features/card/cardPermissions';
import { hasPermission } from 'src/features/security';
import { appContextForReact } from 'src/shared/controller/appContext';
import { getDictionary } from 'src/translation/getDictionary';
import { getLocaleFromCookies } from 'src/translation/getLocaleFromCookies';

export async function generateMetadata() {
  const locale = getLocaleFromCookies(cookies());
  const dictionary = await getDictionary(locale);

  return {
    title: dictionary.card.view.title,
  };
}

export default async function CardViewPage({
  params,
}: {
  params: { id: string };
}) {
  const context = await appContextForReact(cookies());

  if (!hasPermission(cardPermissions.cardRead, context)) {
    redirect('/');
  }

  return <CardView id={params.id} context={context} />;
}
