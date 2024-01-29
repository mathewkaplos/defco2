import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import SaleEdit from 'src/features/sale/components/SaleEdit';
import { permissions } from 'src/features/permissions';
import { hasPermission } from 'src/features/security';
import { appContextForReact } from 'src/shared/controller/appContext';
import { getDictionary } from 'src/translation/getDictionary';
import { getLocaleFromCookies } from 'src/translation/getLocaleFromCookies';

export async function generateMetadata() {
  const locale = getLocaleFromCookies(cookies());
  const dictionary = await getDictionary(locale);

  return {
    title: dictionary.sale.edit.title,
  };
}

export default async function SaleEditPage({
  params,
}: {
  params: { id: string };
}) {
  const context = await appContextForReact(cookies());

  if (!hasPermission(permissions.saleUpdate, context)) {
    return redirect('/');
  }

  return <SaleEdit context={context} id={params.id} />;
}
