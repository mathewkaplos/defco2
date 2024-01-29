import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { CustomerView } from 'src/features/customer/components/CustomerView';
import { customerPermissions } from 'src/features/customer/customerPermissions';
import { hasPermission } from 'src/features/security';
import { appContextForReact } from 'src/shared/controller/appContext';
import { getDictionary } from 'src/translation/getDictionary';
import { getLocaleFromCookies } from 'src/translation/getLocaleFromCookies';

export async function generateMetadata() {
  const locale = getLocaleFromCookies(cookies());
  const dictionary = await getDictionary(locale);

  return {
    title: dictionary.customer.view.title,
  };
}

export default async function CustomerViewPage({
  params,
}: {
  params: { id: string };
}) {
  const context = await appContextForReact(cookies());

  if (!hasPermission(customerPermissions.customerRead, context)) {
    redirect('/');
  }

  return <CustomerView id={params.id} context={context} />;
}
