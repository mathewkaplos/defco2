import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import CardNew from 'src/features/card/components/CardNew';
import { cardPermissions } from 'src/features/card/cardPermissions';
import { hasPermission } from 'src/features/security';
import Breadcrumb from 'src/shared/components/Breadcrumb';
import { appContextForReact } from 'src/shared/controller/appContext';
import { getDictionary } from 'src/translation/getDictionary';
import { getLocaleFromCookies } from 'src/translation/getLocaleFromCookies';

export async function generateMetadata() {
  const locale = getLocaleFromCookies(cookies());
  const dictionary = await getDictionary(locale);

  return {
    title: dictionary.card.new.title,
  };
}

export default async function CardNewPage() {
  const context = await appContextForReact(cookies());
  const dictionary = context.dictionary;

  if (!hasPermission(cardPermissions.cardCreate, context)) {
    return redirect('/');
  }

  return (
    <div className="flex flex-1 flex-col">
      <Breadcrumb
        items={[
          [dictionary.card.list.menu, '/card'],
          [dictionary.card.new.menu],
        ]}
      />
      <div className="my-10">
        <CardNew context={context} />
      </div>
    </div>
  );
}
