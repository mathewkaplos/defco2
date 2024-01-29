import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import VoucherNew from 'src/features/voucher/components/VoucherNew';
import { voucherPermissions } from 'src/features/voucher/voucherPermissions';
import { hasPermission } from 'src/features/security';
import Breadcrumb from 'src/shared/components/Breadcrumb';
import { appContextForReact } from 'src/shared/controller/appContext';
import { getDictionary } from 'src/translation/getDictionary';
import { getLocaleFromCookies } from 'src/translation/getLocaleFromCookies';

export async function generateMetadata() {
  const locale = getLocaleFromCookies(cookies());
  const dictionary = await getDictionary(locale);

  return {
    title: dictionary.voucher.new.title,
  };
}

export default async function VoucherNewPage() {
  const context = await appContextForReact(cookies());
  const dictionary = context.dictionary;

  if (!hasPermission(voucherPermissions.voucherCreate, context)) {
    return redirect('/');
  }

  return (
    <div className="flex flex-1 flex-col">
      <Breadcrumb
        items={[
          [dictionary.voucher.list.menu, '/voucher'],
          [dictionary.voucher.new.menu],
        ]}
      />
      <div className="my-10">
        <VoucherNew context={context} />
      </div>
    </div>
  );
}
