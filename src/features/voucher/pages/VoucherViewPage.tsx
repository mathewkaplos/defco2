import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { VoucherView } from 'src/features/voucher/components/VoucherView';
import { voucherPermissions } from 'src/features/voucher/voucherPermissions';
import { hasPermission } from 'src/features/security';
import { appContextForReact } from 'src/shared/controller/appContext';
import { getDictionary } from 'src/translation/getDictionary';
import { getLocaleFromCookies } from 'src/translation/getLocaleFromCookies';

export async function generateMetadata() {
  const locale = getLocaleFromCookies(cookies());
  const dictionary = await getDictionary(locale);

  return {
    title: dictionary.voucher.view.title,
  };
}

export default async function VoucherViewPage({
  params,
}: {
  params: { id: string };
}) {
  const context = await appContextForReact(cookies());

  if (!hasPermission(voucherPermissions.voucherRead, context)) {
    redirect('/');
  }

  return <VoucherView id={params.id} context={context} />;
}
