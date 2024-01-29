import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import MaterialReceiptNew from 'src/features/materialReceipt/components/MaterialReceiptNew';
import { materialReceiptPermissions } from 'src/features/materialReceipt/materialReceiptPermissions';
import { hasPermission } from 'src/features/security';
import Breadcrumb from 'src/shared/components/Breadcrumb';
import { appContextForReact } from 'src/shared/controller/appContext';
import { getDictionary } from 'src/translation/getDictionary';
import { getLocaleFromCookies } from 'src/translation/getLocaleFromCookies';

export async function generateMetadata() {
  const locale = getLocaleFromCookies(cookies());
  const dictionary = await getDictionary(locale);

  return {
    title: dictionary.materialReceipt.new.title,
  };
}

export default async function MaterialReceiptNewPage() {
  const context = await appContextForReact(cookies());
  const dictionary = context.dictionary;

  if (!hasPermission(materialReceiptPermissions.materialReceiptCreate, context)) {
    return redirect('/');
  }

  return (
    <div className="flex flex-1 flex-col">
      <Breadcrumb
        items={[
          [dictionary.materialReceipt.list.menu, '/material-receipt'],
          [dictionary.materialReceipt.new.menu],
        ]}
      />
      <div className="my-10">
        <MaterialReceiptNew context={context} />
      </div>
    </div>
  );
}
