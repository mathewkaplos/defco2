import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import CustomerEdit from 'src/features/customer/components/CustomerEdit';
import { permissions } from 'src/features/permissions';
import { hasPermission } from 'src/features/security';
import { appContextForReact } from 'src/shared/controller/appContext';
import { getDictionary } from 'src/translation/getDictionary';
import { getLocaleFromCookies } from 'src/translation/getLocaleFromCookies';

export async function generateMetadata() {
  const locale = getLocaleFromCookies(cookies());
  const dictionary = await getDictionary(locale);

  return {
    title: dictionary.customer.edit.title,
  };
}

export default async function CustomerEditPage({
  params,
}: {
  params: { id: string };
}) {
  const context = await appContextForReact(cookies());

  if (!hasPermission(permissions.customerUpdate, context)) {
    return redirect('/');
  }

  return <CustomerEdit context={context} id={params.id} />;
}
