import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { RankView } from 'src/features/rank/components/RankView';
import { rankPermissions } from 'src/features/rank/rankPermissions';
import { hasPermission } from 'src/features/security';
import { appContextForReact } from 'src/shared/controller/appContext';
import { getDictionary } from 'src/translation/getDictionary';
import { getLocaleFromCookies } from 'src/translation/getLocaleFromCookies';

export async function generateMetadata() {
  const locale = getLocaleFromCookies(cookies());
  const dictionary = await getDictionary(locale);

  return {
    title: dictionary.rank.view.title,
  };
}

export default async function RankViewPage({
  params,
}: {
  params: { id: string };
}) {
  const context = await appContextForReact(cookies());

  if (!hasPermission(rankPermissions.rankRead, context)) {
    redirect('/');
  }

  return <RankView id={params.id} context={context} />;
}
