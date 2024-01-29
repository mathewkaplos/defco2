import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import CustomerNew from 'src/features/customer/components/CustomerNew';
import { customerPermissions } from 'src/features/customer/customerPermissions';
import { hasPermission } from 'src/features/security';
import Breadcrumb from 'src/shared/components/Breadcrumb';
import { appContextForReact } from 'src/shared/controller/appContext';
import { getDictionary } from 'src/translation/getDictionary';
import { getLocaleFromCookies } from 'src/translation/getLocaleFromCookies';

export async function generateMetadata() {
  const locale = getLocaleFromCookies(cookies());
  const dictionary = await getDictionary(locale);

  return {
    title: dictionary.customer.new.title,
  };
}

export default async function CustomerNewPage() {
  const context = await appContextForReact(cookies());
  const dictionary = context.dictionary;

  if (!hasPermission(customerPermissions.customerCreate, context)) {
    return redirect('/');
  }

  return (
    <div className="flex flex-1 flex-col">
      <Breadcrumb
        items={[
          [dictionary.customer.list.menu, '/customer'],
          [dictionary.customer.new.menu],
        ]}
      />
      <div className="my-10">
        <CustomerNew context={context} />
      </div>
    </div>
  );
}
