import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import RankEdit from 'src/features/rank/components/RankEdit';
import { permissions } from 'src/features/permissions';
import { hasPermission } from 'src/features/security';
import { appContextForReact } from 'src/shared/controller/appContext';
import { getDictionary } from 'src/translation/getDictionary';
import { getLocaleFromCookies } from 'src/translation/getLocaleFromCookies';

export async function generateMetadata() {
  const locale = getLocaleFromCookies(cookies());
  const dictionary = await getDictionary(locale);

  return {
    title: dictionary.rank.edit.title,
  };
}

export default async function RankEditPage({
  params,
}: {
  params: { id: string };
}) {
  const context = await appContextForReact(cookies());

  if (!hasPermission(permissions.rankUpdate, context)) {
    return redirect('/');
  }

  return <RankEdit context={context} id={params.id} />;
}
