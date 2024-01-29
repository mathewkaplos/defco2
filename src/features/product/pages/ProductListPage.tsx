import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import ProductList from 'src/features/product/components/ProductList';
import { productPermissions } from 'src/features/product/productPermissions';
import { hasPermission } from 'src/features/security';
import { appContextForReact } from 'src/shared/controller/appContext';
import { getDictionary } from 'src/translation/getDictionary';
import { getLocaleFromCookies } from 'src/translation/getLocaleFromCookies';

export async function generateMetadata() {
  const locale = getLocaleFromCookies(cookies());
  const dictionary = await getDictionary(locale);

  return {
    title: dictionary.product.list.title,
  };
}

export default async function ProductListPage() {
  const context = await appContextForReact(cookies());

  if (!hasPermission(productPermissions.productRead, context)) {
    return redirect('/');
  }

  return <ProductList context={context} />;
}
