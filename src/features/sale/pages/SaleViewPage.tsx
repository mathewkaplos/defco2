import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { SaleView } from 'src/features/sale/components/SaleView';
import { salePermissions } from 'src/features/sale/salePermissions';
import { hasPermission } from 'src/features/security';
import { appContextForReact } from 'src/shared/controller/appContext';
import { getDictionary } from 'src/translation/getDictionary';
import { getLocaleFromCookies } from 'src/translation/getLocaleFromCookies';

export async function generateMetadata() {
  const locale = getLocaleFromCookies(cookies());
  const dictionary = await getDictionary(locale);

  return {
    title: dictionary.sale.view.title,
  };
}

export default async function SaleViewPage({
  params,
}: {
  params: { id: string };
}) {
  const context = await appContextForReact(cookies());

  if (!hasPermission(salePermissions.saleRead, context)) {
    redirect('/');
  }

  return <SaleView id={params.id} context={context} />;
}
