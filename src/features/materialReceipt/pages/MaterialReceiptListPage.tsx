import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import MaterialReceiptList from 'src/features/materialReceipt/components/MaterialReceiptList';
import { materialReceiptPermissions } from 'src/features/materialReceipt/materialReceiptPermissions';
import { hasPermission } from 'src/features/security';
import { appContextForReact } from 'src/shared/controller/appContext';
import { getDictionary } from 'src/translation/getDictionary';
import { getLocaleFromCookies } from 'src/translation/getLocaleFromCookies';

export async function generateMetadata() {
  const locale = getLocaleFromCookies(cookies());
  const dictionary = await getDictionary(locale);

  return {
    title: dictionary.materialReceipt.list.title,
  };
}

export default async function MaterialReceiptListPage() {
  const context = await appContextForReact(cookies());

  if (!hasPermission(materialReceiptPermissions.materialReceiptRead, context)) {
    return redirect('/');
  }

  return <MaterialReceiptList context={context} />;
}
