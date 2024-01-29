import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import VoucherList from 'src/features/voucher/components/VoucherList';
import { voucherPermissions } from 'src/features/voucher/voucherPermissions';
import { hasPermission } from 'src/features/security';
import { appContextForReact } from 'src/shared/controller/appContext';
import { getDictionary } from 'src/translation/getDictionary';
import { getLocaleFromCookies } from 'src/translation/getLocaleFromCookies';

export async function generateMetadata() {
  const locale = getLocaleFromCookies(cookies());
  const dictionary = await getDictionary(locale);

  return {
    title: dictionary.voucher.list.title,
  };
}

export default async function VoucherListPage() {
  const context = await appContextForReact(cookies());

  if (!hasPermission(voucherPermissions.voucherRead, context)) {
    return redirect('/');
  }

  return <VoucherList context={context} />;
}
