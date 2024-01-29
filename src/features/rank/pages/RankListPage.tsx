import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import RankList from 'src/features/rank/components/RankList';
import { rankPermissions } from 'src/features/rank/rankPermissions';
import { hasPermission } from 'src/features/security';
import { appContextForReact } from 'src/shared/controller/appContext';
import { getDictionary } from 'src/translation/getDictionary';
import { getLocaleFromCookies } from 'src/translation/getLocaleFromCookies';

export async function generateMetadata() {
  const locale = getLocaleFromCookies(cookies());
  const dictionary = await getDictionary(locale);

  return {
    title: dictionary.rank.list.title,
  };
}

export default async function RankListPage() {
  const context = await appContextForReact(cookies());

  if (!hasPermission(rankPermissions.rankRead, context)) {
    return redirect('/');
  }

  return <RankList context={context} />;
}
