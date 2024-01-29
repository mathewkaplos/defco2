import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import VoucherEdit from 'src/features/voucher/components/VoucherEdit';
import { permissions } from 'src/features/permissions';
import { hasPermission } from 'src/features/security';
import { appContextForReact } from 'src/shared/controller/appContext';
import { getDictionary } from 'src/translation/getDictionary';
import { getLocaleFromCookies } from 'src/translation/getLocaleFromCookies';

export async function generateMetadata() {
  const locale = getLocaleFromCookies(cookies());
  const dictionary = await getDictionary(locale);

  return {
    title: dictionary.voucher.edit.title,
  };
}

export default async function VoucherEditPage({
  params,
}: {
  params: { id: string };
}) {
  const context = await appContextForReact(cookies());

  if (!hasPermission(permissions.voucherUpdate, context)) {
    return redirect('/');
  }

  return <VoucherEdit context={context} id={params.id} />;
}
