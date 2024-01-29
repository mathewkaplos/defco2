import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import MaterialReceiptEdit from 'src/features/materialReceipt/components/MaterialReceiptEdit';
import { permissions } from 'src/features/permissions';
import { hasPermission } from 'src/features/security';
import { appContextForReact } from 'src/shared/controller/appContext';
import { getDictionary } from 'src/translation/getDictionary';
import { getLocaleFromCookies } from 'src/translation/getLocaleFromCookies';

export async function generateMetadata() {
  const locale = getLocaleFromCookies(cookies());
  const dictionary = await getDictionary(locale);

  return {
    title: dictionary.materialReceipt.edit.title,
  };
}

export default async function MaterialReceiptEditPage({
  params,
}: {
  params: { id: string };
}) {
  const context = await appContextForReact(cookies());

  if (!hasPermission(permissions.materialReceiptUpdate, context)) {
    return redirect('/');
  }

  return <MaterialReceiptEdit context={context} id={params.id} />;
}
