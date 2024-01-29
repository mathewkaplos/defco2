import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { MaterialReceiptView } from 'src/features/materialReceipt/components/MaterialReceiptView';
import { materialReceiptPermissions } from 'src/features/materialReceipt/materialReceiptPermissions';
import { hasPermission } from 'src/features/security';
import { appContextForReact } from 'src/shared/controller/appContext';
import { getDictionary } from 'src/translation/getDictionary';
import { getLocaleFromCookies } from 'src/translation/getLocaleFromCookies';

export async function generateMetadata() {
  const locale = getLocaleFromCookies(cookies());
  const dictionary = await getDictionary(locale);

  return {
    title: dictionary.materialReceipt.view.title,
  };
}

export default async function MaterialReceiptViewPage({
  params,
}: {
  params: { id: string };
}) {
  const context = await appContextForReact(cookies());

  if (!hasPermission(materialReceiptPermissions.materialReceiptRead, context)) {
    redirect('/');
  }

  return <MaterialReceiptView id={params.id} context={context} />;
}
