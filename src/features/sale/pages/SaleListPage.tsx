import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import SaleList from 'src/features/sale/components/SaleList';
import { salePermissions } from 'src/features/sale/salePermissions';
import { hasPermission } from 'src/features/security';
import { appContextForReact } from 'src/shared/controller/appContext';
import { getDictionary } from 'src/translation/getDictionary';
import { getLocaleFromCookies } from 'src/translation/getLocaleFromCookies';

export async function generateMetadata() {
  const locale = getLocaleFromCookies(cookies());
  const dictionary = await getDictionary(locale);

  return {
    title: dictionary.sale.list.title,
  };
}

export default async function SaleListPage() {
  const context = await appContextForReact(cookies());

  if (!hasPermission(salePermissions.saleRead, context)) {
    return redirect('/');
  }

  return <SaleList context={context} />;
}
