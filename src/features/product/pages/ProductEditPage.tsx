import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import ProductEdit from 'src/features/product/components/ProductEdit';
import { permissions } from 'src/features/permissions';
import { hasPermission } from 'src/features/security';
import { appContextForReact } from 'src/shared/controller/appContext';
import { getDictionary } from 'src/translation/getDictionary';
import { getLocaleFromCookies } from 'src/translation/getLocaleFromCookies';

export async function generateMetadata() {
  const locale = getLocaleFromCookies(cookies());
  const dictionary = await getDictionary(locale);

  return {
    title: dictionary.product.edit.title,
  };
}

export default async function ProductEditPage({
  params,
}: {
  params: { id: string };
}) {
  const context = await appContextForReact(cookies());

  if (!hasPermission(permissions.productUpdate, context)) {
    return redirect('/');
  }

  return <ProductEdit context={context} id={params.id} />;
}
