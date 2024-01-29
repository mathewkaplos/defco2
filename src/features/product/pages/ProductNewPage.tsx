import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import ProductNew from 'src/features/product/components/ProductNew';
import { productPermissions } from 'src/features/product/productPermissions';
import { hasPermission } from 'src/features/security';
import Breadcrumb from 'src/shared/components/Breadcrumb';
import { appContextForReact } from 'src/shared/controller/appContext';
import { getDictionary } from 'src/translation/getDictionary';
import { getLocaleFromCookies } from 'src/translation/getLocaleFromCookies';

export async function generateMetadata() {
  const locale = getLocaleFromCookies(cookies());
  const dictionary = await getDictionary(locale);

  return {
    title: dictionary.product.new.title,
  };
}

export default async function ProductNewPage() {
  const context = await appContextForReact(cookies());
  const dictionary = context.dictionary;

  if (!hasPermission(productPermissions.productCreate, context)) {
    return redirect('/');
  }

  return (
    <div className="flex flex-1 flex-col">
      <Breadcrumb
        items={[
          [dictionary.product.list.menu, '/product'],
          [dictionary.product.new.menu],
        ]}
      />
      <div className="my-10">
        <ProductNew context={context} />
      </div>
    </div>
  );
}
