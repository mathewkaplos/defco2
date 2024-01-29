import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import CardList from 'src/features/card/components/CardList';
import { cardPermissions } from 'src/features/card/cardPermissions';
import { hasPermission } from 'src/features/security';
import { appContextForReact } from 'src/shared/controller/appContext';
import { getDictionary } from 'src/translation/getDictionary';
import { getLocaleFromCookies } from 'src/translation/getLocaleFromCookies';

export async function generateMetadata() {
  const locale = getLocaleFromCookies(cookies());
  const dictionary = await getDictionary(locale);

  return {
    title: dictionary.card.list.title,
  };
}

export default async function CardListPage() {
  const context = await appContextForReact(cookies());

  if (!hasPermission(cardPermissions.cardRead, context)) {
    return redirect('/');
  }

  return <CardList context={context} />;
}
