import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import SaleNew from 'src/features/sale/components/SaleNew';
import { salePermissions } from 'src/features/sale/salePermissions';
import { hasPermission } from 'src/features/security';
import Breadcrumb from 'src/shared/components/Breadcrumb';
import { appContextForReact } from 'src/shared/controller/appContext';
import { getDictionary } from 'src/translation/getDictionary';
import { getLocaleFromCookies } from 'src/translation/getLocaleFromCookies';

export async function generateMetadata() {
  const locale = getLocaleFromCookies(cookies());
  const dictionary = await getDictionary(locale);

  return {
    title: dictionary.sale.new.title,
  };
}

export default async function SaleNewPage() {
  const context = await appContextForReact(cookies());
  const dictionary = context.dictionary;

  if (!hasPermission(salePermissions.saleCreate, context)) {
    return redirect('/');
  }

  return (
    <div className="flex flex-1 flex-col">
      <Breadcrumb
        items={[
          [dictionary.sale.list.menu, '/sale'],
          [dictionary.sale.new.menu],
        ]}
      />
      <div className="my-10">
        <SaleNew context={context} />
      </div>
    </div>
  );
}
